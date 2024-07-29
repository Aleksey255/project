const title = 'Project';
const screens = 'Простые, Сложные, Интерактивные';
const screenPrice = 50;
const rollback = 10;
const fullPrice = 5000;
const adaptive = true;

// alert ('Hello !')

// console.log('Hello world');

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);

console.log('Стоимость верстки экранов' + ' ' + screenPrice + ' ' + 'рублей');
console.log('Стоимость разработки сайта' + ' ' + fullPrice + ' ' + 'рублей');

console.log(screens.toLowerCase().split(', '));

console.log((fullPrice * (rollback/100)));