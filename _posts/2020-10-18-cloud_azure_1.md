---
layout: post
title: Cloud Intro
date : 18 Oct 2020
category : Cloud
comments : true
---


# 1. Azure Architecture 구성요소

### 1) Region
 - 데이터 센터 모음
 - 사용자와 가장 가까운 지역에 리소스를 배포 가능
 - 한국 : 서울 / 부산에 위치해있음
    * BCDR(Business continuity and disaster recovery)
    : 쌍을 이루는 지역으로 재해복구를 위해존재

### 2) Geography
 - 데이터 상주 및 규정 준수 경계를 유지하는 개별 시장
 - 아메리카 / 유럽 / 아시아 태평양 / 중동 / 아프리카

### 3) 가용성 옵션
 - 서버 분산 저장 및 재해복구 등에 필요한 옵션

### 4) Azure Resource Manager
 - Azure를 관리하는 계층
 - 리소스 또는 리소스 그룹을 생성, 구성, 관리, 삭제
 - AzureAD를 통한 접근 제어

--------------------

# 2. Azure Compute

### 1) Azure Compute 서비스
 - Azure VM : 운영체제를 직접 관리하는 서비스
 - VM Scale Sets : Azure VM Image를 이용하여 자동으로 확장 또는 축소 가능
 - App Service : 사용자느 ㄴ소스 파일만 업로드하면 알아서 동작하는 PaaS
    e.g) Web App, API App, Mobile App, Logic App, Functions등
 - Functions : App Services의 하나로 이벤트 기반으로 compute작업 수행

#### VM 생성
[Azure VM 생성 가이드](https://microsoftlearningkoreanlab.github.io/AZ-900TKR-MicrosoftAzureFundamentals/Instructions/Walkthroughs/01-Create%20a%20virtual%20machine.html)  



### 2) Azure Container 서비스
 - Azure Container Instances
 : Azure가 관리하는 Container Cluster에 Container Image를 업로드 할 수 있는 Paas 서비스(...?)

 - Azure Kubernetes service
 : 많은 수의 컨테이너를 관리하기 위한 Container Orchestrator

----


# 3. Azure Network
### 1) Azure Container 서비스
- Azure Container Instances
: Azure가 관리하는 Container Cluster에 Container Image를 업로드 할 수 있는 Paas 서비스(...?)

- Azure Kubernetes service
: 많은 수의 컨테이너를 관리하기 위한 Container Orchestrator
