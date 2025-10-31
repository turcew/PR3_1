export const random = (max) => Math.floor(Math.random() * max) + 1;

export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);