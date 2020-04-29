# Access to devices

WebRTC provides JavaScript API to list and to select the devices to use for your calls.

## Introduction

Accessing the devices (exemple: microphone and camera to use) can be done by using APIs behind `navigator.mediaDevices`. But to be allowed to do that correctly, the application should prompt the user for the authorization to access the microphone and the camera to use. This is for security reason to avoid any malicious applications to listen or to see what happens in your room from your computer.

## Limited access when not authorized

We can try to access the list of devices by using the API `navigator.mediaDevices.enumerateDevices` and check what happens.

Without having authorizing the application to access your devices, you don't have full information when you call that API.

For example, on Chrome, when executing the following code:

```js
export const enumerateDevices = async () => {
    await navigator.mediaDevices.enumerateDevices().then((devices) => {
        console.log(devices);
    });
};
```

You obtain an `Array` containing the list of devices found

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

Two things to notice:

-   Some information are missing: `label` and `deviceId`. Without the `deviceId`, you can't use the device in your call.

-   Only a part of the devices found could be accessible (depending on the browser).

## Complete access when authorized

Your application needs to request the access to the microphone and camera by using the API `navigator.mediaDevices.getUserMedia` such as in that example

```js
export const getUserMedia = async () => {
    const constraints = {
        audio: true,
        video: true,
    };

    await navigator.mediaDevices.getUserMedia(constraints);
};
```

Now, if you call the two previous functions described, such as in the following, you get the complete list and information.

```js
export const getandenumerate = async () => {
    await getUserMedia();
    await enumerateDevices();
};
```

Once called, you receive the following

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

Now, your application have access and is able to use these devices in a call.

## MediaDeviceInfo content

Each device listed contains at this time of writing the following information that help you informing the user about the current device selected:

-   `deviceId`: Identifier of the device. This identifier persist on each browser. For example, you can save it in your localstorage and select it automatically when the user visits again your application. Be careful, this identifier is different on each navigator.

-   `groupId`: Devices sharing the same identifier belong to the same physical device. It helps you proposing homogeneous input and output channels when `label` information is not helpful.

-   `kind`: This is the type of device detected. It could be `audioinput` for microphones, `videoinput` for cameras and `audiooutput` for speakers.

-   `label`: This is a user-friendly label describing the device. Labels are not homogeneous between navigator and seems not to be translated according to the navigator's language.

## Browser's strategy for the authorization's request to access the devices

Each browser has its own strategy. So, it could be complicated to provide the same experience on all browsers due to the way the browser manages that authorization's request.

If you use a WebRTC application, you will encounter the different cases depending on the browser you use:

-   On Firefox, when asking for the authorization, you can select the device to use directly. You could be prompted several times if you have several devices. It seems that you need to authorize each camera.

-   On Chrome, you are prompted only the first time you visit the page. The authorization is global for the page and not linked to the devices. By default, Chrome fosters external devices added and plugged.

-   On Safari, you are prompted each time you visit the page. It seems that in contrary to Chrome, Safari fosters internal devices even if an external camera is plugged for example.

## Notable differences between browsers

Here are some notable differences between browsers seen recently

| Browser                    | Object                                 | Input | Output | Other observations                                                                                                                                                                                                                                                              |
| :------------------------- | -------------------------------------- | :---: | :----: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Chrome**<br>(M81 / Mac)  | **InputDeviceInfo**<br>MediaDeviceInfo |  Yes  |  Yes   | a) Only input devices are available without requesting the authorization                                                                                                                                                                                                        |
| **Firefox**<br>(75 / Mac)  | MediaDeviceInfo                        |  Yes  | **No** | a) Output devices can be listed by changing the configuration using `about:config`. See that [document](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices) for more information.<br/><br/>b) deviceId is accessible without asking for permissions |
| **Safari**<br>(13.1 / Mac) | MediaDeviceInfo                        |  Yes  | **No** | `groupId` seems not to be implemented. Always equals to an empty string.                                                                                                                                                                                                        |

Note: Tests done on **Microsoft Edge** (81 / Mac) shown the same results as for Chrome (both based on Chromium)

---

Last edition April, 29th 2020
