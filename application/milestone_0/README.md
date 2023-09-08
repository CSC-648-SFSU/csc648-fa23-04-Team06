# 🚀 Running our M0 App Locally

Hello Team, If you're reading this, Welcome to our beautiful Milestone 0 Source Code Directory! <br>
This guide will help you set up and run the React app on your local machine.

## 📋 Prerequisites

1. **Node.js and npm**: Ensure they're installed. If not, grab them from [Node.js official website](https://nodejs.org/).
<br/>Note: Please install Node 18.17.1 LTS.
   
   Check installations using:
   ```bash
   node -v
   npm -v
   ```

   <br/>


## 🛠 Getting Started
2. **Clone the Repository**

If applicable, clone the repository using:
  ```bash
  git clone https://github.com/CSC-648-SFSU/csc648-04-fall23-team06.git 
```
<br/>

## 💾 Navigate to the Project Directory

```bash
cd [PROJECT_DIRECTORY_NAME]
```

<br/>

## ✈️ Install Dependencies & Start
```bash
npm install
```
```bash
npm start
```

<br/>

## ❗ Possible Issues & Fixes

 **Port Occupied:** If port 3000 is occupied, the terminal will prompt you to run on a different port. Simply press y and hit enter.

 **Module Not Found:** Sometimes, you might encounter a "module not found" error.
        Fix: Try deleting the node_modules directory and package-lock.json file, then reinstalling the dependencies:

```bash
rm -rf node_modules package-lock.json
npm install

```


