let songindex = 0;
let tempAudio = new Array();
let audioElement = new Audio("songs/0.mp3");
let mainimg = document.getElementById("mainimg");
let masterPlay = document.getElementById("masterPlay");
let gif = document.getElementById("gif");
let songiteam = Array.from(document.getElementsByClassName("songiteam"));
let masterplaysong = document.getElementById("masterplaysong");
let myprogressbar = document.getElementById("myprogressbar");
let currentsongname=document.getElementById('currentsongname');
audioElement.volume = 1;

let volum = document.getElementById("volume");
volum.value = 1;
let volumeinc = document.getElementById("volumeinc");
let volumedic = document.getElementById("volumedic");
let forward = document.getElementById("forw");
let beckward = document.getElementById("back");
let songs = [
  {
    songname: " Falak Tu Garaj Tu - KGF 2",
    filepath: "songs/1.mp3",
    coverpath: "covers/1.jpg",
  },
  {
    songname: " Na Na Re Kgf",
    filepath: "songs/2.mp3",
    coverpath: "covers/2.jpg",
  },
  {
    songname: "Uptown Funk” by Mark Ronson ft. Bruno Mars.    ",
    filepath: "songs/3.mp3",
    coverpath: "covers/3.jpg",
  },
  {
    songname: " Mehabooba Hindi - KGF 2",
    filepath: "songs/4.mp3",
    coverpath: "covers/4.jpg",
  },
  {
    songname: " Maan Le - Arijit Singh",
    filepath: "songs/5.mp3",
    coverpath: "covers/5.jpg",
  },
  {
    songname: " Kuch To Bata Zindagi",
    filepath: "songs/6.mp3",
    coverpath: "covers/6.jpg",
  },
];

new Promise((resolve, reject) => {
  songs.forEach((song) => {
    tempAudio.push(new Audio(song.filepath));
  });
  resolve("success");
}).then((resolve) => {
  
  temp();
});

masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();

    mainimg.src = songs[songindex].coverpath;
    currentsongname.innerText = songs[songindex].songname;
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    gif.style.opacity = 0;
  }
});
audioElement.addEventListener("timeupdate", () => {
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myprogressbar.value = progress;
});
myprogressbar.addEventListener("change", () => {
  audioElement.currentTime =
    (myprogressbar.value * audioElement.duration) / 100;
});
const makeallplay = () => {
  Array.from(document.getElementsByClassName("songiteamplay")).forEach(
    (element) => {
      element.classList.remove("fa-circle-pause");

      element.classList.add("fa-circle-play");
    }
  );
};
var intervalId = window.setInterval(function () {
  var minutes = "0" + Math.floor(audioElement.currentTime / 60);
  var seconds = "0" + Math.floor(audioElement.currentTime - minutes * 60);
  var dur = minutes.substr(-2) + ":" + seconds.substr(-2);

  var endm = "0" + Math.floor(audioElement.duration / 60);
  var ends = "0" + Math.floor(audioElement.duration - minutes * 60);
  var durr = endm.substr(-2) + ":" + ends.substr(-2);

  document.getElementById("start").innerHTML = `${dur}`;
  document.getElementById("end").innerHTML = `${durr}`;
}, 1000);

Array.from(document.getElementsByClassName("songiteamplay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeallplay();
      songindex = parseInt(e.target.id);
      e.target.classList.remove("fa-circle-play");
      e.target.classList.add("fa-circle-pause");

      mainimg.src = songs[songindex].coverpath;
      audioElement.src = `songs/${songindex}.mp3`;
      currentsongname.innerText = songs[songindex].songname;
      masterplaysong.innerText = songs[songindex].songname;
      if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove("fa-circle-play");

        masterPlay.classList.add("fa-circle-pause");
      } else {
        audioElement.pause();
        gif.style.opacity = 0;
        masterPlay.classList.remove("fa-circle-pause");

        e.target.classList.remove("fa-circle-pause");
        e.target.classList.add("fa-circle-play");

        masterPlay.classList.add("fa-circle-play");
      }
    });
  }
);

forward.addEventListener("click", () => {
  if (songindex > 5) {
    songindex = 0;
  } else {
    songindex += 1;
    audioElement.src = `songs/${songindex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    currentsongname.innerText = songs[songindex].songname;
    mainimg.src = songs[songindex].coverpath;
    console.log((masterplaysong.innerHTML = songs[songindex].songname));
    masterPlay.classList.add("fa-circle-pause");
  }
});

beckward.addEventListener("click", () => {
  if (songindex <= 0) {
    songindex = 0;
  } else {
    songindex -= 1;
    audioElement.src = `songs/${songindex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");

    mainimg.src = songs[songindex].coverpath;
    currentsongname.innerText = songs[songindex].songname;
    console.log((masterplaysong.innerHTML = songs[songindex].songname));
    masterPlay.classList.add("fa-circle-pause");
  }
});

function temp() {
  setTimeout(() => {
    songiteam.forEach((element, i) => {
      element.getElementsByTagName("img")[0].src = songs[i].coverpath;
      element.getElementsByClassName("songname")[0].innerText =
        songs[i].songname;

      var endm = "0" + Math.floor(tempAudio[i].duration / 60);
      var ends = "0" + Math.floor(tempAudio[i].duration - endm * 60);
      var durr = endm.substr(-2) + ":" + ends.substr(-2);

      element.getElementsByClassName("timestamp")[0].innerHTML = durr;
    });
  }, 1000);
}
volum.addEventListener("change", () => {
  audioElement.volume = volume.value;
});
volumeinc.addEventListener("click", () => {
  if (audioElement.volume > 0.9) {
    audioElement.volume = 1;
    volum.value = audioElement.volume;
  } else {
    audioElement.volume = audioElement.volume + 0.1;
    volum.value = audioElement.volume;
    console.log(audioElement.volume + "-" + volum.value);
  }
});

volumedic.addEventListener("click", () => {
  if (audioElement.volume <= 0.1) {
    audioElement.volume = 0.1;
    volum.value = audioElement.volume;
  } else {
    audioElement.volume -= 0.1;
    volum.value = audioElement.volume;
  }
});
songs.every(check);
function check(coverpath){
 return coverpath == coverpath;
}
function my_code(){
  
  mainimg.src = songs[songindex].coverpath;
  currentsongname.innerText = songs[songindex].songname;
  masterplaysong.innerText = songs[songindex].songname;
  }
  
  window.onload=my_code();


