"use strict";
//видео
let getVideo = document.querySelector('.header__main_center_video');
getVideo.addEventListener('ended', function f() {let audio = new Audio(); // Создаём новый элемент Audio
    audio.src = '../src/assets/audio/audio.mp3'; // Указываем путь к звуку "клика"
    audio.autoplay = true; // Автоматически запускаем
});

//шины
let shins = document.querySelectorAll('.shins');
getVideo.addEventListener('ended', function fe() {
    shins.forEach(element => shins.style.opacity = '0')
});