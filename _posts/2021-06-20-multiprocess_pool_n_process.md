---
layout: post
title: [Multiprocessing] Pool vs Process
date : 30 Jun 2021
category : ML_Preprocess
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
 - Pool은 FIFO(first in, first out) 방식으로 업무를 사용가능한 Processor에게 분배한다. map-reduce방식과 유사하게 작업을 각기 다른 프로세서에게 맵(map)하고, 각 결과를 다시 수집한후(reduce) 결과를 list or array형태로 출력한다. pool은 각 프로세스가 맡은 모든 작업이 끝날 때까지 기다린후 결과를 수집하여 반환하며, 메모리 측면에서 pool은 프로세스에 할당된 작업은 메모리에 올라가지만 실행되지 않은 작업은 메모리에 올라가지 않는다.


 - 작동 방식 : 각 프로세스가 맡은 모든 작업이 끝날 때까지 기다린후 결과를 수집하여 반환
 - output type : list or array
 - memory :프로세스에 할당된 작업만 메모리에 올라가며(stored in), 그외의 작업은 메모리에서 제외됨(stored out)



## 2) Process
 - memory : 프로세스에 모든 메모리를 올려둠(stored in)

## 3) [Pool vs Process] 무엇을 써야할까?
- *usage* : 작업량이 *적고*, 각 작업이 한번만 진행되면 되는 상황에서는 `multiprocessing.process`가 적합
- *usage* : 프로세스별로 진행하여 병렬처리를 가능하게 하기에, '간단' & '동일'한 *많은* 작업을 수행할 때 적합






#### Refernce
##### 1. Multi-Processing vs Multi-Thread
[1] [Thread란?](http://tcpschool.com/java/java_thread_concept)  
[2] [Thread와 MultiProcessing 차이점](https://www.ellicium.com/python-multiprocessing-pool-process)  
##### 2. Multi-Processing
[2] [Python Multiprocessing: Pool vs Process – Comparative Analysis](https://www.ellicium.com/python-multiprocessing-pool-process)  
