"use strict";
let getAudio = document.querySelector('.audio_car');
let getVideo = document.querySelector('.header__main_center_video');
getVideo.addEventListener('ended', function f() {let audio = new Audio(); // Создаём новый элемент Audio
    audio.src = '../src/assets/audio/audio.mp3'; // Указываем путь к звуку "клика"
    audio.autoplay = true; // Автоматически запускаем
});
