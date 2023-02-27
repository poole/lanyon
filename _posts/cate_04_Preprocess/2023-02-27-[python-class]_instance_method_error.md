---
layout: post
title: [python-class] class내 instance method 중복 호출시 에러
date : 24 Feb 2023
category : Preprocess
comments : true
---

## 1. 문제 상황
### 1) 문제 코드
: 하나의 클래스에서 여러개의 instance method를 생성하고, 그 중 마지막 main에 해당하는 method가 상위 method를 내부에서 다시 호출하는 구조로 클래스를 만들어, 하나의 클래스의 main만 메소드만 실행하여 전체 메서드를 실행하고자 함.

```python 
class Parent :
    def __init__(self) :
        self.budget = 100

    def child_1(self) :
        self.budget -= 10

    def child_2(self) :
        self.budget -= 5

    # 문제가 된 method
    # instance method를 내부에 갖고 있는 instnce method
    def family_main(self) :
        Parent.child_1()
        Parent.child_2()
        print(self.budget)


parnet_inst = Parent()   # instnace 생성
parnet_inst.family_main()# main function 실행 
> TypeError: child_1() missing 1 required positional argument: 'self'
```

### 2) 발생 에러
위와 같이  `parnet_inst.family_main` 메서드를 실행하자, `missing 1 required positional argument: 'self'` 해당 메서드가 self 인자를 필요로하는데 받지 못했다는 에러가 발생.


---
## 2. 문제 원인
: `family_main`안에 존재하는 `Parent.child_1`는 `Parent` 클래스의 '인스턴스 메서드'이다.
따라서 코드를 잘 살펴보면, 
  - Parent() 클래스를 `parent_inst`에 할당
  - 그러나 `family_main`내부의 메서드를 호출할 땐, 할당한 인스턴스의 이름인 `parent_inst`가 아닌 클래스명이 `Parent`로 호출하고 있음.


---
## 3. 문제 해결
 : 동일한 클래스의 인스턴스 메서드끼리 호출할 때는, 클래스명을 다시 호출하는 것이 아니라, 'self'를 클래스명으로 호출하면 가능하다.
```python
class Parent :
    def __init__(self) :
        self.budget = 100

    def child_1(self) :
        self.budget -= 10

    def child_2(self) :
        self.budget -= 5

    def family_main(self) :
        self.child_1()
        self.child_2()
        print(self.budget)

Parent().family_main()
> 85
```

#### Reference
[1] [TypeError: Missing 1 required positional argument: 'self' - stackfoverflow](https://stackoverflow.com/questions/17534345/typeerror-missing-1-required-positional-argument-self)  
[2] [[Python] 메서드(method)와 스태틱/클래스 메서드(static/class method)](https://heytech.tistory.com/107)  
[3] [35.3 클래스 메서드 사용하기 - 코딩 도장](https://dojang.io/mod/page/view.php?id=2380)  
