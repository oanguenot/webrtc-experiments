# Understanding constraints

**Constraints** are the way to ask to the browser how he should setup your devices for your calls. This chapter deals with contraints asked by using the `getUserMedia` API. Constraints given to track directly are described in an other chapter.

## Introduction

As described in previous chapter, the **constraints** parameter is an object of type `MediaStreamConstraints` that contains up two properties: `audio` and `video`. These two properties describes the media asked and the constraints asked for each media.

For example, if you want to ask for having an **audio only** call without specific requirement, use the following

```js
const constraints = { audio: true, video: false };
```

this is equivalent to `const constraints = { audio: true };`.

Using `video:false` means that no video is asked for the call. If these constraints can be satisfied by the browser, a `MediaStream` stream is returned that contains only an audio track.

```js
const constraints = { audio: true, video: false };

navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
    // Do something with the stream received
});
```

But depending on constraints asked, they can't be satisfied. For example, your application ask for the video but your computer doesn't have any camera. In that case the API `getUserMedia` returns an error that can be catched by your application.

```js
const constraints = { audio: true, video: true };

navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
        // Do something with the stream received
    })
    .catch((err) => {
        // Do something in case of error
    });
```

When the browser can't satisfy your constraints, your application will receive an error in the `catch` statement. This is up to your application to decide what to do in that case. But if it occurs, your application will not be able to share the media asked.

Depending on the way you write your JavaScript, the following is equivalent

```js
const constraints = { audio: true, video: true };

try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    // Do something with the stream received
} catch (err) {
    // Do something in case of error
}
```

> Keep in mind that the user can decline the authorization when using the API `getUserMedia`. In that case the constraints are not satistied (refused by the user) and so your application will have to catch the error. For example, this scenario happens when the user declines the authorization's popup either because he wants to cancel the call or because the devices he wants to use are not proposed.

## Anatomy of a constraint

Dealing with constraints is not as easy as it looks. The reason why is that first constraints can or not be satisfied and secondly some constraints can be taken into account in one browser and not in an other.

When constraints are not satisfied, depending on the "degree of satisfaction", the browser can accept to receive less from the device or not. If constraints are `exact`, there is more chance to be not satisfied and so your application have to deal with. We call that the **levels** of the constraints.

When constraints are managed differently depending on the browser used, you can have a different user experience and so you need to adapt sometimes your UI. We can call that the **supported capabilities** of the devices. This is like a diamant where a supported capability is one facet.

So a **constraint** is represented in JavaScript by a `key: value` where the key is the name of the capability we want to constraint and the value, the level of constraint applied

And finally, the **constraints** are represented in JavaScript by a `JSON` object describing a set of `key:value`, one for each **constraint**. By default, the **constraints** should contains at least one constraint: audio or video.

### Levels of a constraint

The **levels** are not an official term but they makes your constraints more or less satisfactory.

Three differents levels exist

-   **Near** or **Idel**: This level is less restrictive. There is no risk that the constraint is not satisfied. For example, you ask for a video with a resolution of 640x480. If the camera can't provide a such resolution, the resolution that is closest to the one asked will be taken.

-   **Range**: This level is a little bit more restrictive because the application asks for a contraint inside a range of acceptable values. For example, you ask for a video with a resolution between 640x480 and 1024x768. But if the camera can't provide a resolution in that range, the error `OverconstrainedError` will be returned.

-   **Exact**: This level is the most restrictive because if the device can't provide exactly the constraint asked, the error `OverconstrainedError` will be returned. This level has to be used carefully.

| Level     | Example                                                                                   |
| --------- | ----------------------------------------------------------------------------------------- |
| **Near**  | `"video": { "width": 640, "height": 480 }`                                                |
| **Ideal** | `"video": { "width": { "ideal": 640 }, "height": { "ideal": 480 } }`                      |
| **Range** | `"video": { "width": { "min": 640, "max": 1024 }, "height": { "min": 480, "max": 768 } }` |
| **Exact** | `"video": { "width": { "exact": 640 }, "height": { "exact": 480 } }`                      |

