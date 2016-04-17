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
