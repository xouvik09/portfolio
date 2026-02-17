## Serverless Cloud Resume Platform

Production-grade AWS serverless web application demonstrating secure cloud architecture, API design, IAM debugging, and CI/CD automation.

### Overview

This project implements a fully serverless resume platform hosted on AWS.  
It follows cloud-native best practices including:

- **Private static hosting**
- **Secure content delivery**
- **RESTful API design**
- **Atomic database operations**
- **IAM least-privilege access**
- **CI/CD automation**

The system is designed to be **scalable**, **secure**, and **cost-efficient**.

### Architecture

![Architecture](.cursor/projects/c-Users-souvi-OneDrive-Desktop-cloudresume-challeneg/assets/c__Users_souvi_AppData_Roaming_Cursor_User_workspaceStorage_7db904ceaea593121275f1af2fb75322_images_ChatGPT_Image_Feb_17__2026__11_11_55_PM-ad55e5ae-b5ac-4c0a-887d-c0025e6080d4.png)

#### High-Level Flow

User  
  ↓  
CloudFront (CDN)  
  ↓  
S3 (Private Bucket + OAC)  
  ↓  
Frontend (HTML/CSS/JS)  
  ↓  
API Gateway (HTTP API)  
  ↓  
AWS Lambda (Python)  
  ↓  
DynamoDB (Visitor Counter)

#### Architecture Breakdown

1. **CloudFront**
   - Acts as CDN layer
   - Serves static content globally
   - Secured using Origin Access Control (OAC)

2. **S3 (Private)**
   - Static website hosting
   - Public access completely blocked
   - Only accessible via CloudFront

3. **API Gateway (HTTP API)**
   - Exposes REST endpoint
   - Handles CORS configuration
   - Routes requests to Lambda

4. **AWS Lambda (Python)**
   - Backend logic implementation
   - Handles visitor counter updates
   - Returns JSON response

5. **DynamoDB**
   - NoSQL database
   - Atomic counter updates using `UpdateExpression`
   - Prevents race conditions

### Security Implementation

- **Private S3 bucket** (Block Public Access enabled)
- **CloudFront Origin Access Control (OAC)**
- **IAM least-privilege policies**
- **Lambda execution role isolation**
- **API CORS properly configured**
- **Region alignment** across all AWS services

### Technical Challenges Solved

- **IAM permission boundary issues**
  - Diagnosed restrictive permission boundaries blocking Lambda execution and fixed trust relationships.

- **403 AccessDenied errors**
  - Resolved multi-layer authorization issues across:
    - S3 bucket policy
    - CloudFront distribution
    - API Gateway invoke permissions

- **DynamoDB Decimal serialization**
  - Handled Python `Decimal` types to ensure proper JSON serialization in API responses.

- **Atomic counter updates**
  - Used DynamoDB atomic increment operations to avoid race conditions during concurrent requests.

### Tech Stack

- **AWS S3**
- **AWS CloudFront**
- **AWS API Gateway (HTTP API)**
- **AWS Lambda (Python)**
- **AWS DynamoDB**
- **AWS IAM**
- **GitHub Actions**
- **Python**

### CI/CD Pipeline

Automated deployment using GitHub Actions:

- **Triggered on push to `main`**
- **Syncs static assets to S3**
- **Automatically invalidates CloudFront cache**

This enables **zero-manual**, production-ready deployments.

### Features

- **Fully serverless architecture**
- **Secure static hosting**
- **Real-time visitor tracking**
- **Automated CI/CD deployment**
- **Cost-efficient infrastructure**
- **Cloud-native scalable design**

### How to Deploy Locally

This section explains how to run and test components locally before deploying to AWS.

1. **Clone repository**

   ```bash
   git clone https://github.com/xouvik09/cloud-resume-challenge.git
   cd cloud-resume-challenge
   ```

2. **Configure AWS credentials**

   Make sure AWS CLI is installed:

   ```bash
   aws configure
   ```

   Enter:

   - **AWS Access Key ID**
   - **AWS Secret Access Key**
   - **Region** (must match project region)
   - **Default output format** (json)

   ⚠️ Never commit credentials to the repository.

3. **Test Lambda locally (optional)**

   If your Lambda function is inside a `backend` folder:

   ```bash
   cd backend
   pip install -r requirements.txt
   python lambda_function.py
   ```

   For advanced local testing, you can use:

   - **AWS SAM**
   - **Docker-based Lambda simulation**

4. **Deploy to AWS**

   If using manual setup:

   - Create DynamoDB table
   - Create Lambda function
   - Configure API Gateway
   - Attach IAM role
   - Configure CloudFront
   - Link S3 origin using OAC

   If using Infrastructure as Code (recommended future improvement):

   ```bash
   aws cloudformation deploy \
     --template-file template.yaml \
     --stack-name cloud-resume \
     --capabilities CAPABILITY_IAM
   ```

### What This Project Demonstrates

This project validates practical knowledge of:

- **Serverless architecture design**
- **IAM debugging and permission boundaries**
- **Secure cloud deployment**
- **REST API integration**
- **DynamoDB atomic operations**
- **CI/CD automation**
- **Production-level troubleshooting**

### Future Improvements

- **Infrastructure as Code** (Terraform / CloudFormation)
- **CloudWatch logging dashboards**
- **AWS WAF integration**
- **Custom domain with ACM SSL certificate**
- **Unit testing for Lambda**
- **Monitoring and alerting**

### Author

**Souvik Ghosh**  
Computer Science Undergraduate (2021–2025)  
Aspiring Backend & Cloud Engineer
