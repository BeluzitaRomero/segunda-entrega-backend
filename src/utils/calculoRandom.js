const list = [];
function getRandomInt(min, max) {
  let number = Math.floor(Math.random() * (max - min)) + min;
  list.push(number);
}

function randomList(cant) {
  let x = 0;
  const numbers = {};

  while (x < cant) {
    getRandomInt(1, 1000);
    x += 1;
  }

  list.map((num) => {
    numbers[num] = list.filter((rep) => rep === num).length;
  });

  return numbers;
}

process.on("message", (cant) => {
  let result = randomList(cant);
  //envio al padre
  process.send(result);
});
