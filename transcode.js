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
    , name = videoPath.match(/([\w]+)\.[\w]{3,4}$/)[1]
    , outPath = path.resolve(process.cwd(), `${name}.converted-1080p.MP4`)
    , bar1 = new _cliProgress.Bar({}, _cliProgress.Presets.shades_classic)

;

if (!videoPath) {
    console.error("no input file provided");
    process.exit(2);
}

console.log("start transcoding ", videoPath, "to", outPath);
let toalDuration = 0;

const command = ffmpeg(fs.createReadStream(videoPath))
    .audioCodec('ac3_fixed')
    .audioBitrate(128)
    .videoCodec('libx264')
    .format("mov")
    .size('1920x?')
    .save(outPath)
    .on('codecData', data => {
        console.log(data);
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
        process.exit(1)
    })
    .on('end', () => {
        bar1.stop();
        console.log('Video file ' + videoPath + ' was transcoded to ' + outPath);
        process.exit(0);
    })
;


