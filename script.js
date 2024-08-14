'use strict';

const appData = {
  title: '',
  screens: [],
  screenPrice: 0,
  adaptive: true,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicePrice: 0,
  services: [],
  rollback: 10,
  isNumber: function (num) {
    const pattern = /^\d+$/;
    return pattern.test(num) && !isNaN(parseFloat(num) && isFinite(num));
  },
  isString: function (str) {
    return str == +str ? false : true;
  },
  asking: function () {
    do {
      appData.title = prompt(
        'Как называется ваш проект?',
        'Калькулятор верстки'
      );
    } while (!appData.isString(appData.title));

    for (let i = 0; i < 2; i++) {
      let name = '';
      let price = 0;

      do {
        name = prompt('Какие типы экранов нужно разработать?');
      } while (!appData.isString(name));

      do {
        price = prompt('Сколько будет стоить данная работа?');
      } while (!appData.isNumber(price));

      appData.screens.push({ id: i, name: name, price: price });
    }

    for (let i = 0; i < 2; i++) {
      let name = '';
      let price = 0;

      do {
        name = prompt('Какой дополнительный тип услуги нужен?');
      } while (!appData.isString(name));

      do {
        price = prompt('Сколько это будет стоить?');
      } while (!appData.isNumber(price));

      appData.services.push({ id: i, name: name, price: price });
    }

    appData.adaptive = confirm('Нужен ли адаптив на сайте?');
  },
  addPrices: function () {
    appData.screenPrice = appData.screens.reduce(function (
      accumulator,
      screen
    ) {
      return accumulator + +screen.price;
    },
    0);

    for (const service of appData.services) {
      appData.allServicePrices += +service.price;
    }
  },
  getTitle: function (str) {
    str = str.trim();
    let firstChar = str[0].toUpperCase();
    appData.title = firstChar + str.slice(1).toLowerCase();
  },
  getFullPrice: function (price) {
    appData.fullPrice = price + appData.allServicePrices;
  },

  getServicePercentPrices: function () {
    appData.servicePercentPrice =
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
  },

  getRollbackMessage: function (price) {
    if (price >= 30000) {
      return 'Даем скидку в 10%';
    } else if (price >= 15000 && price < 30000) {
      return 'Даем скидку в 5%';
    } else if (price < 15000 && price >= 0) {
      return 'Скидка не предусмотрена';
    } else return 'Что то пошло не так';
  },
  start: function () {
    appData.asking();
    appData.getTitle(appData.title);
    appData.addPrices();
    appData.getFullPrice(+appData.screenPrice);
    appData.getServicePercentPrices();
    appData.logger();
  },
  logger: function () {
    // for (const key in appData) {
    //   if (Object.prototype.hasOwnProperty.call(appData, key)) {
    //     console.log(appData[key]);
    //   }
    // }
    console.log('Полная цена', appData.fullPrice);
    console.log('Цена экранов', appData.screenPrice);
    console.log('Цена всех сервисов', appData.allServicePrices);
    console.log('ОбЪект сервисов', appData.services);
    console.log('Цена после отката', appData.servicePercentPrice);
  },
};

appData.start();
