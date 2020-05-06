
var recordAudioStart = document.getElementById('recordAudioStart')
var recordAudioStop = document.getElementById('recordAudioStop')
var recordedAudio = document.getElementById('recordedAudio')
var petPlayButton = document.getElementById('petPlayButton')

var rec;

function play(){

  console.log('play');
  recordedAudio.play()

}

function startRecord(){

  recordAudioStart.disabled = true;
  recordAudioStop.disabled = false;
  audioChunks = [];
  rec.start();

  console.log("Start recording");

}
function stopRecord(){

  recordAudioStart.disabled = false;
  recordAudioStop.disabled = true;
  rec.stop();

  console.log("Stop recording");

}

function init(){

  navigator.mediaDevices.getUserMedia({audio:true})
      .then(function(stream) {

          rec = new MediaRecorder(stream);

          rec.ondataavailable = e => {
              audioChunks.push(e.data);
              if (rec.state == "inactive"){
                let blob = new Blob(audioChunks,{type:'audio/mpeg-3'});
                recordedAudio.src = URL.createObjectURL(blob);
                recordedAudio.controls=true;
                recordedAudio.autoplay=false;

                console.log("Data recorded");

              }
            }

          





      })

}

init()