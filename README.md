<h1 align="center">
  User-Record Management System
</h1>

The objective of this project is to create a comprehensive user record management system with CRUD (Create, Read, Update, Delete) functionality using the MERN stack. The system is leverages the usage of MongoDB, Express.js, React.js, and Node.js to provide a seamless user experience.

## 🚅 Quick start

1. **Prerequisite**

   - ReactJS v18.1.0
   - NodeJS v18.16.0
   - MongoDB Community Edition 6.0

1. **Create the application**

   Clone the repository

   ```shell
   # Clone the repository
   git clone git@github.com:tienkhoa16/user-records.git
   ```

1. **Install the dependencies**

   Navigate into your project's root directory and install the necessary dependencies.

   ```shell
   # Navigate to the directory
   cd scripts/

   # Install the dependencies
   ./install_deps.sh
   ```

1. **Run the application**
   - Start MongoDB locally on port `27017`
   - Start client and server by changing the directory to the `scripts` folder in separated terminals
     * In one terminal `./run_server.sh` to start the Node server at `http://localhost:8000`
     * In another terminal `./run_client.sh` to start the React web application at `http://localhost:3000`
     > If you want to open the `storybook`, you can change the directory to `scripts` in another separated terminal and run `./run_storybook.sh`. The component's stories are at `http://localhost:6006`

## 🔎 What's inside?

A quick look at the top-level files and directories included with this project.

    .
    ├── client
        ├── .storybook
        ├── node_modules
        ├── public
        ├── src
        ├── package.json
        ├── yarn.lock
    ├── scripts
    ├── server
        ├── logs
        ├── node_modules
        ├── logger.js
        ├── models.js
        ├── package.json
        ├── server.js
        ├── yarn.lock
    ├── .gitignore
    └── README.md

1. **`client`**: This directory contains all of the code related to the frontend implementation using React.

1. **`scripts`**: This directory contains the scripts for installing dependencies and running the application.

1. **`server`**: This directory contains all of the code related to the backend implementation using Node and Express.
