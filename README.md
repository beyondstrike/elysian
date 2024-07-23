# Elysian

## Overview
Elysian is a multi-component project comprising a web client, mobile client, node server, and Python server. This guide provides instructions on how to run each part.

## Prerequisites
- Node.js
- Python 3.x
- npm or yarn
- Android/iOS development environment for mobile client (Expo)

## Setup Environment Variables
1. Rename `.env.example` to `.env` in both `web_client` and `mobile_client` directories.
2. Add the following environment variables to the `.env` files:
   ```
   REACT_APP_API_URL=https://elysian-python.azurewebsites.net
   EXPO_PUBLIC_API_URL=https://elysian-python.azurewebsites.net
   ```

## Running the Web Client
1. Navigate to the `web_client` directory:
   ```sh
   cd web_client
   ```
2. Install the dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```
4. Open your browser and go to `http://localhost:3000` to view the web client.

## Running the Mobile Client
1. Navigate to the `mobile_client` directory:
   ```sh
   cd mobile_client
   ```
2. Install the dependencies:
   ```sh
   npm install
   ```
3. Start the Metro server with Expo:
   ```sh
   npx expo start
   ```
4. Download the Expo Go app on your mobile device from the App Store or Google Play Store.
5. Scan the QR code displayed in the terminal or Expo DevTools to run the app on your mobile device.

## Running the Node Server
1. Navigate to the `node_server` directory:
   ```sh
   cd node_server
   ```
2. Install the dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   npm start
   ```
4. The server will be running on `http://localhost:5000`.

## Running the Python Server
1. Navigate to the `py_server` directory:
   ```sh
   cd py_server
   ```
2. Create a virtual environment:
   ```sh
   python -m venv venv
   ```
3. Activate the virtual environment:
   - On Windows:
     ```sh
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```sh
     source venv/bin/activate
     ```
4. Install the dependencies:
   ```sh
   pip install -r requirements.txt
   ```
5. Start the server:
   ```sh
   python app.py
   ```
6. The server will be running on `http://localhost:8000`.

## Notes
- Ensure all environment variables are properly configured as needed.
- Refer to each component's specific README or documentation for additional configuration details.

---

For more details, visit the [Elysian GitHub repository](https://github.com/beyondstrike/elysian).
