# LiteCrack

LiteCrack is a full-stack application designed to crack passwords using the popular password cracking tool, John the Ripper. The application leverages the power of AWS services such as EC2, S3, and SQS to handle computational tasks and manage traffic efficiently. The project features a React-based front-end that interacts with a Node.js back-end to deliver a seamless user experience.

## Table of Contents

- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

LiteCrack is a password-cracking application that utilizes John the Ripper to perform heavy computational tasks. The application is designed with scalability in mind, using AWS SQS to manage the queue of cracking requests, and EC2 instances to perform the actual computations. The front-end, built with React, provides an interface for users to submit password-cracking jobs and view the results.

## Architecture

The LiteCrack application follows a microservices architecture, where each component is designed to perform a specific task. The key components are:

- **EC2 Worker**: The core computation unit responsible for running John the Ripper to crack passwords. The worker is designed to scale based on the traffic, with the help of SQS.
- **SQS (Simple Queue Service)**: Manages the queue of password-cracking requests, ensuring that each request is handled efficiently without overwhelming the EC2 workers.
- **S3 (Simple Storage Service)**: Used to store the results of the password-cracking process and any other necessary files.
- **Front-End (React)**: The user interface for the application, allowing users to submit password-cracking requests and view results.
- **Back-End (Node.js)**: Handles API requests from the front-end and interacts with the SQS and EC2 workers.

## Features

- **Scalable Password Cracking**: The application scales the number of EC2 workers based on the volume of password-cracking requests.
- **Real-Time Updates**: Users can submit password-cracking jobs and receive real-time updates on the status of their requests.
- **Efficient Queue Management**: SQS is used to manage the queue of cracking requests, ensuring that each request is processed efficiently.
- **Responsive UI**: The React front-end provides a responsive and user-friendly interface for interacting with the application.

## Technologies Used

- **Front-End**: React
- **Back-End**: Node.js
- **Password Cracking**: John the Ripper
- **Cloud Services**: AWS EC2, S3, SQS

## Installation

To set up the LiteCrack application on your local machine, follow these steps:

1. **Clone the Repository**:  
   ```bash
   git clone https://github.com/your-username/litecrack.git
   cd litecrack
