# WebChat Node/React Application

Web chat application using ReactJS, Node.js and socket.io

## Installation Guide

### Requirements

- [Nodejs](https://nodejs.org/en/download)
- [Mongodb](https://www.mongodb.com/docs/manual/administration/install-community/)

#### For Backend

Create a file for environment variables:

```shell
cd server
vi .env
```

Add the following:

```shell
PORT=5000
MONGO_URL="mongodb://localhost:27017/chat"
```

Install packages

```shell
npm install
```

Open another terminal in folder, Also make sure mongodb is running in background.

```shell
cd server
npm run start
```
