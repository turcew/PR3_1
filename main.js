import { Pokemon } from './modules/Pokemon.js';
import { ClickCounter } from './modules/ClickCounter.js';
import { $, random } from './modules/utils.js';
import { pokemons } from './pokemons.js';

let character;
let enemy1;
let enemy2;
let enemies;
let kickCounter;
let thunderCounter;

const $control = document.querySelector('.control');

function createButton(id, text, clickHandler) {
  const btn = document.createElement('button');
  btn.classList.add('button');
  btn.id = id;
  btn.innerText = text;
  btn.addEventListener('click', clickHandler);
  return btn;
}

function gameOver() {
  const allEnemiesDefeated = enemies.every(e => e.damageHP <= 0);
  const characterDefeated = character.damageHP <= 0;
  if (characterDefeated || allEnemiesDefeated) {
    const $btnKick = $('#btn-kick');
    if ($btnKick) $btnKick.disabled = true;
    const $btnThunder = $('#btn-thunder');
    if ($btnThunder) $btnThunder.disabled = true;
    if (allEnemiesDefeated) {
      character.logger.log('<strong>Ви перемогли всіх ворогів!</strong>');
    }
    return true;
  }
  return false;
}

function enemyAttack() {
  enemies.forEach(enemy => {
    if (enemy.damageHP > 0 && character.damageHP > 0) {
      const damage = random(20);
      character.changeHP(damage, enemy);
    }
  });
  gameOver();
}

function startGame() {
  const randomIndex = Math.floor(Math.random() * pokemons.length);
  const selectedPokemon = pokemons[randomIndex];

  document.querySelector('.pokemon.character .details .name').innerText = selectedPokemon.name;
  const $sprite = document.querySelector('.pokemon.character .sprite');
  $sprite.src = selectedPokemon.img;
  $sprite.alt = selectedPokemon.name;

  character = new Pokemon({
    name: selectedPokemon.name,
    hp: selectedPokemon.hp,
    selectors: {
      hp: 'health-character',
      progressbar: 'progressbar-character'
    }
  });

  const charmanderData = pokemons.find(p => p.name === 'Charmander');
  enemy1 = new Pokemon({
    name: 'Charmander',
    hp: charmanderData.hp,
    selectors: {
      hp: 'health-enemy1',
      progressbar: 'progressbar-enemy1'
    }
  });

  const bulbasaurData = pokemons.find(p => p.name === 'Bulbasaur');
  enemy2 = new Pokemon({
    name: 'Bulbasaur',
    hp: bulbasaurData.hp,
    selectors: {
      hp: 'health-enemy2',
      progressbar: 'progressbar-enemy2'
    }
  });

  enemies = [enemy1, enemy2];

  const attack1 = selectedPokemon.attacks[0];
  const attack2 = selectedPokemon.attacks[1];

  kickCounter = new ClickCounter(attack1.name, attack1.maxCount);
  thunderCounter = new ClickCounter(attack2.name, attack2.maxCount);

  const $btnKick = createButton('btn-kick', attack1.name, () => {
    if (kickCounter.count() && !gameOver()) {
      const damage = Math.floor(Math.random() * (attack1.maxDamage - attack1.minDamage + 1)) + attack1.minDamage;
      attack(damage, enemies, character);
      enemyAttack();
    } else {
      $btnKick.disabled = true;
    }
  });

  const $btnThunder = createButton('btn-thunder', attack2.name, () => {
    if (thunderCounter.count() && !gameOver()) {
      const damage = Math.floor(Math.random() * (attack2.maxDamage - attack2.minDamage + 1)) + attack2.minDamage;
      attack(damage, enemies, character);
      enemyAttack();
    } else {
      $btnThunder.disabled = true;
    }
  });

  $control.appendChild($btnKick);
  $control.appendChild($btnThunder);

  character.renderHP();
  enemy1.renderHP();
  enemy2.renderHP();

  console.log('Start Game!');

  const $btnReset = createButton('btn-reset', 'RESET GAME', () => {
    resetGame();
  });
  $control.appendChild($btnReset);
}

function resetGame() {
  character.damageHP = character.defaultHP;
  enemy1.damageHP = enemy1.defaultHP;
  enemy2.damageHP = enemy2.defaultHP;

  character.renderHP();
  enemy1.renderHP();
  enemy2.renderHP();

  kickCounter.reset();
  thunderCounter.reset();

  const $btnKick = $('#btn-kick');
  $btnKick.disabled = false;
  const $btnThunder = $('#btn-thunder');
  $btnThunder.disabled = false;

  $('#logs').innerHTML = '';
}

function attack(damage, targets, attacker) {
  targets.forEach(target => {
    if (target.damageHP > 0) {
      target.changeHP(damage, attacker);
    }
  });
  gameOver();
}

const initialButtons = document.querySelectorAll('.control .button');
initialButtons.forEach(btn => btn.remove());

const $btnStart = createButton('btn-start', 'START GAME', () => {
  startGame();
  $btnStart.remove();
});

$control.appendChild($btnStart);
