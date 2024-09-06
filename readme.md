# MERN Payment Transfer System

## Overview
This project is a resilient payment processing system built using the MERN stack (MongoDB, Express, React, Node.js). It demonstrates how to handle a multi-step payment process where the system can gracefully handle failures and resume the process from the last completed step, ensuring that operations like debiting and crediting are only performed once per transaction (idempotency).

## Features
Resilient Orchestration: The system resumes from the last completed step (e.g., after a server crash).
Idempotency: Ensures debit and credit operations are performed only once.
Event Sourcing: Tracks the state of the transaction using MongoDB logs.
Frontend Interface: Users can initiate transactions via a React.js frontend.
Error Handling: The system handles failures gracefully, ensuring no duplicate operations.

## Tech Stack
- Frontend: React.js
- Backend: Node.js with Express
- Database: MongoDB
- Libraries: Express, Axios, Mongoose, UUID

## Setup Instructions

## 1. Backend Setup

### 1. Navigate to `server` directory
### 2. Install all the required dependencies
### 3. Add the provided .env file
### 4. Start the backend server

## 2. Frontend Setup

### 1. Navigate to the `client` directory
### 2. Install all the required dependencies
### 3. Start the frontend server

## 3. MongoDB Setup

This project uses online Mongo Atlas service for which the connection_string is provided in the env file.

## How the System Works

### 1. Frontend (React.js)
- A form allows users to input:
    - The user ID to debit from
    - The user ID to credit to
    - The amount to transfer
- The form submits the transaction request to the backend with a unique transaction ID (generated using UUID) to ensure consistency across retries.
- Transaction status is displayed on the frontend, and the form shows whether the debit, credit, or entire transaction process is complete.

### 2. Backend (Node.js + Express)
- The backend orchestrates the payment process in two steps:
    - Debit the sender's account.
    - Credit the recipient's account.
-The backend logs the progress of each transaction (debit or credit) to MongoDB. If the server is interrupted (e.g., crashes or stops), the orchestrator can resume the transaction from the last completed step when restarted.

### 3. MongoDB (Event Sourcing)
- MongoDB is used to track the state of the transaction (whether debit or credit has been completed) using a logging system.
- The logs collection tracks each transaction with a defined structure.