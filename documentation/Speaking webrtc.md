# Speaking WebRTC

For a developer, WebRTC is not something easily to manipulate and to use. Yes, it is easy to deal with some API to play your local camera, add some visual effects and take a picture.

But to be able to establish a call between two browsers or more complicated between a browser and a native Android or IOS application, the developer needs to understand the "full WebRTC stack" and put in place a complex infrastructure (at least a server) to be able to make this call happen.

This chapter is not a glossary because you can find on Internet a lot of resources which describe in details each WebRTC "word" but tries to focus on the concepts that need to be understand by the "frontend" developer because he will have to manipulate it in most of the cases.

## HTTPS or die

Due to security reason, it becomes more and more complicated to test WebRTC without having a valid trusted HTTPS certificate.

Some years ago, you can have access without any restrictions to WebRTC API from http://localhost:8888 or from any local IP addresses such as http://192.168.1.8:8888.

For testing from your desktop, you can still use a wild certificate (not trusted by an authority of certification). But as soon as you need to test with a mobile device with Chrome, you will be blocked.

The solution I put in place is to use `ngrok`. Using [**ngrok**](https://ngrok.com/), you get two things: a secure URL to your local server and a public address which lets you test your local application on your mobile.

## Compatibility on mobile

Most browsers on mobile are compliant with WebRTC. The main exception is on IOS where only Safari supports WebRTC. Other browsers on IOS can't use WebRTC.

For providing the best experience on mobile, the best is that your application supports the browser "propulsed" by the platform which should represents the majority of users. So, on IOS, the alternative is to ask the users to use Safari.

| Mobile                       | Browsers compliant      | Browsers not compliant                                                                 |
| ---------------------------- | ----------------------- | -------------------------------------------------------------------------------------- |
| **Apple**<br>Ipad, Iphone    | **Safari**              | Chrome, Firefox<br>[Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=752458) |
| **Android**<br>Phone, Tablet | **Chrome**, **Firefox** |                                                                                        | Some specific mobile vendor browsers |

## Streams and Tracks

When acquiring the audio and video from your devices using the API `getUserMedia`, your application receives a `MediaStream` object. Often, we call it a **stream**.

Your camera and microphone are called the **input** sources. The MediaStream obtained is the **input** stream.

A MediaStream is able to carry both audio and video using **MediaStreamTracks**. Often we use the word **tracks**. Tracks in the same MediaStream are synchronized.

For example, if you request the access to your microphone and camera, you receive a MediaStream with 2 MediaStreamTracks, one corresponding to the microphone used and the second corresponding to the camera captured.

Once you have an input stream, you can "plug" it to one or several **output** sources which can be a &lt;video&gt; element, a &lt;audio&gt; element or a WebRTC component that transmits the video to your recipient (aka: a Peer Connection) .

---

Last edition May, 01th 2020
