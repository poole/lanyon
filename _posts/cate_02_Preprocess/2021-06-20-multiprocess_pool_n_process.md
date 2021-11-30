---
layout: post
title: Multiprocessing) Pool vs Process
date : 30 Jun 2021
category : 02_Preprocess
comments : true
---
 : 일부 반복적인 작업 과정에서 1개의 Process만을 사용함에 따라, 작업시간이 오래걸리는 문제를 해결하기 위해 MultiProcessing에 대해서 공부해보고자한다.

# 1. Multi-Processing vs Multi-Thread

### (1) Thread?? Processing??
: MultiProcessing에 앞서서, 우선 Thread와 Processor에 대한 정의와 차이부터 살펴보자. 컴공 지식에 대해서는 잘 모르기에, 내가 알 수 있는 깊이에서 둘 간의 차이점을 살펴보자.

|  | Thread | Processe |
|---|---|---|
|정의| 프로세스내에서 실제로 작업을 수행하는 주체 | 실행 중인 프로그램 |
|   | 모든 프로세스에는 한개 이상의 스레드(thread)가 존재하여 작업을 진행함. | 사용자가 작성한 프로그램이 운영체제에 의해 메모리 공간을 할당받아 실행 중인 것. |
|   | 하나의 프로세스에 2개 이상의 스레드(thread)를 갖는 것을 multi-Thread process라고함. | 프로세스는 프로그램에 사용되는 '데이터', '메모리 등의 자원', '스레드'로 구성됨.|
|메모리 공유| 메모리를 공유하여, 각 cpu가 서로의 상태를 공유할 수 있음. |  메모리를 공유하지 않음 |
|Interrupt &kill| Interrupt & kill 불가능 |  메모리를 공유하여, 각 cpu가 서로의 상태를 공유할 수 있음. |
|Thread의 장점| 1) 프로세스보다 생성 및 종료시간, 쓰레드간 전환시간이 짧다. |  |
|           | 2) 프로세스의 메모리, 자원등을 공유하기에, 커널의 도움 없이 상호통신이 가능하다. |  |

여기까지 살펴보았을 때, 우리의 목표는 하나의 파이썬이라는 프로세스(프로그램)에서 여러개의 쓰레드를 띄워 필요한 작업을 병렬로 처리하면 될 것으로 보인다.

### (2) GIL(Global Interpreter Lock)
 : 그러나 슬프게도(?) 파이썬에서는 여러개의 쓰레드를 사용하는 Multi-Thread를 지원하지 않는다.
  파이썬은  global변수로 하나의 인터프리터가 실행된다. 만약 쓰레드가 동시에 작동한다면, global변수를 함께 공유하게 될 것이고, 특정 스레드가 global변수를 변경할시, 동일한 변수에 접근해있던 다른 쓰레드는 엉망이 되어버릴 것이기에 *한번에 하나의 Thread만이 인터프리너 내부의 global변수에 접근할 수 있도록 해놓았다.(GIL)*(하나의 thread만이 접근가능한 일부 틀릴 수 있음.)

  따라서 파이썬에서는 Multi Thread를 사용하더라도, Lock으로 인하여 한번에 하나의 Thread만 실행되기에, 되려 Multi core CPU라고 하더라도 실행시간이 효과가 없거나 되려 늘어나버릴 수 있다.

 그렇다고 Multi-Thread를 사용할 수 없는 것은 아니다. GIL이 적용도니느 것은 CPU동작에 한해서이며, 쓰레드가 CPU동작을 마치고 I/O작업을 실행하는 동안에는 다른 쓰레드가 CP동작을 동시에 실행 할 수 있다. 따라서 CPU동작이 많지 않고 I/O동작이 더 많은 프로그램에서는 Multi-Thread를 사용하여 큰 효과를 볼 수 있다. (다만 나는 어떤 작업이 CPU가 적고 I/O가 많은지 구별하지 못한다...)


# 2. Multi-Processing
 : 앞선 이유로 Multi-Thread 사용은 제한되지만, `multiprocessing`패키지를 사용하면, 프로세스 자체를 복수로 생성하여 보유하고 있는 CPU를 병렬로 사용할 수 있다. `multiprocessing`는 아래 두가지 방식으로 사용 가능하며, 각 수행해야 하는 테스크에 따라 적합한 방식이 달라진다.
  - multiprocessing : Pool
  - multiprocessing : Process

## 1) Pool
 : Pool은 FIFO(first in, first out) 방식으로 업무를 사용가능한 Processor에게 분배한다. map-reduce방식과 유사하게 작업을 각기 다른 프로세서에게 맵(map)하고, 각 결과를 다시 수집한후(reduce) 결과를 list or array형태로 출력한다. pool은 각 프로세스가 맡은 모든 작업이 끝날 때까지 기다린후 결과를 수집하여 반환하며, 메모리 측면에서 pool은 프로세스에 할당된 작업은 메모리에 올라가지만 실행되지 않은 작업은 메모리에 올라가지 않는다.
 - 작동 방식 : 각 프로세스가 맡은 모든 작업이 끝날 때까지 기다린후 결과를 수집하여 반환
 - output type : list or array
 - memory :프로세스에 할당된 작업만 메모리에 올라가며(stored in), 그외의 작업은 메모리에서 제외됨(stored out)

