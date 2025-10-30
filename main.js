const random = (max) => Math.ceil(Math.random() * max);

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

function generateLog({ name: firstName }, { name: secondName }, damage, hpLeft) {
  const text = logs[random(logs.length) - 1]
    .replace(/\[ПЕРСОНАЖ №1\]/g, firstName)
    .replace(/\[ПЕРСОНАЖ №2\]/g, secondName);

  return `${text} -${damage} [${hpLeft}/100]`;
}

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

const {
  $btnKick,
  $btnThunder,
  $logs
} = {
  $btnKick: document.getElementById('btn-kick'),
  $btnThunder: document.getElementById('btn-thunder'),
  $logs: document.getElementById('logs')
};

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

function attack(damage, targets, attacker) {
  targets.forEach(t => t.changeHP(random(damage), attacker));
}

$btnKick.addEventListener('click', () => {
  console.log('Kick');
  attack(20, [character, enemy1, enemy2], character);
});

$btnThunder.addEventListener('click', () => {
  console.log('Thunder Attack');
  attack(30, [character, enemy1, enemy2], character);
});

function init() {
  console.log('Start Game!');
  character.renderHP();
  enemy1.renderHP();
  enemy2.renderHP();
}
init();

function createClickCounter(buttonId, maxClicks = 6) {
  let clicks = 0;

  return function () {
    if (clicks >= maxClicks) {
      console.log(`Кнопка "${buttonId}" вичерпала ліміт (${maxClicks} натискань)`);
      return false;
    }

    clicks++;
    const remaining = maxClicks - clicks;

    console.log(`Натискання на "${buttonId}": ${clicks}, залишилося: ${remaining}`);

    $logs.insertAdjacentHTML(
      'afterbegin',
      `<p style="color: #805cff; font-weight: bold;">
        [КНОПКА] ${buttonId}: натиснуто ${clicks} раз, залишилося ${remaining}
      </p>`
    );

    return true;
  };
}

const countKick = createClickCounter('Thunder Jolt', 6);
const countThunder = createClickCounter('Thunder Bolt', 6);

$btnKick.addEventListener('click', () => {
  if (countKick()) {
    console.log('Kick');
    attack(20, [character, enemy1, enemy2], character);
  } else {
    $btnKick.disabled = true;
  }
});

$btnThunder.addEventListener('click', () => {
  if (countThunder()) {
    console.log('Thunder Attack');
    attack(30, [character, enemy1, enemy2], character);
  } else {
    $btnThunder.disabled = true;
  }
});
