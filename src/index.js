const MORSE_TABLE = {
  '.-': 'a',
  '-...': 'b',
  '-.-.': 'c',
  '-..': 'd',
  '.': 'e',
  '..-.': 'f',
  '--.': 'g',
  '....': 'h',
  '..': 'i',
  '.---': 'j',
  '-.-': 'k',
  '.-..': 'l',
  '--': 'm',
  '-.': 'n',
  '---': 'o',
  '.--.': 'p',
  '--.-': 'q',
  '.-.': 'r',
  '...': 's',
  '-': 't',
  '..-': 'u',
  '...-': 'v',
  '.--': 'w',
  '-..-': 'x',
  '-.--': 'y',
  '--..': 'z',
  '.----': '1',
  '..---': '2',
  '...--': '3',
  '....-': '4',
  '.....': '5',
  '-....': '6',
  '--...': '7',
  '---..': '8',
  '----.': '9',
  '-----': '0',
};

function decode(expr) {
  let arrOfWords = [];
  let arrOfLetters = [];

  //получили массив из слов по разделителю
  let arr = expr.split('**********');

  //каждое слово превращаем в отдельный подмассив
  for (let i = 0; i < arr.length; i++) {
    arrOfWords.push(Array.of(...arr[i]));
  }

  //в новом результирующем массиве создаем подмасивы, в которых будут храниться кусочки по 10
  for (let i = 0; i < arrOfWords.length; i++) {
    arrOfLetters.push([]);
  }

  // проходим каждый кусочек массива...
  for (let i = 0; i < arrOfWords.length; i++) {
    // ...в каждом кусочке пробегаемся и делим на 10
    for (let j = 0; j < arrOfWords[i].length; j += 10) {
      arrOfLetters[i].push(arrOfWords[i].slice(j, j + 10));
    }
  }

  //проходим каждый кусочек массива...
  for (let i = 0; i < arrOfLetters.length; i++) {
    //проходим каждый кусочек подмассива...
    for (let k = 0; k < arrOfLetters[i].length; k++) {
      //удаляем нули спереди
      while (arrOfLetters[i][k][0] === '0') arrOfLetters[i][k].shift();
    }
  }

  //сливание: из '1' и '1' получить '11'
  for (let i = 0; i < arrOfLetters.length; i++) {
    for (let k = 0; k < arrOfLetters[i].length; k++) {
      for (let n = 0; n < arrOfLetters[i][k].length; n += 2) {
        arrOfLetters[i][k][n] = arrOfLetters[i][k][n] + arrOfLetters[i][k][n + 1];
      }
    }
  }

  //на предыдущем этапе образовались лишние 0 и 1. их нужно удалить + сразу 10 заменить на точку, 11 заменить на тире
  for (let i = 0; i < arrOfLetters.length; i++) {
    for (let k = 0; k < arrOfLetters[i].length; k++) {
      for (let n = 0; n < arrOfLetters[i][k].length; n++) {

        if (arrOfLetters[i][k][n] === '0' || arrOfLetters[i][k][n] === '1') delete arrOfLetters[i][k][n]; //далее при слиянии пустоты уйдут
        if (arrOfLetters[i][k][n] === '10') arrOfLetters[i][k][n] = '.';
        if (arrOfLetters[i][k][n] === '11') arrOfLetters[i][k][n] = '-';
      }
    }
  }

  //каждый маленький массивчик слить в строку-комбинацию из знаков точки и тире
  for (let i = 0; i < arrOfLetters.length; i++) {
    for (let k = 0; k < arrOfLetters[i].length; k++) {
      arrOfLetters[i][k] = arrOfLetters[i][k].join('');
    }
  }

  //комбинаци 'точек-тире' перевести в буквы
  for (let i = 0; i < arrOfLetters.length; i++) {
    for (let k = 0; k < arrOfLetters[i].length; k++) {
      for (key in MORSE_TABLE) {
        if (key === arrOfLetters[i][k]) {
          arrOfLetters[i][k] = MORSE_TABLE[key];
        }
      }
    }
  }

  //конкатинируем каждое отдельное слово
  for (let i = 0; i < arrOfLetters.length; i++) {
    arrOfLetters[i] = arrOfLetters[i].join('');
  }

  //вывод получившейся строки
  return arrOfLetters.join(' ');
}

module.exports = {
  decode
}