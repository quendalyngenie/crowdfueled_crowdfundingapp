# CrowdFueled

CrowdFueled is a cross-platform crowdfunding application developed as a polytechnic project to support community fundraising in Singapore.

Built with **Ionic, Angular and TypeScript**, the application allows users to discover fundraising campaigns, contribute to projects, participate in events, receive rewards and interact with fundraising initiatives through a mobile-friendly interface.

The project also explores technologies such as **Firebase, PayPal, sentiment analysis and blockchain-based transaction recording**.

## Features

### User Authentication

* Email and password login
* Firebase Authentication
* Protected application routes
* User account management

### Crowdfunding Campaigns

* Browse available crowdfunding campaigns
* Search campaigns by name
* Filter campaigns by date and funding progress
* View campaign details and funding progress
* Favourite campaigns
* Create new crowdfunding projects
* Choose between flexible and fixed funding
* Set campaign targets and campaign periods
* Add project stories and risk information
* Capture project images using the device camera

### Campaign Management

* Create and edit projects
* Publish campaign updates
* Create and manage campaign rewards
* Track funding progress based on completed transactions
* View rewards received by users

### Campaign Moderation

Campaign titles are analysed using sentiment analysis when a project is submitted.

Projects with acceptable sentiment scores can proceed through the campaign creation flow, while potentially inappropriate submissions can be flagged for review.

### Payments

The application integrates **PayPal** for digital payments.

Features include:

* PayPal checkout
* SGD payment support
* Payment confirmation
* Transaction history linked to individual users

### Blockchain Integration

CrowdFueled also includes an experimental blockchain component using **Ethers.js** and browser Ethereum wallets such as MetaMask.

The blockchain implementation supports:

* Connecting an Ethereum wallet
* Registering crowdfunding campaigns
* Registering crowdfunding transactions
* Recording transaction hashes
* Verifying blockchain transaction confirmation

> The blockchain functionality was developed as part of the academic project and uses project-specific smart contract configuration.

### Events

Users can:

* Browse fundraising events
* Search and filter events
* View event details
* Favourite events
* Purchase event tickets
* Pay for events through PayPal

### Community Content

The application also includes a blogging system where users can:

* Browse blog posts
* Create posts
* Edit personal posts
* View individual blog entries

---

## Tech Stack

| Technology              | Usage                              |
| ----------------------- | ---------------------------------- |
| Ionic                   | Cross-platform mobile UI framework |
| Angular                 | Front-end application framework    |
| TypeScript              | Main application language          |
| Capacitor               | Native mobile functionality        |
| Firebase Authentication | User authentication                |
| Cloud Firestore         | Application data storage           |
| AngularFire             | Angular/Firebase integration       |
| PayPal                  | Digital payments                   |
| Ethers.js               | Ethereum blockchain interaction    |
| MetaMask                | Ethereum wallet connection         |
| Sentiment               | Text sentiment analysis            |
| Tailwind CSS            | UI styling                         |
| Leaflet                 | Map functionality                  |

---

## Project Structure

```text
crowdfueled_crowdfundingapp/
├── src/
│   ├── app/
│   │   ├── pages/          # Application screens
│   │   ├── services/       # Firebase and application services
│   │   ├── guards/         # Authentication guards
│   │   └── app-routing.module.ts
│   ├── assets/
│   │   └── Javascript/     # Blockchain integration
│   ├── environments/       # Firebase configuration
│   └── index.html
├── angular.json
├── capacitor.config.ts
├── firebase.json
├── firestore.rules
├── ionic.config.json
├── package.json
└── tailwind.config.js
```

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* Git

For blockchain functionality, a browser Ethereum wallet such as **MetaMask** is also required.

### 1. Clone the repository

```bash
git clone https://github.com/quendalyngenie/crowdfueled_crowdfundingapp.git
```

### 2. Enter the project directory

```bash
cd crowdfueled_crowdfundingapp
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm start
```

The Angular development server will start and the application can then be opened in your browser.

---

## Firebase Configuration

The application uses Firebase for authentication and Firestore database functionality.

Firebase configuration is located in:

```text
src/environments/environment.ts
```

If you are running your own version of the application, replace the existing Firebase configuration with credentials from your own Firebase project and configure the appropriate Firestore security rules.

---

## Payment Configuration

PayPal is used for selected payment flows in the application.

To deploy your own version, configure the application using your own PayPal developer credentials and sandbox or production environment.

---

## Blockchain Configuration

The blockchain implementation can be found in:

```text
src/assets/Javascript/BlockChain.js
```

The original project uses Ethers.js to connect to an Ethereum wallet and communicate with the crowdfunding smart contract.

To run the blockchain functionality independently, update the smart contract address and network configuration as required.

---

## Purpose

CrowdFueled was created as a **polytechnic software development project** exploring how different technologies can be combined to build a complete crowdfunding ecosystem.

The project provided practical experience in:

* Cross-platform mobile development
* Angular application architecture
* Firebase authentication and databases
* Payment gateway integration
* Blockchain and smart contract interaction
* Form validation
* Search and filtering
* Mobile device APIs
* User experience design
* Version control using Git and GitHub

---

## Disclaimer

This repository is an academic project and is not intended to operate as a production financial or crowdfunding service.

Third-party services, test networks and project-specific configurations used during development may no longer be active and may need to be replaced before running all features.
