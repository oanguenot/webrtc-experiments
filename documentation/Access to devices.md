# Access to devices

WebRTC provides some JavaScript API to access your microphone and camera and to use them during your calls.

This chapter describes the API to use for authorizing the browser to access your devices and for enumerating the complete list of devices found.

## Introduction

Accessing the devices (exemple: microphone and camera to use) can be done by using APIs behind `navigator.mediaDevices`. But to be allowed to do that correctly, the application should prompt the user for the authorization to access the microphone and the camera to use. This is for **security reason** to avoid any malicious applications to listen or to see what happens in your room from your computer.

## Get the authorization

Your application needs to request the access to the microphone and camera by using the API `navigator.mediaDevices.getUserMedia`. When calling that asynchonous API, all browsers do the same which is displaying a popup to ask the user.

You need to request an access for the input audio device (microphone) as well as for the input video device (video). If you only ask for the input audio device, you will not be able to send your video to your recipient.

This information are called the **constraints**.

The following sample show how to request the access to the microphone and the camera using the minimum constraints.

```js
export const getUserMedia = () => {
    const constraints = {
        audio: true,
        video: true,
    };

    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        // Do something once you got access
    });
};
```

_Recommendation_: The API `navigator.mediaDevices.getUserMedia` is always the first API you need to call when using WebRTC. Without using that API first, you will not be able to display correctly the complete list of your devices and for sure share your voice and video with your recipient. Constraints that can be used for requesting the authorization can be more detailled if you want to offer a better integration. These possibilities and the way to handle the errors are described in a dedicated chapter.

## Browser's strategy for the authorization's request to access the devices

Each browser has its own strategy. So, it could be complicated to provide the same experience on all browsers due to the way the browser manages that authorization's request.

If you use a WebRTC application, you will encounter the different cases depending on the browser:

-   On **Firefox**, when asking for the authorization, you can select the device to use directly. You are prompted each time you select differents devices.

-   On **Chrome** (and Edge), you are prompted only the first time you visit the page. The authorization is global for the page and not linked to the devices. By default, Chrome fosters external devices added and plugged.

-   On **Safari**, you are prompted each time you visit the page. It seems that in contrary to Chrome, Safari fosters internal devices even if an external camera is plugged for example.

_Recommendation_: There are two consequences. First you need to test on each browser to adapt your behavior and secondly, on Chrome, you need to test the first time your application starts which can be simulated by closing and restarting your browser and then after refreshing your application because this is two differents use cases.

## Enumerating your devices

Enumerating the list of internal and external (plugged) microphones and cameras can be done by using the API `navigator.mediaDevices.enumerateDevices`. This API returns (asynchronously) the complete list of devices found and accessible.

Here is an example of the code needed to list the devices detected by the browser.

```js
export const enumerateDevices = () => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
        // Do something once you got the devices
    });
};
```

As a result, you obtain the following if you have a look to the `devices` object.

```js
InputDeviceInfo {
  deviceId: "default"
  groupId: "960851b1639bd680058a677f68885048f402372da36b6ea3b41badd4d32ad17d"
  kind: "audioinput"
  label: "Par défaut - Internal Microphone (Built-in)"
}

InputDeviceInfo {
  deviceId: "410274a5b275d841b05fbac77e8379c4c88c5151baf590eee6704c8f89f9c97b"
  groupId: "ff8b6e8a2ead9a58c4ff7f031deb33c0a394e29dc6fd3e0552832ea09be1192b"
  kind: "audioinput"
  label: "Internal Microphone (Built-in)"
}

MediaDeviceInfo {
  deviceId: "5302dfe92eab9fbfc6aaedfd808632f73e5d728aab003afe8ad39dd9988a1a1a"
  groupId: "c96445abf77075d5835ee7837f480ef0abe01bddcc3f9a4ef0934d69c9714ae2"
  kind: "audiooutput"
  label: "PL2792Q (DisplayPort)"
}
```

Depending on the browser used, there are some notables differences

| Browser                    | Object                                 | Input | Output | Other observations                                                                                                                                                                                                                                                              |
| :------------------------- | -------------------------------------- | :---: | :----: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Chrome**<br>(M81 / Mac)  | **InputDeviceInfo**<br>MediaDeviceInfo |  Yes  |  Yes   | a) Only input devices are available without requesting the authorization                                                                                                                                                                                                        |
| **Firefox**<br>(75 / Mac)  | MediaDeviceInfo                        |  Yes  | **No** | a) Output devices can be listed by changing the configuration using `about:config`. See that [document](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices) for more information.<br/><br/>b) deviceId is accessible without asking for permissions |
| **Safari**<br>(13.1 / Mac) | MediaDeviceInfo                        |  Yes  | **No** | `groupId` seems not to be implemented. Always equals to an empty string.                                                                                                                                                                                                        |

Note: `InputDeviceInfo` and `MediaDeviceInfo` are quiet similar in term of definition (properties and methods).

Note: Tests done on **Microsoft Edge** (M81 / Mac) shown the same results as for Chrome (both based on Chromium)

Now, your application have access and is able to use these devices in a call.

_Recommendation_: As for mobile applications, it is a good practice for asking permissions when the application starts because this will help you to detect potential issue and inform the user before he tries to make a call. But depending on the browser, this step can have a visual impact so the user could ask why ? So, the best I think is if you ask, to display the devices found and _in use_ or equivalent somewhere in your user interface with a special mark in case of issues.

## MediaDeviceInfo content

Each device listed which is of type `MediaDeviceInfo` contains the following information that help you informing the user about the identify of these devices:

-   `deviceId`: Identifier of the device. This identifier persists on each browser. For example, you can save it in your localstorage and select it automatically when the user visits again your application. Be careful, this identifier is different for each navigator (For example, not the same on Chrome than on Firefox).

-   `groupId`: Devices sharing the same identifier belong to the same physical device. It helps you proposing homogeneous input and output channels when `label` information is not helpful.

-   `kind`: This is the type of device detected. It could be `audioinput` for microphones, `videoinput` for cameras and `audiooutput` for speakers.

-   `label`: This is a user-friendly label describing the device. Labels are not homogeneous between navigator and seems not to be translated according to the navigator's language.

## Limited access when not authorized

If you try to call the API `navigator.mediaDevices.enumerateDevices` without asking first the permission, you will obtain only a subset of information..

For example, on Chrome, you get the following

```js
// for input devices found
InputDeviceInfo {
  deviceId: ""
  groupId: "83259d8177e7573cdc7005b36247e1ed1a4ea6915c064b2ecfeb0ee90b43a448"
  kind: "audioinput"
  label: ""
}

InputDeviceInfo {
  deviceId: ""
  groupId: "9a161fbdbf656461110bee7d405269a25854dde15c9449e6f9f77bd3222192f4"
  kind: "videoinput"
  label: ""
}

// for output devices dounf
MediaDeviceInfo {
  deviceId: ""
  groupId: "75a3f87dcdc076862a39aed6575dc96c512c09ed97d9a5f123068e3c2705c063"
  kind: "audiooutput"
  label: ""
}
```

The important things to notice are that:

-   Some information are missing: `label` and `deviceId`. Without the `deviceId`,

-   You can't get access the media (stream) from these devices.

So, the only way to have access is to ask for the authorization before.

---

Last edition April, 29th 2020
