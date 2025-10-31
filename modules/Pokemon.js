import { $, random } from './utils.js';
import { Logger } from './Logger.js';

export class Pokemon {
  constructor({ name, hp = 100, selectors }) {
    this.name = name;
    this.defaultHP = hp;
    this.damageHP = hp;
    this.selectors = selectors;
    this.logger = new Logger();

    this.elHP = $(`#${selectors.hp}`);
    this.elProgressbar = $(`#${selectors.progressbar}`);
  }

  renderHP() {
    this.renderHPLife();
    this.renderProgressbarHP();
  }

  renderHPLife() {
    this.elHP.innerText = `${this.damageHP} / ${this.defaultHP}`;
  }

  renderProgressbarHP() {
    const percent = (this.damageHP / this.defaultHP) * 100;
    this.elProgressbar.style.width = `${percent}%`;

    // Додаємо класи для кольору
    this.elProgressbar.classList.remove('low', 'critical');
    if (percent <= 50 && percent > 20) this.elProgressbar.classList.add('low');
    if (percent <= 20) this.elProgressbar.classList.add('critical');
  }

  changeHP(damage, attacker) {
    if (this.damageHP <= damage) {
      this.damageHP = 0;
      this.logger.log(this.logger.generateLog(attacker, this, damage, 0));
      this.logger.logDefeat(this);
      this.disableButtons();
    } else {
      this.damageHP -= damage;
      this.logger.log(this.logger.generateLog(attacker, this, damage, this.damageHP));
    }
    this.renderHP();
  }

  disableButtons() {
    $('#btn-kick').disabled = true;
    $('#btn-thunder').disabled = true;
  }
}