const
    ffmpeg = require('easy-ffmpeg')
    , argv = require("minimist")(process.argv.slice(2))
    , path = require("path")
    , fs = require("fs")
    , TimeFormat = require('hh-mm-ss')
    , _cliProgress = require('cli-progress')
;

const
    videoPath = argv._[0]
;

if (!videoPath) {
    console.error("no input file provided");
    process.exit(2);
}

const name = path.basename(videoPath,path.extname(videoPath))
    , outPath = path.resolve(videoPath, "..", `${name}-converted-1080p.MP4`)
    , bar1 = new _cliProgress.Bar({}, _cliProgress.Presets.shades_classic)

;

console.log("start transcoding ", videoPath, "to", outPath);
let toalDuration = 0;

ffmpeg(fs.createReadStream(videoPath))
    .audioCodec('ac3_fixed')
    .audioBitrate(128)
    .videoCodec('libx264')
    .format("mov")
    .size('1920x?')
    .output(outPath, ["-n"])
    .on('codecData', data => {
        console.dir(data);
        toalDuration = TimeFormat.toS(data.duration);
        bar1.start(toalDuration, 0);
    })
    .on('progress', progress => {
        const p = TimeFormat.toS(progress.timemark);
        bar1.update(p);
    })
    .on('error', err => {
        bar1.stop();
        console.error(err);
    })
    .on('end', () => {
        bar1.stop();
        console.log('Video file ' + videoPath + ' was transcoded to ' + outPath);
    })
    .run()
;

process.stdin.resume();
