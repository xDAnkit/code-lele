# CodeShare Project

**CodeShare** is a web-based code editor that facilitates real-time collaborative coding. It allows users to create, share, and collaborate on code seamlessly using unique shareable links. This project is built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js).

## Prerequisites

Ensure you have the following installed before getting started:

- **Node.js**
- **Code Editor** (e.g., Visual Studio Code)

## Installation Steps

### 1. Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/xDAnkit/code-lele
```

Navigate to the project directory:

```bash
cd code-lele
cd client
```

### 2. Install Dependencies

To install the required packages, run:

```bash
npm install
```

### 3. Run the Project

Start the development server using:

```bash
npm run dev
```

## Auth Configuration - Auth0 Setup

To configure authentication, follow these steps:

1. **Sign up for Auth0**:

   - Visit [auth0.com](https://auth0.com) and create an account.

2. **Create an Application**:

   - Navigate to **Authentication** > **Authentication Profile** and select the **Identifier + Password** option.
   - Under **Applications**, click on **Default App**.
   - Note down the **Domain** and **Client ID**.

3. **Set Application Type**:

   - Choose **Single Page Application**.

4. **Configure URLs**:

   - Add the following URLs to **Callback URLs**, **Logout URLs**, and **Web Origins** as needed.

## Create .env File

Create an `.env` file at the root of your project and add the following lines, replacing with your Auth0 **Domain** and **Client ID**:

```env
VITE_AUTH_DOMAIN=Your_Auth0_Domain
VITE_AUTH_CLIENT_ID=Your_Auth0_ClientID
```
