const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = ['#f60505', '#45ff08', '#f700ff', '#06a2ff', '#b50f6b', '#eeab12','#ff00eb'];

let time = 0;
let score = 0;
let interval;

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
})

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
})

board.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    }
})

function startGame() {
    interval =  setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${time}`;
        }
        setTime(current);
    }
}

function setTime(val) {
    if (val === 60) {
        timeEl.innerHTML = `01:00`;
    } else {
        timeEl.innerHTML = `00:${val}`;
    }
}

function finishGame() {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Счёт: <span class="primary">${score}</span></h1>`
    clearInterval(interval);
}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    const color = getRandomColor();

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.backgroundColor = `${color}`;
    circle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;

    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function winTheGame() {
    function kill() {
        const circle = document.querySelector('.circle');
        if (circle) {
            circle.click();
        }
    }
    setInterval(kill, 75);
}