# WebChat Node/React Application

Web chat application using ReactJS, Node.js and socket.io

## Installation Guide

### Requirements

- [Nodejs](https://nodejs.org/en/download)
- [Mongodb](https://www.mongodb.com/docs/manual/administration/install-community/)

### For Backend

Create a file for environment variables:

```shell
cd server
vi .env
```

Add the following changing with your own configuration with a valid mongodb server:

```shell
PORT=5000
MONGO_URL="mongodb://localhost:27017/chat"
```

Install packages

```shell
npm install
```

Make sure mongodb is running in background.
For start the server:

```shell
npm run start
```

For run the tests:

```shell
npm run test
```

### For Frontend

Create a file for environment variables:

```shell
cd client
vi .env
```

Add the following chaging with your own configuration:

```shell
REACT_APP_LOCALHOST_KEY="chat-app-current-user-2"
REACT_APP_AVATAR_API="https://api.multiavatar.com/4645646"
```

Install packages

```shell
npm install
```

Open another terminal in folder, Also make sure mongodb is running in background.

```shell
npm run start
```
