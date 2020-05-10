class Stream {
    constructor(stream) {
        this._stream = stream;
    }

    get mediaStream() {
        return this._stream;
    }

    stopAudioIfNotFrom(microphone) {
        if (!this._stream) {
            return;
        }

        this._stream.getAudioTracks().forEach((audioTrack) => {
            if (audioTrack.getSettings().deviceId !== microphone.id) {
                audioTrack.stop();
            }
        });
    }

    stopVideoIfNotFrom(camera) {
        if (!this._stream) {
            return;
        }

        this._stream.getVideoTracks().forEach((videoTrack) => {
            if (videoTrack.getSettings().deviceId !== camera.id) {
                videoTrack.stop();
            }
        });
    }

    get labelOfFirstMicrophone() {
        if (!this._stream) {
            return "-";
        }

        const audioTracks = this._stream.getAudioTracks();

        if (audioTracks.length === 0) {
            return "-";
        }

        return audioTracks[0].label;
    }

    get idOfFirstMicrophone() {
        if (!this._stream) {
            return "-";
        }

        const audioTracks = this._stream.getAudioTracks();

        if (audioTracks.length === 0) {
            return "-";
        }

        return audioTracks[0].getSettings().deviceId;
    }

    get labelOfFirstCamera() {
        if (!this._stream) {
            return "-";
        }

        const videoTracks = this._stream.getVideoTracks();

        if (videoTracks.length === 0) {
            return "-";
        }

        return videoTracks[0].label;
    }

    get idOfFirstCamera() {
        if (!this._stream) {
            return "-";
        }

        const videoTracks = this._stream.getVideoTracks();

        if (videoTracks.length === 0) {
            return "-";
        }

        return videoTracks[0].getSettings().deviceId;
    }
}

export default Stream;
