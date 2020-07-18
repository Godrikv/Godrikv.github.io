"use strict";
let getAudio = document.querySelector('.audio_car');
let getVideo = document.querySelector('.header__main_center_video');
getVideo.addEventListener('ended', function f() {getAudio.setAttribute('autoplay')

});
