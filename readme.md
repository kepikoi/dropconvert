## Dropconvert
> A no-frills ffmpeg wraper to quickly downsample high bitrate 4K video footage to 1080p

![](./docs/dropconvert.gif)

## Background

Using the Panasonic GH5 to record 140 MBit/s 4K 60p results in ~1 GB data per minute video. To share clips online I'm downsampling them to 1080p and needed a quick drag, drop & forget desktop solution to accomplish this. 

### Shortcut

Install the package globally via npm and create a OS shortcut just with the command `dropconvert` 
```
npm install -g dropconvert
```

Drag and drop a video file to the shortcut to start transcoding it to the directory of the clip.


## FFmpeg Settings

* Video codec: libx264
* Resolution: 1920x? (adaptive 1080p)
* Framerate: no changes to the source
* Audio Bitrate AC3 128 KBit/s
