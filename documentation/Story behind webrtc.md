# The story behind WebRTC

This document is my personal understanding of how the WebrRTC technology has emerged from browser. I'm not from Google but the main information I found is related to Google and Chrome because they have a clear WebRTC release notes.

## A long time ago

WebRTC premises appeared at the beginning of the century. Microsoft by bying Skype, Google for GTalk and Firefox by working on codecs. All are preparing their weapons. But 2 clans emerges :pure browsers vendors with Firefox and Chrome and Microsoft with 2 WebRTC specifications proposals.

|   Date    | Interesting facts                                                                                                                                                                                                                                                              |
| :-------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Aug, 2003 | First public beta version of Skype                                                                                                                                                                                                                                             |
| Sep, 2005 | eBay acquires Skype for US\$2.5 billion in up-front cash and eBay stock                                                                                                                                                                                                        |
| Oct, 2006 | [Justin Uberti](https://twitter.com/juberti) AIM (AOL) hired by Google (for working on Google Talk).                                                                                                                                                                           |
| Avr, 2007 | [Serge Lachapelle](https://twitter.com/slac) hired by Google                                                                                                                                                                                                                   |
| Sep, 2008 | First release of VP8 by On2                                                                                                                                                                                                                                                    |
| Nov, 2008 | Serge Lachapelle’s team (included Justin Uberti) added voice and video chat in Gmail using XMPP, H264/SVC                                                                                                                                                                      |
| Sep, 2009 | Chrome 3 adds the support of &lt;Audio&gt; and &lt;Video&gt;                                                                                                                                                                                                                   |
| Feb, 2010 | Google buys On2 for 124,6 M dollars (Vpx video codecs)                                                                                                                                                                                                                         |
| May, 2010 | Chrome 5 adds the support of the HTML5 WebSocket API + Adobe Flash player integration                                                                                                                                                                                          |
| May, 2010 | Google buys Global IP Solutions for 68,2M dollars (GIPS has developed real-time voice and video processing software for IP networks and the narrowband iLBC and wideband iSAC speech codecs).<br> Acquisition leaded by Serge Lachapelle. Lachapelle starts working on WebRTC. |
| Sep, 2010 | Opus submitted to the IETF                                                                                                                                                                                                                                                     |
| Jan, 2011 | Chrome will no more support H264 for HTML5 &lt;video&gt; tag. Same for Firefox and Opera                                                                                                                                                                                       |
| Jan, 2011 | Chrome announces the release of a plugin for Safari and IE that supports his new WebM format for the HTML5 &lt;video&gt; tag                                                                                                                                                   |
| Feb, 2011 | Microsoft releases a Chrome plugin to support H264 again in the HTML5 &lt;video&gt; tag                                                                                                                                                                                        |
| Apr, 2011 | Chrome 11 adds the support of the HTML5 Speech Input API                                                                                                                                                                                                                       |
| May, 2011 | Ericsson builds the first implementation of WebRTC using a modified WebKit library                                                                                                                                                                                             |
| May, 2011 | Microsoft acquires Skype for 8.5 billion USD                                                                                                                                                                                                                                   |
| May, 2011 | Microsoft publishes a first draft for CU-RTC-Web at W3C                                                                                                                                                                                                                        |
| May, 2011 | Harald Alvestrand from Google announces an open-source software package for real-time voice and video on the Web that will be integrated to Chrome                                                                                                                             |
| Jul, 2011 | Chrome 12: First preview of WebRTC based on GIPS technology (VoiceEngine, VideoEngine, NetEQ, AEC).<br>Chrome WebRTC stack is open sourced                                                                                                                                     |
| Jul, 2011 | Justin Uberti moves to a new team focused on building the next audio/video communication platform for Google and for the Web                                                                                                                                                   |
| Sep, 2011 | Chrome 14 adds the support of the HTML5 Web Audio API                                                                                                                                                                                                                          |
| Jan, 2012 | Chrome 18 adds the support of WebRTC behind a flag                                                                                                                                                                                                                             |
| Apr, 2012 | Firefox demonstrates the use of WebRTC. Not released yet                                                                                                                                                                                                                       |
| Jul, 2012 | Chrome 21 enables by default the GetUserMedia API                                                                                                                                                                                                                              |
| Aug, 2012 | First version of the codec OPUS developed by Xiph, Octasic, Mozilla, Broadcom, Skype                                                                                                                                                                                           |
| Aug, 2012 | Firefox adds the support of the Opus Audio codec                                                                                                                                                                                                                               |
| Aug, 2012 | Microsoft presents an alternative to WebRTC called CU-RTC-Web coming from Skype                                                                                                                                                                                                |
| Sep, 2012 | Security                                                                                                                                                                                                                                                                       | Chrome 22 adds the support of TLS 1.1 |
| Sep, 2012 | IETF validates the OPUS codec                                                                                                                                                                                                                                                  |
| Nov, 2012 | Chrome 23 officializes the support for WebRTC                                                                                                                                                                                                                                  |
| Jan, 2013 | Firefox adds the support for a preliminary version of WebRTC                                                                                                                                                                                                                   |
| Fev, 2013 | Chrome 25 adds the support for the audio codec Opus and the video codec VP9                                                                                                                                                                                                    |
| Fev, 2013 | Chrome 25 adds the supports for the Web Speech API                                                                                                                                                                                                                             |
| Feb, 2013 |  Hello Firefox nightly, this is Chrome beta calling »: First interop WebRTC using VP8/Opus                                                                                                                                                                                     |

## The codecs war

Microsoft is still isolated with its own implementation of WebRTC (Orca). For Chrome and Firefox, and codecs providers, a battle is engaged to decide on the mandatory codecs to support on WebRTC end point (browsers). At the end, this is a status-quo: H264 and VP8 needs to be implemented for the video codecs and G711 and Opus for the audio codecs. Browsers are free to propose additionals codecs.

|   Date    | Interesting facts                                                                                                                                                                    |
| :-------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Feb, 2013 | Chrome 28 adds the support for TURN TCP                                                                                                                                              |
| Jun, 2013 | Firefox enables WebRTC by default                                                                                                                                                    |
| Aug, 2013 | Chrome 29 adds the final support for VP9 and the support of encoding the video in 1080p                                                                                              |
| Aug, 2013 | Security                                                                                                                                                                             | Chrome 29 adds the support for TLS 1.2 |
| Aug, 2013 | Chrome for android adds the support for WebRTC and the Web Audio API                                                                                                                 |
| Aug, 2013 | Firefox adds the support for the MediaRecorder API (only audio)                                                                                                                      |
| Sep, 2013 | Firefox 24 on Android/Desktop enables the WebRTC by default                                                                                                                          |
| Sep, 2013 | Firefox shows how to share files using RTCDataChannel                                                                                                                                |
| Sep, 2013 | New API emerges: MediaStream API: MediaStream.getFrame(): ImageData, MediaStream.takePhoto(): Blob                                                                                   |
| Oct 2013  | Proposal VP8 as RTCWeb mandatory codec to implement                                                                                                                                  |
| Oct, 2013 | Chrome 31 adds the support for SCTP DataChannels (without flag)                                                                                                                      |
| Oct, 2013 | Security                                                                                                                                                                             | Chrome 31 adds DTLS/SRTP enabled by default |
| Nov, 2013 | Cisco proposes the video codec openH264 to the community (open-source)                                                                                                               |
| Nov, 2013 | Chromes adds the Output device enumeration to GetUserMedia API: getSources() & getMediaDevices()                                                                                     |
| Dec, 2013 | Screen Sharing only accessible using a Chrome Extension (for security reason)                                                                                                        |
| Dec, 2013 | Support for the &lt;video&gt; tag resize event                                                                                                                                       |
| Dec, 2013 | Opus 1.1 released by Xiph                                                                                                                                                            |
| Jan, 2014 | HEVC (codec) for Twitter images                                                                                                                                                      |
| Mar, 2014 | First video call between QT application and a Web application                                                                                                                        |
| Jun, 2014 | First version of Google Hangouts with WebRTC technology                                                                                                                              |
| Jun, 2014 | Firefox 30 adds the support for VP9 decoding                                                                                                                                         |
| Nov, 2014 | ORTCWeb Development in Internet Explorer (Microsoft)                                                                                                                                 |
| Nov, 2014 | Firefox 33 adds the support for H264 (OpenH264) for WebRTC                                                                                                                           |
| Dec, 2014 | VP8 and H264 mandated for browsers                                                                                                                                                   |
| Dec, 2014 | Chrome adds a first experimental support for VP9 in Canary (behind a flag) and a support for G722                                                                                    |
| Dec, 2014 | Nexus 5, 6, 9 support an hardware encoding and decoding using VP8                                                                                                                    |
| Dec, 2014 | Skype version 7 introduces support for H264 for both P2P and group calls                                                                                                             |
| Jan, 2015 | Chromes 41 adds the support of the Opus FEC enabled by default                                                                                                                       |
| Jan, 2015 | Timothy Terriberry of Mozilla talked at 2015 Linux.Conf.Au conference about his work on the Daala video codec via Xiph.Org. According to him, another year of development is needed. |
| Fev, 2015 | Dynamically adding text tracks to HTML5 video                                                                                                                                        |
| Fev, 2015 | WebRTC 1.0 becomes a W3C Working Draft                                                                                                                                               |
| Fev, 2015 | Screen Capture API becomes a W3C Working Draft                                                                                                                                       |
| Fev, 2015 | Firefox 35 adds the support for the stable version of Hello (integrated WebRTC application                                                                                           |
| Fev, 2015 | WebRTC leaks local IP addresses                                                                                                                                                      |
| Mar, 2015 | Ericsson and some others creates an open initiative for implementing WebRTC in Webkit (Safari)                                                                                       |
| Jun, 2015 | Firefox 42 supports IPV6 by default                                                                                                                                                  |
| Sep, 2015 | Firefox 44 removes prefixes for the main WebRTC Apis (moz)                                                                                                                           |
| Oct, 2015 | Chromes 47 only allows getUserMedia requests from Secure Origins. Use of Boring SSL.                                                                                                 |
| Dec, 2015 | Chrome 48 adds official support of VP9 and a first version of the MediaStream Recording API                                                                                          |
| Dec, 2015 | Firefox 46 adds support for Simulcast                                                                                                                                                |
| Dec, 2015 | First tests of interoperability between Chrome and WebKitGTK+                                                                                                                        |
| Feb, 2016 | Chrome 49 adds official support of the MediaStream Recording API as well as the W3C Media Output Devices API                                                                         |
| Mar, 2016 | Chrome 50 adds a first implementation of the H 264 video codec behind a flag                                                                                                         |
| Jul, 2016 | Skype introduces an early alpha version of a new Skype for Linux client, built with WebRTC technology                                                                                |
| Jul, 2016 | Chrome 52 adds official support of H264 (software encoder)                                                                                                                           |
| Aug, 2016 | Firefox 51 adds support of VP9                                                                                                                                                       |
| Nov, 2016 | OpenWebRTC initiative announces the official support of WebRTC in WebKit GTK+                                                                                                        |
| Dec, 2016 | Chrome 56 on Windows uses hardware encoding/decoding of H264 when the device hardware supports it                                                                                    |

## Developers want homogeneous API

As for browsers at the origin for JavaScript and HTML, WebRTC developers want API that are homogenous against browsers. Hopefully, browsers wendors have listened and little by little, the specifications are implemented in the same maner in all browsers... But there are still differences today! Other victory, WebRTC finally landed in Safari!

|   Date    | Interesting facts                                                                                                                                                            |
| :-------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Feb, 2017 | Chrome 57 on Mac uses hardware encoding/decoding of H264 when the device hardware supports it as well as encoding by default on Chrome for Android                           |
| Apr, 2017 | Chrome 58 enables the use of proxies that require explicit credentials.                                                                                                      |
| Jul, 2017 | Safari 11 and IOS 11 finally support WebRTC                                                                                                                                  |
| Sep, 2017 | Google launches prebuilt libraries for both Android and IOS                                                                                                                  |
| Dec, 2017 | Google delivers lot of changes to be compliant to the official WebRTC specifications regarding the API getUserMedia and the RTP Media API: addTrack(), removeTrack(), etc... |
| May, 2018 | Chrome announces his plan to move from Plan B (his current implementation of the SDP) to unified plan which is compliant with Firefox.                                       |
| Jun, 2018 | Chrome 68 adds the support behind a flag for the Unified plan                                                                                                                |
| Oct, 2018 | Chrome 70 adds the first implementations of the getDisplayMedia() API (behind a flag) to offer the screen sharing without using an extension.                                |
| Dec, 2018 | Chrome 72 enables Unified plan by default and the Screen Capture API is now officially released                                                                              |
| Mar, 2019 | Chrome 74 adds official support of simulcast by using addTransciver API (in replacement of SDK munging)                                                                      |
| Jan, 2020 | Chrome 80 announces the deprecating binary mobile libraries                                                                                                                  |

## Links

-   [Chrome release notes](https://github.com/webrtc/webrtc-org/blob/gh-pages/release-notes/index.md)
-   [Firefox release notes](https://wiki.mozilla.org/Media/WebRTC/ReleaseNotes)
-   [WebKit release notes](https://webkit.org/blog/)
-   [Safari release notes](https://developer.apple.com/safari/technology-preview/release-notes/)

---

Last edition May, 01th 2020
