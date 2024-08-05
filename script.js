'use strict';

// Загадывание случайного числа от 1 до 100
let restartGame = true;
const rundomNum = Math.floor(Math.random() * 100) + 1;

const game = function (rundomNum, tries = 10) {
  function user() {
    let userNum = prompt('Угадай число от 1 до 100');
    console.log(rundomNum);

    if (userNum === null) {
      alert('Игра окончена');
      restartGame = false;
      return false;
    } else if (isNaN(userNum) || userNum === '') {
      alert('Введи число!');
      return user();
    } else if (userNum > rundomNum) {
      tries--;
      if (tries === 0) {
        restartGame = confirm('Попытки закончились, хотите сыграть еще?');
        return false;
      }
      alert(`Загаданное число меньше, осталось попыток ${tries}`);
      return user();
    } else if (userNum < rundomNum) {
      tries--;
      if (tries === 0) {
        restartGame = confirm('Попытки закончились, хотите сыграть еще?');
        return false;
      }
      alert(`Загаданное число больше, осталось попыток ${tries}`);
      return user();
    } else {
      restartGame = confirm('Поздравляю, Вы угадали!!! Хотели бы сыграть еще?');
      return false;
    }
  }
  user();
  if (restartGame) {
    rundomNum = Math.floor(Math.random() * 100) + 1;
    game(rundomNum);
  }
};

game(rundomNum);
