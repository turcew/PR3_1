import { Pokemon } from './modules/Pokemon.js';
import { ClickCounter } from './modules/ClickCounter.js';
import { $ } from './modules/utils.js';

const character = new Pokemon({
  name: 'Pikachu',
  selectors: {
    hp: 'health-character',
    progressbar: 'progressbar-character'
  }
});

const enemy1 = new Pokemon({
  name: 'Charmander',
  selectors: {
    hp: 'health-enemy1',
    progressbar: 'progressbar-enemy1'
  }
});

const enemy2 = new Pokemon({
  name: 'Bulbasaur',
  selectors: {
    hp: 'health-enemy2',
    progressbar: 'progressbar-enemy2'
  }
});

const enemies = [enemy1, enemy2];

const kickCounter = new ClickCounter('Thunder Jolt', 6);
const thunderCounter = new ClickCounter('Thunder Bolt', 6);

const $btnKick = $('#btn-kick');
const $btnThunder = $('#btn-thunder');

function attack(damage, targets, attacker) {
  targets.forEach(target => target.changeHP(damage, attacker));
}

$btnKick.addEventListener('click', () => {
  if (kickCounter.count()) {
    console.log('Kick');
    const damage = random(20);
    attack(damage, [character, ...enemies], character);
  } else {
    $btnKick.disabled = true;
  }
});

$btnThunder.addEventListener('click', () => {
  if (thunderCounter.count()) {
    console.log('Thunder Attack');
    const damage = random(30);
    attack(damage, [character, ...enemies], character);
  } else {
    $btnThunder.disabled = true;
  }
});

function init() {
  console.log('Start Game!');
  character.renderHP();
  enemy1.renderHP();
  enemy2.renderHP();
}

init();