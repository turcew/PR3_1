/* -------------------------------------------------
   УТИЛІТИ
------------------------------------------------- */
const random = (max) => Math.ceil(Math.random() * max);

/* -------------------------------------------------
   ЛОГИ БОЮ
------------------------------------------------- */
const logs = [
  '[ПЕРСОНАЖ №1] вспомнил что-то важное, но неожиданно [ПЕРСОНАЖ №2], не помня себя от испуга, ударил в предплечье врага.',
  '[ПЕРСОНАЖ №1] поперхнулся, и за это [ПЕРСОНАЖ №2] с испугу приложил прямой удар коленом в лоб врага.',
  '[ПЕРСОНАЖ №1] забылся, но в это время наглый [ПЕРСОНАЖ №2], приняв волевое решение, неслышно подойдя сзади, ударил.',
  '[ПЕРСОНАЖ №1] пришел в себя, но неожиданно [ПЕРСОНАЖ №2] случайно нанес мощнейший удар.',
  '[ПЕРСОНАЖ №1] поперхнулся, но в это время [ПЕРСОНАЖ №2] нехотя раздробил кулаком <вырезано цензурой> противника.',
  '[ПЕРСОНАЖ №1] удивился, а [ПЕРСОНАЖ №2] пошатнувшись влепил подлый удар.',
  '[ПЕРСОНАЖ №1] высморкался, но неожиданно [ПЕРСОНАЖ №2] провел дробящий удар.',
  '[ПЕРСОНАЖ №1] пошатнулся, и внезапно наглый [ПЕРСОНАЖ №2] беспричинно ударил в ногу противника',
  '[ПЕРСОНАЖ №1] расстроился, как вдруг, неожиданно [ПЕРСОНАЖ №2] случайно влепил стопой в живот соперника.',
  '[ПЕРСОНАЖ №1] пытался что-то сказать, но вдруг, неожиданно [ПЕРСОНАЖ №2] со скуки, разбил бровь сопернику.'
];

/**
 * Повертає випадковий рядок логу, підставляючи імена персонажів
 * та інформацію про втрати/залишок HP.
 */
function generateLog({ name: firstName }, { name: secondName }, damage, hpLeft) {
  const text = logs[random(logs.length) - 1]
    .replace(/\[ПЕРСОНАЖ №1\]/g, firstName)
    .replace(/\[ПЕРСОНАЖ №2\]/g, secondName);

  return `${text} -${damage} [${hpLeft}/100]`;
}

/* -------------------------------------------------
   ФАБРИКА ПЕРСОНАЖІВ (з деструктуризацією)
------------------------------------------------- */
function createPokemon({
  name,
  defaultHP = 100,
  elHP,
  elProgressbar
}) {
  let damageHP = defaultHP;

  const renderHPLife = () => (elHP.innerText = `${damageHP} / ${defaultHP}`);
  const renderProgressbarHP = () => (elProgressbar.style.width = `${damageHP}%`);

  const renderHP = () => {
    renderHPLife();
    renderProgressbarHP();
  };

  const changeHP = (count, attacker) => {
    if (damageHP <= count) {
      damageHP = 0;
      $logs.insertAdjacentHTML(
        'afterbegin',
        `<p>${generateLog(attacker, { name }, count, 0)} — <strong>${name} проиграл бой!</strong></p>`
      );
      $btnKick.disabled = true;
      $btnThunder.disabled = true;
    } else {
      damageHP -= count;
      $logs.insertAdjacentHTML(
        'afterbegin',
        `<p>${generateLog(attacker, { name }, count, damageHP)}</p>`
      );
    }
    renderHP();
  };

  return { name, damageHP, defaultHP, changeHP, renderHP };
}

/* -------------------------------------------------
   ДОКУМЕНТ
------------------------------------------------- */
const {
  $btnKick,
  $btnThunder,
  $logs // <div id="logs"></div>
} = {
  $btnKick: document.getElementById('btn-kick'),
  $btnThunder: document.getElementById('btn-thunder'),
  $logs: document.getElementById('logs')
};

/* -------------------------------------------------
   ПЕРСОНАЖІ
------------------------------------------------- */
const character = createPokemon({
  name: 'Pikachu',
  elHP: document.getElementById('health-character'),
  elProgressbar: document.getElementById('progressbar-character')
});

const enemy1 = createPokemon({
  name: 'Charmander',
  elHP: document.getElementById('health-enemy1'),
  elProgressbar: document.getElementById('progressbar-enemy1')
});

const enemy2 = createPokemon({
  name: 'Bulbasaur',
  elHP: document.getElementById('health-enemy2'),
  elProgressbar: document.getElementById('progressbar-enemy2')
});

/* -------------------------------------------------
   АТАКА
------------------------------------------------- */
function attack(damage, targets, attacker) {
  targets.forEach(t => t.changeHP(random(damage), attacker));
}

/* -------------------------------------------------
   ПОДІЇ КНОПОК
------------------------------------------------- */
$btnKick.addEventListener('click', () => {
  console.log('Kick');
  // хто натиснув кнопку – той атакує
  attack(20, [character, enemy1, enemy2], character);
});

$btnThunder.addEventListener('click', () => {
  console.log('Thunder Attack');
  attack(30, [character, enemy1, enemy2], character);
});

/* -------------------------------------------------
   ІНІЦІАЛІЗАЦІЯ
------------------------------------------------- */
function init() {
  console.log('Start Game!');
  character.renderHP();
  enemy1.renderHP();
  enemy2.renderHP();
}
init();