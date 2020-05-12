# Selecting a camera and a microphone

## Introduction

As seen in the previous chapter, when asking for the authorization and in case of success, you will get access at least to a microphone and a camera. Speakers will be treated specifically but most of the case are linked to the input audio device.

Sometimes these devices selected "by default" are the right devices you want to use but sometimes not. This chapter gives you hints for handling the devices correctly.

## Knowing which microphone and camera are used

It is interesting to inform the user about the microphone and camera currently shared even if most of the case the user can deduce it very easily.

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

As seen previously, the `label` associated to the device could be an interesting information that can be displayed on screen to help the user understanding which device is used. But how to make the link between the `label` coming from the `enumerateDevices` API and the stream received from the `MediaStream`. Fortunately, the `MediaStream` object contains more than the media.

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

It can be interesting to get the `deviceId` information of the device used, for example if you want to store it for a further use or to mark the device "in use" in your list of devices.

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

For displaying information on screen regarding your microphone and camera you need to call the previous code 2 times: one for the MediaStreamTrack representing the audio input (which means for the microphone) and a second time for the MediaStreamTrack representing the video output (which means for the camera).

Use the method `getVideoTracks()` and `getAudioTracks()` for retrieving these labels and device identifiers.

## Selecting a specific microphone and camera

Knowing which devices are used is a first step for helping the user choosing the right equipment.

The second one is by using the method `enumerateDevices()` as described in the previous chapter. Using that method, you will be able to display 2 lists of devices: one for the audio input devices and a second list for the video input devices.

The last steps is to let the user selects the devices he want and apply his choise. For that you have at least 2 strategies.

> As described here, the best is to display to different lists: one for the microphone and one for the video. The reason is that most of the cases, there is no link between them and the user needs to pick one from each list. As soon as you plug or connect an external device you will, your lists will augment not symmetrically. Adding a new headset will only add a new microphone to the list. Plugging a camera can add a new camera as well as a new microphone.

### Mixing audio and video devices

The first strategy is to let the user choose without applying any additional logics. Here, the user can select to have the video source coming one physical device and the audio source from an other one. He decides.

Selecting a new device is done by calling again the method `getUserMedia()` with the `deviceId` selected. As seen previously, this can be done by having a more specific constraints.

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

> For that case, the best is when the user selects a microphone to check if a camera contains the same `groupId`. If yes, to select the associated camera automatically. If you want to force that strategy, do the same when selecting the camera. If you want some granularities, let him select a different camera.

### What are the default devices ?

Seems to be an easy question... But I didn't find any answer at that question. In fact, it depends on what you call "default" devices.

From my perspective, "default" means the internals or "built-in" devices. I would like to identify the internals from the plugged-in devices. But this is not how it was implemented. You have a list of devices without any possibilities to differentiate internals from plugged-in devices. Consequently, the application can't help the user for that. This is the responsability of the user to identify correctly the devices he wants to use based on the label displayed. Hope this is enough!

> Be careful when trying to _deduce_ the default devices from the label. Labels are not consistent between browsers. You could have _By default Internal Microphone (built-in)_ on Chrome and _Internal Microphone_ on Firefox and Safari.

## Detecting new devices

---

Detecting new devices is a great thing that offers a lot of possibilities. You could at least update your list of devices automatically without having to add a "refresh" button. But moving a step forward lets you propose to switch automatically to that new devices, because if the user plugs them in, there is a good chance that he wants to use them.

By chance, WebRTC lets you detect when you plug a new device by firing an event when it occurs. Listening to new devices is done by adding a listener to the event `ondevicechange`.

Here is a example that illustrates the use of that event

```js
navigator.mediaDevices.ondevicechange = (evt) => {
    // Do something when a new device has been plugged or unplugged
};
```

For sure this event is fired when the user unplugs the device too.

The first complicated part is that we do not receive a list of `MediaDeviceInfo` representing the devices added or removed. The application gets the DOM event instead. So you need to call the API `enumerateDevices` and to compare the result with your previous list of devices. Receiving less devices indicates that the user removes at least one. Receiving more indicates that he plugs in at least one device.

The second complicated thing is due to the differences of implementation in browsers:

-   Using **Chrome**, there are unexpected events `ondevicechange` fired. For example, when plugged an external camera containing an embedded microphone, event `ondevicechange` was fired 3 times. Same number of events received when removing the camera.

-   Using **Safari**, there is first an unexpected event `ondevicechange` fired after calling `getUserMedia` and then for the same example than on Chrome, one event received when removing the camera and 2 events received when adding it.

-   Using **Firefox**, the behavior seems to be the expected one: One event received when plugged in or unplugged (same camera used). But sometimes, there is issue with Firefox when switching the devices too quickly.

### Finding the devices

Unfortunately and as seen previously, the event `ondevicechange` don't contain the list of the devices added or removed. This is up to your application to add that logic. Here is a sample of code I use to return the difference

```js
// Supposing `current` is your current list of devices and `update` is the new one
export const diff = (current, update) => {
    // Return a number of results added (positive) or removed (negative) and the list of devices added or removed
    let result = {
        count: 0,
        list: [],
    };

    // Same number of devices. We assume that there is no difference.
    if (devices.length === update.length) {
        return result;
    }

    if (devices.length > update.length) {
        // This is the case when devices have been plugged in
        let newDevices = devices.filter((device) => {
            return !update.some((elt) => elt.deviceId === device.deviceId);
        });

        return {
            count: newDevices.length,
            list: newDevices,
        };
    } else {
        // Here, devices have been unplugged
        let removedDevices = update.filter((device) => {
            return !devices.some((elt) => {
                return elt.deviceId === device.deviceId;
            });
        });

        return {
            count: 0 - removedDevices.length,
            list: removedDevices,
        };
    }
};
```

If you receive for example `count=1`, this means that a new device has been plugged. `list` property contains the `MediaDeviceInfo` added.

### Preventing the browsers's differences

In order to prevent from the differences of implementations in browsers as described, you could try to have the same behavior in all browsers regarding the way the event `ondevicechange` is fired.

Here is an example of having only one event `ondevicechange` fired that lets you then call the function `diff()` in the same manner regardless of the browser.

```js

let hasChanged = false;

navigator.mediaDevices.ondevicechange = () => {
    if(!hasChanged) {
        hasChanged = true;
        setTimeout(() => {
            hasChanged = false
            // Do something only once
            try {
                let update = await navigator.mediaDevices.enumerateDevices();
            } catch (err) {}
        }, 2000);
    }

};

```

Using that example, you enumerate the devices only once and after a short period to be sure that the devices have been all identified correctly.
