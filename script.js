'use strict';

let title = 'Project';
let screens = 'Простые, Сложные, Интерактивные';
let screenPrice = 50;
let rollback = 10;
let fullPrice = 5000;
let adaptive = true;

// alert ('Hello !');

// console.log('Hello world');

// console.log(typeof title);
// console.log(typeof fullPrice);
// console.log(typeof adaptive);

// console.log(screens.length);

// console.log('Стоимость верстки экранов' + ' ' + screenPrice + ' ' + 'рублей');
// console.log('Стоимость разработки сайта' + ' ' + fullPrice + ' ' + 'рублей');

// console.log(screens.toLowerCase().split(', '));

// console.log(fullPrice * (rollback/100));

title = prompt('Как называется ваш проект?');
console.log(title);

screens = prompt(
  'Какие типы экранов нужно разработать?',
  'Простые, Сложные, Интерактивные'
);
console.log(screens);

screenPrice = +prompt('Сколько будет стоить данная работа?');
console.log(screenPrice);

adaptive = confirm('Нужен ли адаптив на сайте?');
console.log(adaptive);

let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = +prompt('Сколько это будет стоить?');
console.log(service1, servicePrice1);

let service2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = +prompt('Сколько это будет стоить?');
console.log(service2, servicePrice2);

fullPrice = screenPrice + servicePrice1 + servicePrice2;
console.log(fullPrice);

let servicePercentPrice = fullPrice - fullPrice * (rollback / 100);
console.log(Math.ceil(servicePercentPrice));

if (fullPrice >= 30000) {
  console.log('Даем скидку в 10%');
} else if (fullPrice >= 15000 && fullPrice < 30000) {
  console.log('Даем скидку в 5%');
} else if (fullPrice < 15000 && fullPrice >= 0) {
  console.log('Скидка не предусмотрена');
} else console.log('Что то пошло не так');
