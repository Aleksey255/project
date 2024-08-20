'use strict';

document.querySelectorAll('.book')[0].before(document.querySelectorAll('.book')[1])
document.querySelectorAll('.book')[2].before(document.querySelectorAll('.book')[4])
document.querySelectorAll('.book')[3].before(document.querySelectorAll('.book')[4])
document.querySelectorAll('.book')[4].before(document.querySelectorAll('.book')[5])

document.querySelector('body').style.backgroundImage = 'url(/image/you-dont-know-js.jpg)'

document.querySelectorAll('.book > h2 > a')[2].textContent = "Книга 3. this и Прототипы Объектов"

document.querySelector('.adv').remove()

const book = document.querySelectorAll('.book')

book[1].querySelectorAll('li')[10].before(book[1].querySelectorAll('li')[2])
book[1].querySelectorAll('li')[3].before(book[1].querySelectorAll('li')[5])
book[1].querySelectorAll('li')[4].before(book[1].querySelectorAll('li')[7])

book[4].querySelectorAll('li')[2].before(book[4].querySelectorAll('li')[9])
book[4].querySelectorAll('li')[6].before(book[4].querySelectorAll('li')[3])
book[4].querySelectorAll('li')[9].before(book[4].querySelectorAll('li')[6])

book[5].querySelectorAll('li')[8].insertAdjacentHTML("beforeend", '<li>Глава 8: За пределами ES6</li>')




