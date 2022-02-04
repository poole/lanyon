---
layout: post
title: Cloud Azure 2
date : 25 Oct 2020
category : cloud
comments : true
---


# 7. Azure Architecture Bigdata & ML

### 1) Azure BigData Services
#### (1) Azure SQL Data Warehouse
: 큰 규모의 데이터에서 복잡한 쿼리를 빠르게 실행할 수 있는 관리형 서비스

#### (2) Azure HDInsight
: Hadoop 파일 시스템을 사용하는 완전 관리형 분석 서비스. 방대한 양의 데이터를 보다 쉽고 빠르게 처리하며, 비용 효율적으로 처리 가능

#### (3) Azure Data Lake Analytics
: 빅데이터를 단순화하는 주문형 분산 작업 서비스. 데이터를 변환 및 추출에 사용

#### (4) Azure Databricks
: Apache Spark 환경을 사용하여 AI 솔루션을 빌드하며, 각종 ML 프레임워크와 라이브러리 제공

### 2) ML
#### (1) *Azure Machine Learning Service*
: 머신 러닝의 모델을 개발하고 교육, 테스트 배표, 관리, 추적을 하는데 사용되는 클라우드 기반 솔루션

#### (2) Azure Machine Learning Studio
: 사용자가 코드를 작성하지 않고, 머신러닝 솔루션을 구축하고 테스트 및 배포를 할 수 있는 솔루션. 드래그 앤 드롭 방식의 시각적 작업 영역을 제공

---------------------

# 8. Serverless
 - 클라우드 서비스 공급자가 서버를 실행하고 머신의 리소스를 동적으로 관리하는 클라우드 컴퓨팅 실행 모델
 - 용량 단위 구매가 아닌, 소비 단위 구매
 - 일반적으로 실행 횟수, 실행 시간(CPU), 실행 용량(memory)을 기반으로 과금

### 1) Serverless 서비스
#### (1) Azure Functions
 : 기본 플랫폼이나 인프라를 구성하지 않고, 소스 코드를 실행할 수 있는 서비스. 이벤트 기반으로 동작

#### (2) Azure Logic App
 : 앱, 데이터, 시스템, 서비스를 통합하여 작업 또는 비즈니스 프로세스 및 워크 플로를 자동화 할 수 있는 서비스

#### (3) Azure Event Grid
 : 균일한 이벤트 소비를 위해 발행, 구독모델을 사용하는 완전 관리형 지능형 이벤트 라우팅 서비스