## 2) Process
 : 반면 프로세스에 모든 프로세스를 메모리를 올려두고, 작업들을 FIFO 방식으로 스케쥴링한다.
 - output type : list or array
 - memory :모든 프로세스가 메모리에 올라감


# 3. [Pool vs Process] 무엇을 써야할까?
- `multiprocessing.pool` : 병렬로 작업해야하는 작업량이 *많으*나 'I/O operation'이 작을 때
- `multiprocessing.process`: 병렬로 진행해야 하는 작업량이 *적고*, 각 작업이 한번만 진행되면 되는 상황

## 1) Task Number
 : pool은 실행중인 작업만을 memory에 올려 두기에 task가 많아도 메모리를 모두 차지하지 않는다. 반면 Process는 실행해야하는 모든 작업을 한번에 memory에 올려두기에 작업량이 많으면 메모리 문제를 발생시킬 수 있다.

## 2) I/O operation
 : pool은 각 process들을 FIFO 방식으로 CPU core에 할당하고, 할당된 process는 순자적으로 실행된다. 따라서 이때 시간이 길게 소요되는 I/O Operation이 있다면, Pool은 I/O operation이 끝날 때 까지 기다리며 process들의 스케쥴을 잡지 않게된다. 이는 결국 큰 시간 소요로 이어지게 된다. 반면 process class는 I/O operation 실행을 잠시 중지하며, 다른 process의 스케쥴을 잡기에 I/O 작업이 길어도 비효율적으로 시간을 소모하지 않는다.

# 4. Multi-Processing Code
```python
import numpy as np
import multiprocessing
import time

# 전체 작업량
task = list(range(100000000))
```

## 0) single core
```python
start_time = time.time()
output = 0
gen = (i for i in task)
for i in gen :
    output += i
print("---%s second ---"% (time.time() - start_time))
# ---9.102992296218872 second ---
```

## 1) multiprocess.pool
```python
# 1. 작업 분할 및 process 개수 지정
## 1) 코어 개수 생성
n_process = 4 #calc_n_procs_core(task)

## 2) 작업분항(job_list) 생성
job_list = np.array_split(task, n_process)

# 2. multiprocess
## 1) 실행할 작업 함수
def list_sum(target_lst) :
    output = 0
    gen = (i for i in target_lst)
    for i in gen :
        output += i
    return output

## 2) multiprocess.pool 객체 생성
start_time = time.time()

if __name__ == '__main__' :
    lst_tmp = []
    # multiprocess

    pool = multiprocessing.Pool(processes = n_process)  
    lst_pool = pool.map(list_sum, job_list)
    pool.close()
    pool.join()
print(sum(lst_pool))
print("---%s second ---"% (time.time() - start_time

# 4999999950000000
# ---7.931491851806641 second ---
```

## 2) multiprocess.Prcoess
```python
# 1. 작업 분할 및 process 개수 지정
## 1) 코어 개수 생성
# n_process = 4 #calc_n_procs_core(task)

## 2) 작업분항(job_list) 생성
job_list = np.array_split(task, n_process)

# 2. multiprocess
## 1) 각 프로세스에서 반환한 Output을 list형태로 묶어주기 위해서 manager 메서드 사용
manager = multiprocessing.Manager()
fin_list = manager.list()

## 2) 실행할 작업 함수
def list_sum(target_lst) :
    output = 0
    gen = (i for i in target_lst)
    for i in gen :
        output += i
    fin_list.append(output)
    return output

## 3) multiprocess.process 객체 생성
def multiProcess_main() :
    procs = []
    for _job in job_list :
        lst_tmp = []
        # multiprocess
        proc = multiprocessing.Process(target = list_sum, args = (_job,))
        procs.append(proc)
        proc.start() # 프로세스 시작

    for proc in procs :
        proc.join() # 프로세스 종료

start_time = time.time()
if __name__ == '__main__' :
    multiProcess_main()

print(sum(list(fin_list)))
print("---%s second ---"% (time.time() - start_time))
#4999999950000000
#---6.672454118728638 second ---
```





#### Refernce
##### 1. Multi-Processing vs Multi-Thread
[1] [Thread란?](http://tcpschool.com/java/java_thread_concept)  
[2] [Thread와 MultiProcessing 차이점](https://www.ellicium.com/python-multiprocessing-pool-process)  
##### 2 & 3 . Multi-Processing
[1] [Python Multiprocessing: Pool vs Process – Comparative Analysis](https://www.ellicium.com/python-multiprocessing-pool-process)

##### 4. Multi-Processing Code
[1] [[Python] 병렬처리(Multiprocessing)를 통한 연산속도 개선](https://yganalyst.github.io/data_handling/memo_17_parallel/)
