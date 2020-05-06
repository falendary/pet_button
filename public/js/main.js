
var recordAudioStart = document.getElementById('recordAudioStart')
var recordAudioStop = document.getElementById('recordAudioStop')
var petPlayButton = document.getElementById('petPlayButton')

var rec;
var audioChunks;

function play(){

  var recordedAudio = document.getElementById('recordedAudio')

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

                var blob = new Blob(audioChunks,{type:'audio/mpeg'});
                var audioObjectURL = webkitURL.createObjectURL(blob);
                recordedAudio.controls=true;
                recordedAudio.autoplay=false;

                var recordedAudioElement = document.getElementById('recordedAudio')
                if(recordedAudioElement) {
                  recordedAudioElement.remove()
                }

                var audioElement = document.createElement('audio');
                audioElement.id = 'recordedAudio'

                document.body.appendChild(audioElement)

                var recordedAudioElement = document.getElementById('recordedAudio')

                var sourceElement = document.createElement('source');

                recordedAudioElement.appendChild(sourceElement);

                sourceElement.src = audioObjectURL;
                sourceElement.type = 'audio/mp3';

                console.log("Data recorded", audioObjectURL);

              }
            }
      })

}

init()