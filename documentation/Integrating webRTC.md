# Integrate WebRTC in your application

I seen a lot of applications in my life. I'm not a great software architect but I think I succeeded to put the minimum viable architecture in the applications I developed so I tried to share some advices here to ease your WebRTC integration.

## Sample application

Attached to that documentation is a sample application that illustrates some of these architectures advices. Depending on your existing codebase, it could be more or less complicated to integrate. But, putting in place some of them will help your keeping that part under control and avoid to propagate this new code everywhere in your existing codebase.

_Recommendation_: As for every new part of code added, spend some time thinking on how you will introduce it. If you need to rework on some parts, do it before adding the WebRTC stuff, because once added, it will take more time to rework as usual...

## Separation of concerns

One of the difficulties with WebRTC is that all the API is deeply linked with the `navigator` object and with your &lt;video&gt; and &lt;audio&gt; DOM elements.

The bad ideas is to put all the WebRTC stuff in your views...

As for every applications, the design principle of the [**separation of concerns**](https://en.wikipedia.org/wiki/Separation_of_concerns) will help you writing a good application architecture.

By separing your WebRTC code in separate modules, you will keep closed that technology and avoid having to patch every views each time you enhance your application or each time there are breaking changes in the WebRTC implementation.

_Recommendation_: Keep all the methods that deal with the WebRTC API and events in a dedicated module. Propagate your own events or state models in your views to not rely on WebRTC. This will simplify your development by putting in place a strong "API" between your views and your modules based on your business part and not based on WebRTC.

## Encapsulate and enrich WebRTC

Imagine that your views need to know if there is or not a video to display or not the &lt;video&gt; As you will discover in the documentation, the information can be accessed from the WebRTC `MediaStream` object.

But instead of using the WebRTC methods directly in your view, you can provide some useful methods from your WebRTC modules such as

```js
// Define these functions in your WebRTC module and call them from your views
const hasAVideoTrack = (stream) => {
    return stream.getVideoTracks().length > 0;
};

const getVideoTrack = (stream) => {
    if (!hasAVideoTrack()) {
        return;
    }

    return stream.getVideoTracks()[0];
};
```

Having some **high level** will help you simplifying your views codebase. All the view needs to know is that for displaying a video, the view should access the video track. that all. How to access the video track is not the problem of the view, this is the problem of the WebRTC module because the implementation is deeply linked to the WebRTC and perhaps not the same on all browsers.

_Recommendation_: The advice I try to keep in mind is to say "My views have no idea of what WebRTC is and should call all the WebRTC stuff from outside". So, put away from the view all WebRTC direct call to APIs and all the events subscriptions.

## WebRTC-Adapter

Some words about that library.

Some years ago, building a WebRTC application without that library was really a great challenge because of the diversity of the WebRTC implementations among browsers.

Now, I have a different feeling. If you want to stick with the latest new WebRTC features and so API, I think, you still need to add it because it will make the glue between the changes brought by the browsers evolution before a common adoption. If your users are using old systems and so an old browser's version, I think you need to use it too.

But if you are using only common WebRTC API and make P2P calls, you can directly write your code without using that library. It will work.

_Recommendation_: Start without the library to really see how it works and confront yourself to the current **WebRTC "state of the art"** and so common complicated things and issues. If you see that the library helps you to overcome the difficulty, use it. Elsewhere, don't use it.

## Open-source WebRTC libraries

Free or open-source WebRTC libraries exist and can be integrated in your application. But be careful because a majority of them have the **signaling** part and the **media** part deeply linked together and so you will need to integrate the whole (application side + server side). If you don't already have a server part, it could help you developing faster. In the other case, you will have to integrate that part with your existing server.

_Recommentation_: As for other open-source libraries, be sure that the library is still maintained and have a community of users. Some libraries were developed some years ago when the need of **helpers** were huge, but now, you need less and less libraries to be able to use WebRTC if you stay on the common case.

## Paid WebRTC libraries

Additionnaly to the open-source libraries, you can find paid solutiond. In a majority of the cases, they provide the infrastructure components (TURN, STUN) that make your application works in 99,99% of the case which means in the cases when the users are not directly connected to Internet but behind a corporate firewall or some network equipements that block the traffic.

When using these libraries of SDK, you will often paid for the traffic that goes through the infrastructure in place.

_Recommendation_: Not easy to give an advice here. But, if you have some IT skills, it is not complicated to deploy a [**Coturn**](https://github.com/coturn/coturn) server. If you don't want to "put the hands in the engine" and want to rely on a "well-known" partner, this solution let you focus on your application and not on the infrastructure.

## Early versions

Having the possibility to test your WebRTC application at least on a Beta version of the browser is something that helps you being more confident. Don't forget that browsers update them self each month or each two month and so the environment of your application changes at the same pace.

_Recommendation_: If you stick with the latest WebRTC API, you need to install at least a Beta version of each browser. For Chrome, you can install the [Chrome for developers](https://www.google.com/intl/en/chrome/dev/) version that is updated every weeks and that contain the latest development already merged, so one or release in advance. The same is provided by Firefox with the [Developer Edition](https://www.mozilla.org/en-US/firefox/channel/desktop/). For Safari, you can download the [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) to have access to an early version.

## Debugging

Debugging WebRTC is not so easy too. Because you will have to debug both the **signaling** and the **media** parts.

On the **signaling** part, you should find all the messages exchanged between peers that can help you understanding what happened. On that part, you can log the messages. But you need the WebRTC knowledge to understand the content.

On the **media** part, a first step of understanding is accessible just by the absence of the media. If you don't see the recipient or don't hear him, you know that you have an issue... More concretely, using Chrome you have access to a [Chrome WebRTC internals](chrome://webrtc-internals/), the same for Firefox with the [about:WebRTC](about:webrtc). I'm not aware of a such tool for Safari at this time of writing. These tools give you a lot of information regarding the establishment of the media session and the session itself.

Additional logging methods can be put in place with Chrome on different platforms by following the guide [WebRTC Logging](http://webrtc.github.io/webrtc-org/native-code/logging/). The same for Firefox in that guide [Media/WebRTC/Logging](https://wiki.mozilla.org/Media/WebRTC/Logging).

If you're more than a Web developer, you can use a network packet analysis tool such as **Wireshark**. And if you have deployed your own TURN server, such as **Coturn**, you can check the associated logs if there is trouble when establishing the session.

_Recommendation_: You need to be able to quickly identify where is located the issue. Often, you need to have logs from the issuer and from the recipient to have the complete view of what happened. Using _special_ tools such as **WebRTC internals** give you _superpowers_ that can save your day!

---

Last edition May, 05th 2020
