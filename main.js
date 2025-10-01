const $btnKick = document.getElementById('btn-kick');
const $btnThunder = document.getElementById('btn-thunder');

const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character')
};

const enemy1 = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy1'),
    elProgressbar: document.getElementById('progressbar-enemy1')
};

const enemy2 = {
    name: 'Bulbasaur',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy2'),
    elProgressbar: document.getElementById('progressbar-enemy2')
};

function random(num) {
    return Math.ceil(Math.random() * num);
}

function init() {
    console.log('Start Game!');
    renderHP(character);
    renderHP(enemy1);
    renderHP(enemy2);
}

function renderHP(person) {
    renderHPLife(person);
    renderProgressbarHP(person);
}

function renderHPLife(person) {
    person.elHP.innerText = person.damageHP + ' / ' + person.defaultHP;
}

function renderProgressbarHP(person) {
    person.elProgressbar.style.width = person.damageHP + '%';
}

function changeHP(count, person) {
    if (person.damageHP <= count) {
        person.damageHP = 0;
        alert('Бедный ' + person.name + ' проиграл бой!');
        $btnKick.disabled = true;
        $btnThunder.disabled = true;
    } else {
        person.damageHP -= count;
    }
    renderHP(person);
}

function attack(damage, targets) {
    targets.forEach(target => {
        changeHP(random(damage), target);
    });
}

$btnKick.addEventListener('click', function () {
    console.log('Kick');
    attack(20, [character, enemy1, enemy2]);
});

$btnThunder.addEventListener('click', function () {
    console.log('Thunder Attack');
    attack(30, [character, enemy1, enemy2]);
});

init();