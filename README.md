# TechXcelerate-FlowAid

## Getting Started with React on Windows

### Prerequisites
Before setting up the project, ensure you have the following installed:

1. **Node.js (LTS version recommended)**  
   - Download from [https://nodejs.org/](https://nodejs.org/)
   - Verify installation:
     ```sh
     node -v  # Check Node.js version
     npm -v   # Check npm version
     ```

## Installing the React App

### 1. Create a New React App
Open *Command Prompt (cmd)* or *PowerShell*, then run:
```sh
npx create-react-app my-app
```

If npx is not recognized, install Create React App globally:
```sh
npm install -g create-react-app  
npx create-react-app my-app  
```

### 2. Navigate to Project Folder & Start Development Server
```sh
cd my-app  
npm start  
```
This will launch the app in your default browser at [http://localhost:3000](http://localhost:3000).

## Available Scripts
In the project directory, you can run:

### `npm start`
Runs the app in development mode.

### `npm test`
Launches the test runner in the interactive watch mode.

### `npm run build`
Builds the app for production in the `build` folder.

### `npm run eject`
Removes the single build dependency to allow full control over configurations.

## Optional Dependencies

### 1. React Router (For Navigation)
```sh
npm install react-router-dom
```

### 2. State Management (If Needed)
```sh
npm install redux react-redux
```

### 3. Firebase (For Backend Services)
```sh
npm install firebase
```

## Handling Missing `react-scripts`
If `react-scripts` is missing or not working, follow these steps:

### 1. Install react-scripts Manually
```sh
npm install react-scripts --save
```

### 2. If Installation Fails, Clear Cache and Try Again
```sh
npm cache clean --force
npm install react-scripts --save
```

### 3. If Issues Persist, Delete `node_modules` and Reinstall Dependencies
```sh
rd /s /q node_modules package-lock.json  # For Windows (Command Prompt)
npm install
```

### 4. Run Your React App Again
```sh
npm start
```

## Recommended IDE
Use **Visual Studio Code** for the best development experience.

## Learn More
- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React Documentation](https://reactjs.org/)



### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
eeae99a (Initial commit)
39c4bd6 (Initial commit: Added project files)
