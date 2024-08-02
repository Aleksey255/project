'use strict';

const title = prompt('Как называется ваш проект?');
const screens = prompt(
  'Какие типы экранов нужно разработать?',
  'Простые, Сложные, Интерактивные'
);
const screenPrice = +prompt('Сколько будет стоить данная работа?');
const rollback = 10;
const adaptive = confirm('Нужен ли адаптив на сайте?');
const service1 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice1 = +prompt('Сколько это будет стоить?');
const service2 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice2 = +prompt('Сколько это будет стоить?');
const fullPrice = getFullPrice(screenPrice);
const servicePercentPrice = getServicePercentPrices(rollback);

const showTypeOf = function (variable) {
  return `${variable}, ${typeof variable}`;
};

const getTitle = function (str) {
  str = str.replace(/^[\t\s]+/, '');
  let firstChar = str.charAt(0);
  firstChar = firstChar.toUpperCase();
  return firstChar + str.slice(1).toLowerCase();
};

getTitle(title);

function getFullPrice(price) {
  const getAllServicePrices = function (price1, price2) {
    return price1 + price2;
  };
  const allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
  return price + allServicePrices;
}

function getServicePercentPrices(rollback) {
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

console.log(showTypeOf(title));
console.log(showTypeOf(fullPrice));
console.log(showTypeOf(adaptive));
console.log(screens.toLowerCase().split(', '));
console.log(getRollbackMessage(fullPrice));
console.log(servicePercentPrice);
