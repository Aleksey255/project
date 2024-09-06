'use strict';

const title = document.getElementsByTagName('h1')[0].textContent;
const startBtn = document.getElementById('start');
const resetBtn = document.getElementById('reset');
const plusBtn = document.getElementById('add');
const minusBtn = document.getElementById('remove');
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');
const otherItems = document.querySelectorAll('.other-items');
const cmsCheck = document.getElementById('cms-open');
const cmsVariants = document.querySelector('.hidden-cms-variants');
const cmsOtherVariants = document.querySelector(
  '.hidden-cms-variants > .main-controls__input'
);
const cmsOtherInput = document.getElementById('cms-other-input');
const cmsSelect = document.getElementById('cms-select');
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
    this.addTitle();
    startBtn.addEventListener('click', this.start);
    resetBtn.addEventListener('click', this.reset);
    plusBtn.addEventListener('click', this.addScreensBlock);
    minusBtn.addEventListener('click', this.removeScreensBlock);
    range.addEventListener('input', this.addRollback);
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
      } else {
        select.disabled = true;
        input.disabled = true;
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
      startBtn.style = 'display: none';
      resetBtn.style = 'display: block';
    }
  },
  reset: function () {
    servicePrice.value = 0;
    numberScreens.value = 0;
    allServicePrices.value = 0;
    fullPrice.value = 0;
    rollback.value = 0;
    range.value = 0;
    rangeValue.textContent = '0%';

    appData.screenPrice = 0;
    appData.screenCount = 0;
    appData.servicePricesNumber = 0;
    appData.servicePricesPercent = 0;
    appData.fullPrice = 0;
    appData.servicePercentPrice = 0;
    appData.rollback = 0;
    appData.screens = [];
    appData.servicesNumber = {};
    appData.servicesPercent = {};

    let screens = document.querySelectorAll('.screen');

    startBtn.style = 'display: block';
    resetBtn.style = 'display: none';
    cmsVariants.style = 'display: none';
    cmsCheck.checked = false

    screens.forEach((item, index) => {
      if (index !== 0) {
        item.remove();
      } else {
        const select = item.querySelector('select');
        const input = item.querySelector('input');

        select.disabled = false;
        input.disabled = false;
        select.options.selectedIndex = 0;
        input.value = '';
      }
    });

    otherItems.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');

      if (check.checked) {
        check.checked = false;
      }
    });
  },
  addScreens: function () {
    let screens = document.querySelectorAll('.screen');

    screens.forEach((screen, index) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;

      this.screens.push({
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
        this.servicesPercent[label.textContent] = +input.value;
      }
    });
    otherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const input = item.querySelector('input[type=text]');
      const label = item.querySelector('label');

      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    });

    if (cmsCheck.checked) {
      cmsVariants.style = 'display: flex';
    }

    cmsSelect.addEventListener('change', () => {
      const selectedOptions = cmsSelect.options[cmsSelect.selectedIndex];
      console.log(selectedOptions.value);
      if (selectedOptions.value === 'other') {
        cmsOtherVariants.style = 'display: block';
      } else if (selectedOptions.value === '50') {
        const full = appData.fullPrice + appData.fullPrice * 0.5;
        fullPrice.value = full;
        console.log(full);
      }
    });
  },

  addScreensBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
    screens = document.querySelectorAll('.screen');
  },
  removeScreensBlock: function () {
    if (screens.length > 1) {
      screens[screens.length - 1].remove();
      screens = document.querySelectorAll('.screen');
    }
  },
  addPrices: function () {
    this.screenPrice = this.screens.reduce(
      (accumulator, screen) => accumulator + +screen.price,
      0
    );

    for (const screen in this.screens) {
      this.screenCount += +this.screens[screen].count;
    }

    for (const service in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[service];
    }

    for (const service in this.servicesPercent) {
      this.servicePricesPercent +=
        this.screenPrice * (this.servicesPercent[service] / 100);
    }

    this.fullPrice =
      +this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;

    this.servicePercentPrice =
      this.fullPrice - this.fullPrice * (this.rollback / 100);
  },
  showResult: function () {
    servicePrice.value = this.screenPrice;
    numberScreens.value = this.screenCount;
    allServicePrices.value =
      this.servicePricesNumber + this.servicePricesPercent;
    fullPrice.value = this.fullPrice;
    rollback.value = this.servicePercentPrice;
  },
};

appData.init();