> Levels of contraints can be mixed together. You can for example ask for a constraint of level `range` for the video `width` and a constraint of level `ideal` for the framerate.

### Supported capabilities

The **supported capabilities** of devices are the list of properties that can be compellable and so used as constraints. Here this is all parameters your application can constrain when calling the API `getUserMedia`. They can be used as **constraints**.

Most of the time, you will use only few constraints: `deviceId` for selecting a device, `width` and `height` for picking the resolution of the camera. And often, it will be enough. But other capabilities exist.

To know the list of supported constraints by the browser, you can use the API `navigator.mediaDevices.getSupportedConstraints()`. This API returns a list of constraints managed by the browser for the different ressources managed: video, audio, screen-sharing and image.

| Constraints          | A/V/S/I | Chrome | Firefox | Safari | Type                                          |
| -------------------- | :-----: | :----: | :-----: | :----: | --------------------------------------------- |
| aspectRatio          |  Video  |   X    |         |   X    | Number (Double)                               |
| autoGainControl      |  Audio  |   X    |    X    |        | Boolean                                       |
| brightness           |  Image  |   X    |         |        | Number (Double)                               |
| browserWindow        |    ?    |        |    X    |        | ?                                             |
| channelCount         |  Audio  |   X    |    X    |        | Number (Long)                                 |
| colorTemperature     |  Image  |   X    |         |        | Number (Double)                               |
| contrast             |  Image  |   X    |         |        | Number (Double)                               |
| cursor               | Sharing |        |    X    |        | "always", "motion", "never"                   |
| **deviceId**         |   All   |   X    |    X    |   X    | String                                        |
| displaySurface       | Sharing |        |    X    |        | "application", "browser", "monitor", "window" |
| **echoCancellation** |  Audio  |   X    |    X    |   X    | Boolean                                       |
| exposureCompensation |  Image  |   X    |         |        | Number (Double)                               |
| exposureMode         |  Image  |   X    |         |        | "continuous", "manual"                        |
| exposureTime         |  Image  |   X    |         |        | Number (Double)                               |
| **facingMode**       |  Video  |   X    |    X    |   X    | String ("user")                               |
| focusDistance        |  Image  |   X    |         |        | Number (Double)                               |
| focusMode            |  Image  |   X    |         |        | "user", "environment", "left", "right"        |
| **frameRate**        |  Video  |   X    |    X    |   X    | Number (Double)                               |
| groupId              |   All   |   X    |    X    |        | String                                        |
| **height**           |  Video  |   X    |    X    |   X    | Number (Long)                                 |
| iso                  |  Image  |   X    |         |        | Number (Double)                               |
| latency              |  Audio  |   X    |         |        | Number (Double)                               |
| ~~mediaSource~~      | Sharing |        |    X    |        | "screen", "window" (Deprecated)               |
| noiseSuppression     |  Audio  |   X    |    X    |        | Boolean                                       |
| pan                  |  Image  |        |         |        | Number (Double)                               |
| pointsOfInterest     |  Image  |   X    |         |        | { x:Number (Double), y:Number (Double) }      |
| resizeMode           |  Video  |   X    |         |        | "none", "crop-and-scale"                      |
| sampleRate           |  Audio  |   X    |         |        | Number (Long)                                 |
| sampleSize           |  Audio  |   X    |         |        | Number (Long)                                 |
| saturation           |  Image  |   X    |         |        | Number (Double)                               |
| scrollWithPage       |    ?    |        |    X    |        | ?                                             |
| sharpness            |  Image  |   X    |         |        | Number (Double)                               |
| tilt                 |  Image  |        |         |        | Boolean                                       |
| torch                |  Image  |   X    |         |        | Boolean                                       |
| viewportHeight       |  Video  |        |    X    |        | Number (Long)                                 |
| viewportOffsetX      |  Video  |        |    X    |        | Number (Long)                                 |
| viewportOffsetY      |  Video  |        |    X    |        | Number (Long)                                 |
| viewportWidth        |  Video  |        |    X    |        | Number (Long)                                 |
| volume               |  Audio  |        |         |   X    | Number (Double)                               |
| whiteBalanceMode     |  Image  |   X    |         |        | "none", "manual", "single-shot", "continuous" |
| **width**            |  Video  |   X    |    X    |   X    | Number (Long)                                 |
| zoom                 |  Image  |   X    |         |        | Number (Double)                               |

