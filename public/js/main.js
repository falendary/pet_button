var petPlayButton = document.getElementById('petPlayButton')

var sound;

function play(){

  // var recordedAudio = document.getElementById('recordedAudio')

  // console.log('play' );
  // recordedAudio.play()

  sound.play();

}

function init(argument) {

  // var recordedAudioElement = document.getElementById('recordedAudio')
  // if(recordedAudioElement) {
  //   recordedAudioElement.remove()
  // }

  // var audioElement = document.createElement('audio');
  // audioElement.id = 'recordedAudio'
  // audioElement.controls = true

  // document.body.appendChild(audioElement)

  // var recordedAudioElement = document.getElementById('recordedAudio')

  // var sourceElement = document.createElement('source');

  // recordedAudioElement.appendChild(sourceElement);

  // sourceElement.src = 'audio/eat.ogg';
  // sourceElement.type = 'audio/ogg';


  sound = new Howl({
    src: ['audio/eat.mp3']
  });

  
  
}


init()