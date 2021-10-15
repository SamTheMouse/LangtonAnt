
let next_button = document.getElementById('next');
next_button.addEventListener('click', ant_next);

let play_button = document.getElementById('play');
let pause_button = document.getElementById('pause');

play_button.addEventListener('click', function () {
    ant_start();
    switchButton();
});

pause_button.addEventListener('click', function () {
    ant_stop();
    switchButton();
});

function switchButton() {
    pause_button.classList.toggle('hidden');
    play_button.classList.toggle('hidden');
}

let reset_button = document.getElementById('reset');
reset_button.addEventListener('click', function () {
    ant_stop();
    ant_reset();
});
