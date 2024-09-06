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
Frontend: React.js
Backend: Node.js with Express
Database: MongoDB
Libraries: Express, Axios, Mongoose, UUID



