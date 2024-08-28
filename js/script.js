'use strict';

const title = document.getElementsByTagName('h1')[0].textContent;
const startBtn = document.getElementById('start');
const resetBtn = document.getElementById('reset');
const plusBtn = document.getElementById('add');
const minusBtn = document.getElementById('remove');
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');
const range = document.querySelector('.rollback > div > input');
const rangeValue = document.querySelector('.rollback > div > .range-value');
const servicePrice = document.getElementsByClassName('total-input')[0];
const numberScreens = document.getElementsByClassName('total-input')[1];
const allServicePrices = document.getElementsByClassName('total-input')[2];
const fullPrice = document.getElementsByClassName('total-input')[3];
const rollback = document.getElementsByClassName('total-input')[4];
let screens = document.querySelectorAll('.screen');

const appData = {
  title: '',
  screens: [],
  screenCount: 0,
  screenPrice: 0,
  adaptive: true,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicePrice: 0,
  servicesPercent: {},
  servicesNumber: {},
  rollback: 0,
  init: function () {
    appData.addTitle();
    startBtn.addEventListener('click', appData.start);
    resetBtn.addEventListener('click', appData.clear);
    plusBtn.addEventListener('click', appData.addScreensBlock);
    minusBtn.addEventListener('click', appData.removeScreensBlock);
    range.addEventListener('input', appData.addRollback);
  },
  checkfields: function () {
    let error = false;
    let screens = document.querySelectorAll('.screen');

    screens.forEach((item) => {
      const select = item.querySelector('select');
      const input = item.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;

      if (selectName === 'Тип экранов' || input.value === '') {
        error = true;
      }
    });
    return !error;
  },
  addRollback: function (event) {
    rangeValue.textContent = event.target.value + '%';
    appData.rollback = event.target.value;
  },
  addTitle: function () {
    document.title = title;
  },
  start: function () {
    if (appData.checkfields()) {
      appData.addScreens();
      appData.addServices();
      appData.addPrices();
      appData.showResult();
    }
  },
  clear: function () {
    servicePrice.value = 0;
    numberScreens.value = 0;
    allServicePrices.value = 0;
    fullPrice.value = 0;
    rollback.value = 0;
    appData.screens = [];
    appData.screenPrice = 0;
    appData.screenCount = 0;
    appData.servicePricesNumber = 0;
    appData.servicePricesPercent = 0;
    appData.fullPrice = 0;
    appData.servicePercentPrice = 0;
  },
  addScreens: function () {
    let screens = document.querySelectorAll('.screen');

    screens.forEach((screen, index) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;

      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: +input.value,
      });
    });
  },
  addServices: function () {
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const input = item.querySelector('input[type=text]');
      const label = item.querySelector('label');

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });
    otherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const input = item.querySelector('input[type=text]');
      const label = item.querySelector('label');

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  addScreensBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
    screens = document.querySelectorAll('.screen');
    console.log(screens);
  },
  removeScreensBlock: function () {
    if (screens.length > 1) {
      screens[screens.length - 1].remove();
      screens = document.querySelectorAll('.screen');
      console.log(screens);
    }
  },
  addPrices: function () {
    appData.screenPrice = appData.screens.reduce(function (
      accumulator,
      screen
    ) {
      return accumulator + +screen.price;
    },
    0);

    for (const screen in appData.screens) {
      appData.screenCount += +appData.screens[screen].count;
    }

    for (const service in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[service];
    }

    for (const service in appData.servicesPercent) {
      appData.servicePricesPercent +=
        appData.screenPrice * (appData.servicesPercent[service] / 100);
    }

    appData.fullPrice =
      +appData.screenPrice +
      appData.servicePricesNumber +
      appData.servicePricesPercent;

    appData.servicePercentPrice =
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
  },
  showResult: function () {
    servicePrice.value = appData.screenPrice;
    numberScreens.value = appData.screenCount;
    allServicePrices.value =
      appData.servicePricesNumber + appData.servicePricesPercent;
    fullPrice.value = appData.fullPrice;
    rollback.value = appData.servicePercentPrice;
  },
};

appData.init();
