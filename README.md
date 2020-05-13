# WebRTC Experiments

This application experiments WebRTC API and tries to develop a good software architecture for integrating WebRTC. Often, developers are confused when they have to use it because of the difference between implementations in browsers and the lot of things to put in place to have a complete application which works.

My goal is that every developers without any WebRTC background can integrate this technology in their applications by being confident that they have a strong codebase that will work for a time and not something that will be broken on each browser changes...

For that I created a WebRTC application and the associated server. This application demonstrates some of the most common usage of WebRTC.

## Concepts used

-   **getUserMedia**: Microphone and Camera authorization by using constraints

-   **enumerateDevices**: Enumerate devices available and listen to change

-   ... to complete

## Application

The sample application written using React that shows what is described in the documentation.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To launch it, just clone the repository and then

```shell

yarn install

```

Once all dependencies have been downloaded, launch the server

```shell

node server/server.js

```

and then launch the application

```shell

yarn start

```
