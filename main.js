const $btnKick = document.getElementById('btn-kick');
const $btnThunder = document.getElementById('btn-thunder');

const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
    renderHP: function() {
        this.renderHPLife();
        this.renderProgressbarHP();
    },
    renderHPLife: function() {
        this.elHP.innerText = this.damageHP + ' / ' + this.defaultHP;
    },
    renderProgressbarHP: function() {
        this.elProgressbar.style.width = this.damageHP + '%';
    },
    changeHP: function(count) {
        if (this.damageHP <= count) {
            this.damageHP = 0;
            alert('Бедный ' + this.name + ' проиграл бой!');
            $btnKick.disabled = true;
            $btnThunder.disabled = true;
        } else {
            this.damageHP -= count;
        }
        this.renderHP();
    }
};

const enemy1 = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy1'),
    elProgressbar: document.getElementById('progressbar-enemy1'),
    renderHP: function() {
        this.renderHPLife();
        this.renderProgressbarHP();
    },
    renderHPLife: function() {
        this.elHP.innerText = this.damageHP + ' / ' + this.defaultHP;
    },
    renderProgressbarHP: function() {
        this.elProgressbar.style.width = this.damageHP + '%';
    },
    changeHP: function(count) {
        if (this.damageHP <= count) {
            this.damageHP = 0;
            alert('Бедный ' + this.name + ' проиграл бой!');
            $btnKick.disabled = true;
            $btnThunder.disabled = true;
        } else {
            this.damageHP -= count;
        }
        this.renderHP();
    }
};

const enemy2 = {
    name: 'Bulbasaur',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy2'),
    elProgressbar: document.getElementById('progressbar-enemy2'),
    renderHP: function() {
        this.renderHPLife();
        this.renderProgressbarHP();
    },
    renderHPLife: function() {
        this.elHP.innerText = this.damageHP + ' / ' + this.defaultHP;
    },
    renderProgressbarHP: function() {
        this.elProgressbar.style.width = this.damageHP + '%';
    },
    changeHP: function(count) {
        if (this.damageHP <= count) {
            this.damageHP = 0;
            alert('Бедный ' + this.name + ' проиграл бой!');
            $btnKick.disabled = true;
            $btnThunder.disabled = true;
        } else {
            this.damageHP -= count;
        }
        this.renderHP();
    }
};

function random(num) {
    return Math.ceil(Math.random() * num);
}

function init() {
    console.log('Start Game!');
    character.renderHP();
    enemy1.renderHP();
    enemy2.renderHP();
}

function attack(damage, targets) {
    targets.forEach(target => {
        target.changeHP(random(damage));
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
