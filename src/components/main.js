"use strict";
//видео
let getVideo = document.querySelector('.header__main_center_video');
getVideo.addEventListener('ended', function f() {
    let audio = new Audio();
    audio.src = '../src/assets/audio/audio.mp3';
    audio.autoplay = true;
    document.querySelector('.shins').style.opacity = '0';
});

//шины

