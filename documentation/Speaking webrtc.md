# Speaking WebRTC

For a developer, WebRTC is not something easily to manipulate and to use. Yes, it is easy to deal with some API to play your local camera, add some visual effects and take a picture.

But to be able to establish a call between two browsers or more complicated between a browser and a native Android or IOS application, the developer needs to understand the "full WebRTC stack" and put in place a complex infrastructure (at least a server) to be able to make this call happen.

This chapter is not a glossary because you can find on Internet a lot of resources which describe in details each WebRTC "word" but tries to focus on the concepts that need to be understand by the "frontend" developer because he will have to manipulate it in most of the cases.

## Media and signaling

This is an interesting point to understand. How WebRTC works ?

As a Web developer, WebRTC can be seen as a set of API offered by the browser to access the microphone and the camera and to call someone else.

This is true but not complete because this is only the **media** part which is the link between the browser and the application that let you control the devices to use. But WebRTC doesn't not provide API to connect with the recipient. That part called the **signaling** part need to be done as well as the **media** part to be able to make a call.

But the main difference is that the **signaling** part is out of the specification of WebRTC.

The good consequence is that you can do it as you want. Some are using a server with **socket.io** and exchange **JSON** messages, others are using more complex signaling protocols based on **Jingle** which is an extension of **XMPP** used for having P2P or conferencing sessions. Regarding the technology, you are free to use a non-persistent connection based on **XMLHTTPRequest** with some **Server-Side Events** or a persistent connection using a **WebSocket**. The only thing you have to do is to transport the signaling information from the issuer to the recever and the opposite when the receiver needs to send information back to the issuer. A ping-pong match...

The bad consequence is that each developer has that same problem to solve. You need a server! On development, this can be done very easily by developing a **Node.JS** application that will relay information coming from one peer to the other. But on production, you will need a server (additional one ?) you can rely on. If you already have a server and already have chat sessions, plugging that signaling part to the existant one should be quick easy.

_Recommmendation_: Reuse your existing server only if it makes sense (if you already exchange information between users in live). If not, it is better to add a new module (micro-service) that will deal with the signaling part. In both cases, take the time to define your protocol or to base your solution on an existing one. Later, it will let you add more features easily.

## HTTPS or die

Due to security reason, it becomes more and more complicated to test WebRTC without having a valid trusted HTTPS certificate.

Some years ago, you can have access without any restrictions to WebRTC API from http://localhost:8888 or from any local IP addresses such as http://192.168.1.8:8888.

For testing from your desktop, you can still use a wild certificate (not trusted by an authority of certification). But as soon as you need to test with a mobile device with Chrome, you will be blocked.

The solution I put in place is to use `ngrok`. Using [**ngrok**](https://ngrok.com/), you get two things: a secure URL to your local server and a public address which lets you test your local application on your mobile.

_Recommendation_: Take the time to have the environment that let you develop and integrate on different devices very easily. Do not wait to have issues coming from your customer to put in place the right environment to test.

## Compatibility on mobile

Most browsers on mobile are compliant with WebRTC. The main exception is on IOS where only Safari supports WebRTC. Other browsers on IOS can't use WebRTC.

For providing the best experience on mobile, the best is that your application supports the browser "propulsed" by the platform which should represents the majority of users. So, on IOS, the alternative is to ask the users to use Safari.

| Mobile                       | Browsers compliant      | Browsers not compliant                                                                 |
| ---------------------------- | ----------------------- | -------------------------------------------------------------------------------------- |
| **Apple**<br>Ipad, Iphone    | **Safari**              | Chrome, Firefox<br>[Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=752458) |
| **Android**<br>Phone, Tablet | **Chrome**, **Firefox** | Some specific mobile vendor browsers                                                   |

## Streams and Tracks

When acquiring the audio and video from your devices using the API `getUserMedia`, your application receives a `MediaStream` object. Often, we call it a **stream**.

Your camera and microphone are called the **input** sources. The MediaStream obtained is the **input** stream.

A MediaStream is able to carry both audio and video using **MediaStreamTracks**. Often we use the word **tracks**. Tracks in the same MediaStream are synchronized.

For example, if you request the access to your microphone and camera, you receive a MediaStream with 2 MediaStreamTracks, one corresponding to the microphone used and the second corresponding to the camera captured.

Once you have an input stream, you can "plug" it to one or several **output** sources which can be a &lt;video&gt; element, a &lt;audio&gt; element or a WebRTC component that transmits the video to your recipient (aka: a Peer Connection) .

---

Last edition May, 01th 2020