_Note_: More information on Image constraints can be found here: [W3C MediaStream Image Capture](https://w3c.github.io/mediacapture-image).

> As you can see, only a few constraints are common on all browsers (marked in **bold**). So be careful when using constraints not supported on all browsers to use the API `getSupportedConstraints` to know if you can configure it or not. Hopefully, if at least one constraint is resolved, the API `getUserMedia` returns a `MediaStream`. You can start by putting few constraints to be sure you obtain a `MediaStream` from your devices and them refine your request.

## Giving constraints

As seen previously, the constraints are grouped into a single JSON object such as `{video: yes, audio: yes}`.

Here are some examples of audio and video constraints that can be applied to a microphone and a camera.

### Audio constraints

Audio constraints apply on microphones only.

As seen previously, the minimum constraint is to request for a microphone

```js
const constraints = { audio: true };
```

Then we can select the right microphone we want to use. This is done by using the capability `deviceId`. For the level, if we retrieve the `deviceId` from a database for example, we can use the level `ideal` to avoid a reject if the microphone is not connected or we can use the level `exact` to stick to a specific device.

```js
// Supposing there is a function that returns the microphone `deviceId`
const microphoneId = getMicrophoneId();

const constraints = {
    audio: { deviceId: { exact: microphoneId } },
};
```

We can then add others constraints for example by removing the `echoCancellation` and by setting the sample rate to 8 bits (16 bits is commonly used).

```js
// Supposing there is a function that returns the microphone `deviceId`
const microphoneId = getMicrophoneId();

const constraints = {
    audio: {
        deviceId: { exact: microphoneId },
        sampleSize: 8,
        echoCancellation: false,
    },
};
```

_Note:_ `echoCancellation` is activated by default as well as `noiseSuppression` when supported.

> Most of the cases, you will not have to set complicated constraints for the audio part. By default, browsers set the minimum viable constraints for you. As showned, you could need to specify a desired microphone.

### Video constraints

_todo_

## Common constraints mistakes

When the constraints can't be satisfied, an error is returned. This error contains at least two valuable properties: `name` and `messsage` which help understanding what happened.

-   **name**: The kind of error which could be `TypeError`, `NotAllowedError`, `OverConstrainedError`, `NotFoundError`, `NotReadableError`, `AbortError` and `SecurityError`.

-   **message**: A text describing this error

> Depending on the browser, other properties such as `stack` can be accessible. The property `message` is not homogenous between browsers and seems to be not translated.

### When not over HTTPS

When the application is not launched over `HTTPS`, the WebRTC API returns an error with with a property `name` equals to `TypeError`. When developping your application, you will not encounter this issue by using `localhost`. But you will have to deal with `HTTPS` for sure when in production as for every applications now.

| Browser     | Name      | Message                                                                         | Others |
| ----------- | --------- | ------------------------------------------------------------------------------- | ------ |
| **Chrome**  | TypeError | `Cannot read property 'getUserMedia' of undefined`                              |        |
| **Firefox** | TypeError | `navigator.mediaDevices is undefined`                                           |        |
| **Safari**  | TypeError | `undefined is not an object (evaluating 'navigator.mediaDevices.`getUserMedia') |        |

> In fact, this is not only the API `getUserMedia` that throws an error, but all the WebRTC API because `navigator.mediaDevices` is `undefined` in that specific case.

### When constraints are missing

If the application forgets to define a constraints, for example by sending a `null`, an `undefined` or a empty constraint `{}`, the API `getUserMedia` returns an error with `name` equals to `TypeError`.

This error means that you need to define at least a constraint for the audio and the video. The minimum constraint is to ask for accessing the microphone for an audio only call.

```js
{
    audio: true;
}
```

| Browser     | Name      | Message                                                                                                     | Others |
| ----------- | --------- | ----------------------------------------------------------------------------------------------------------- | ------ |
| **Chrome**  | TypeError | `Failed to execute 'getUserMedia' on 'MediaDevices':<br> At least one of audio and video must be requested` |        |
| **Firefox** | TypeError | `audio and/or video is required`                                                                            |        |
| **Safari**  | TypeError | `TypeError`                                                                                                 |        |

### When declined by the user

When the user declines the authorization, the API `getUserMedia` returns an error with a property `name` equals to `NotAllowedError`.

This error means that the application is not authorized to use the devices proposed or any devices.

> Be careful when declining authorization using Chrome. Once declined, the user needs to reset the blocking by going in his Chrome settings or to restart his browser. Unfortunately, there is nothing that can be done from the application to be able to access the authorization again.

| Browser     | Name            | Message                                                                                                                             | Others |
| ----------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Chrome**  | NotAllowedError | Permission denied                                                                                                                   |        |
| **Firefox** | NotAllowedError | `The request is not allowed by the user agent or the platform in the current context.`                                              |        |
| **Safari**  | NotAllowedError | `The request is not allowed by the user agent or the platform in the current context, possibly because the user denied permission.` |        |

### When a constraint can't be satisfied

When the application asks to use a specific device that is not accessible or when a capability asked is not supported, the API `getUserMedia` returns an error with the property `name` equals to `OverConstrainedError`.

For example, this error happens when the `deviceId` specified in the constraints don't match with a device returned by the API `enumerateDevices`. Concretely, the `deviceId` can be wrong or the device is not yet plugged. An other example is when the application asks for a video resolution that is not supported by the camera. In that case, the `width` parameter is incorrect.

In Chrome and Firefox, the property `constraint` returned in the error object contains the name of the constraint not satisfied. For example, when the `deviceId` is not correct, the property `constraint` is equals to `deviceId` which means that the problem is due to a bad device identifier used. This property exists but is empty in Safari.

| Browser     | Name                 | Message                              | Others                |
| ----------- | -------------------- | ------------------------------------ | --------------------- |
| **Chrome**  | OverconstrainedError | `null`                               | `constraint=deviceId` |
| **Firefox** | OverconstrainedError | `Constraints could be not satisfied` | `constraint=deviceId` |
| **Safari**  | OverconstrainedError | `Invalid constraint`                 | `constraint=''`       |

> Remember that `deviceId` are unique per browser which means that a microphone has a `deviceId` in Chrome that is different than in Firefox and in Safari.

### When devices are not accessibles

When no camera and no microphone are accessible, the API `getUserMedia` returns an error with a property `name` equals to `NotFoundError` in Firefox and `NotAllowedError` in Chrome.

This error happens in different situations:

-   Your computer don't have a camera nor a microphone

-   You disable the access to your camera and microphone (Windows) or you decline your browsers to access the microphone and camera (MacOS).

| Browser     | Name            | Message                                                                                                                              | Others |
| ----------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| **Chrome**  | NotAllowedError | `Permission denied by system`                                                                                                        |        |
| **Firefox** | NotFoundError   | `The object can not be found here.`                                                                                                  |        |
| **Safari**  | NotAllowedError | `The request is not allowed by the user agent or the platform in the current context, possibly because the user denied permission."` |        |

### When devices are already in use

When the microphone and the camera are already in use by an application, the API `getUserMedia` returns an error with a property `name` equals to `NotReadableError`.

> I only saw that error on Firefox after plugging an external camera with microphone and trying to switch to that new device too quickly.

| Browser     | Name             | Message                         | Others |
| ----------- | ---------------- | ------------------------------- | ------ |
| **Firefox** | NotReadableError | `Concurrent mic process limit.` |        |
