# WebRTC Experiments

This documentation tries to centralize information around **WebRTC** which is a technology adopted by many applications today. But often, a technology where developers are confused when they have to use it because of the difference between implementations in browsers and the lot of things to put in place to have a complete application which works.

In that documentation, I tried to summarize all information I found. My goal is that every developers without any WebRTC background can integrate this technology in their applications by being confident that they have a strong codebase that will work for a time and not something that will be broken on each browser changes...

For that I created a WebRTC application and the associated server. This application demonstrates most of what is written in the documentation part.

## Documentation

All the documentation is divided into different chapters:

-   [Introduction](./documentation/Introduction.md)
-   [Chapter 1: The story behind WebRTC](./documentation/Story%20behind%20webrtc.md)
-   [Chapter 2: Integrate WebRTC in your application](./documentation/Integrating%20%20WebRTC.md)
-   [Chapter 3: Speaking WebRTC](./documentation/Speaking%20webrtc.md)
-   [Chapter 4: Access to the devices](./documentation/Access%20to%20devices.md)
-   [Chapter 5: Selecting a camera and a microphone](./documentation/Selecting%20devices.md)
-   To complete...

## Application

Additionnaly to the documentatio, I provided a sample application written using React that shows what is described in the documentation.

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
