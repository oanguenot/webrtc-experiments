# Selecting a camera and a microphone

## Introduction

As seen in the [Chapter 1 - Access to devices](./Chapter%20%1%20-%20Access%20to%devices.md), when asking for the authorization and in case of success, you will get access a at least a microphone and a camera. Speakers will be treated
specifically but most of the case is linked to the input audio device.

Sometime it is the right device you want to use but sometimes not. This chapter gives you hints for handling the devices correctly.

## Knowing which microphone and camera are used

It is interesting to inform the user about the microphone and camera currently shared even if most of the case the user can deduce it very easily...

For that, we need to start by requesting the microphone and camera as in the following sample

```js
// Presuming that `localVideoElt` is a reference to your <video> tag

export const getUserMedia = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    localVideoElt.srcObject = stream;
};
```

After executing this code, your video will be displayed. But the question is from which source it comes ?

Hopefully, we can ask the browser to have the answer.

### Knowing the label of the device used

As seen previously, the `label` associated to the device could be an interesting information that can be displayed on screen to help the user understanding which device is used.

To be able to display it, you need to have access to the **MediaStreamTrack** as in the following code

```js
const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });

// Get the current video track assuming you have at least one
const videoTrack = stream.getVideoTracks()[0];

// Accessing the label property
const deviceLabel = videoTrack.label;
```

For example, this information could be _Internal Microphone_ for example or _WebCam HD 3310_.

### Knowing the deviceId of the device used

It can be interesting to get the `deviceId` information of the device used, for example if you want to store it for a further use.

This information is not associated directly to the `MediaStreamTrack` object but can be obtained by calling the method `getSettings()`.

```js
const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });

// Get the current video track assuming you have at least one
const videoTrack = stream.getVideoTracks()[0];

// Accessing the deviceId property
const deviceId = videoTrack.getSettings().deviceId;

// Accessing the groupId property
const groupId = videoTrack.getSettings().groupId;
```

### Identifying the microphone and the camera

For displaying information on screen regarding your microphone and camera you need to do that 2 times: one for the MediaStreamTrack representing the audio input (which means for the microphone) and a second time for the MediaStreamTrack representing the video output (which means for the camera).

Use the method `getVideoTracks()` and `getAudioTracks()` for retrieving these labels and device identifiers.

## Selecting a specific microphone and camera

Knowing which devices are used is a first step for helping the user choosing the right equipments.

The second one is by using the method `enumerateDevices()` as described in the document [Access to devices](Access%20to%devices.md). Using that method, you will be able to display 2 lists of devices: one for the audio input devices and a second list for the video input devices.

The last steps is to let the user selects the devices he want and apply his choise. For that you have at least 2 strategies.

### Mixing audio and video devices

The first strategy is to let the user choose without applying any additional logics. Here, the user can select to have the video source coming one physical device and the audio source from an other one. He decides.

Selecting a new device is done by calling again the method `getUserMedia()` with the `deviceId` selected

```js
// Use the deviceId in the constraints
const constraints = {
    audio: { deviceId: { exact: microphoneDeviceId } },
    video: { deviceId: { exact: cameraDeviceId } },
};

const stream = await navigator.mediaDevices.getUserMedia(constraints);
```

### Smoothling the experience

The second strategy is to group devices per `groupId` which means proposing a simplified UI where you have less choices.

This strategy is complicated for several reasons:

-   Internal devices used are not identified from others

-   `groupId` is not yet implemented in Safari (13.1)

---

Last edition May, 01th 2020
