import { Logger } from './Logger.js';

export class ClickCounter {
  constructor(buttonName, maxClicks = 6) {
    this.buttonName = buttonName;
    this.maxClicks = maxClicks;
    this.clicks = 0;
    this.logger = new Logger();
  }

  count() {
    if (this.clicks >= this.maxClicks) {
      this.logger.log(`${this.buttonName}: вичерпано ліміт (${this.maxClicks} натискань)`, true);
      return false;
    }

    this.clicks++;
    const remaining = this.maxClicks - this.clicks;
    this.logger.log(`${this.buttonName}: натиснуто ${this.clicks} раз, залишилося ${remaining}`, true);
    return true;
  }

  reset() {
    this.clicks = 0;
  }
}