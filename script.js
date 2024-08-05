'use strict';

let title;
let screens;
let screenPrice;
let adaptive;
let allServicePrices;
let fullPrice;
let servicePercentPrice;
let servicePrice;
let service1;
let service2;
let rollback = 10;

const isNumber = function (num) {
  const pattern = /^\d+$/;
  return pattern.test(num) && !isNaN(parseFloat(num) && isFinite(num));
};

const asking = function () {
  title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
  screens = prompt(
    'Какие типы экранов нужно разработать?',
    'Простые, Сложные, Интерактивные'
  );

  do {
    screenPrice = prompt('Сколько будет стоить данная работа?');
  } while (!isNumber(screenPrice));

  adaptive = confirm('Нужен ли адаптив на сайте?');
};

const showTypeOf = function (variable) {
  return `${variable}, ${typeof variable}`;
};

const getTitle = function (str) {
  str = str.trim();
  let firstChar = str[0].toUpperCase();
  return firstChar + str.slice(1).toLowerCase();
};

const getAllServicePrices = function () {
  let sum = 0;

  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      service1 = prompt('Какой дополнительный тип услуги нужен?');
    } else if (i === 1) {
      service2 = prompt('Какой дополнительный тип услуги нужен?');
    }
    servicePrice = prompt('Сколько это будет стоить?');
    
    while (!isNumber(servicePrice)) {
      servicePrice = prompt('Сколько это будет стоить?');
    }
    sum += +servicePrice;
  }
  return sum;
};

function getFullPrice(price) {
  return price + allServicePrices;
}

function getServicePercentPrices() {
  return fullPrice - fullPrice * (rollback / 100);
}

const getRollbackMessage = function (price) {
  if (price >= 30000) {
    return 'Даем скидку в 10%';
  } else if (price >= 15000 && price < 30000) {
    return 'Даем скидку в 5%';
  } else if (price < 15000 && price >= 0) {
    return 'Скидка не предусмотрена';
  } else return 'Что то пошло не так';
};

asking();
title = getTitle(title);
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice(+screenPrice);
servicePercentPrice = getServicePercentPrices();

console.log(showTypeOf(title));
console.log(showTypeOf(fullPrice));
console.log(showTypeOf(adaptive));
console.log(screens.toLowerCase().split(', '));
console.log(getRollbackMessage(fullPrice));
console.log(screenPrice);
console.log(fullPrice);
console.log(allServicePrices);
console.log(servicePercentPrice);
