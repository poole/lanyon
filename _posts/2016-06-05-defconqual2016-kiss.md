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

