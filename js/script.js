const canvas = document.querySelector("canvas");

// ctx = contexto
const ctx = canvas.getContext("2d");

// ## definição de um ponto inicial (apenas para ter uma noção)
// ctx.fillStyle = "red";
// ctx.fillRect(280, 280, 50, 50); //X, Y, largura e altura

// A lógica utilizada para mover o objeto (snake) será em forma de Array, onde o último elemento será posicionado para o primeiro elemento.

const size = 30;
const snake = [
    { x:280, y:280 },
    { x:310, y:280 },
    { x:330, y:280 }
];

let direcao;

const drawSnake = () => {
    ctx.fillStyle = "#56bd26";
    
    //função forEach faz com que toda a Arrey seja percorrida; index de cada elemento [0],[1],[2]..
    snake.forEach((position, index) => {
        //definindo a cor de head da snake;
        if (index == snake.length - 1) {
            ctx.fillStyle = "#329f00";
        }
        ctx.fillRect(position.x, position.y, size, size);
    });

}

const moverSnake = () => { // FUNÇÃO QUE IRÁ MOVIMENTAR A SNAKE
if (!direcao) return; //snake sem direção
    
    const head = snake[snake.length -1]; //passar o primeiro elemento da snake

    if(direcao == "right") {
        snake.push({ x: head.x + size, y: head.y }); //movimentação para a direita
    }
    if(direcao == "left") {
        snake.push({ x: head.x - size, y: head.y }); //movimentação para a esquerda
    }
    if(direcao == "down") {
        snake.push({ x: head.x, y: head.y + size }); //movimentação para cima
    }
    if(direcao == "up") {
        snake.push({ x: head.x, y: head.y - size }); //movimentação para baixo
    }

    snake.shift(); //remove o primeiro elemento da array
    }

setInterval(() => {

    ctx.clearRect(0, 0, 600, 600); //"limpando o caminho já percorrido da snake"

    moverSnake(); //movimentação da snake
    drawSnake(); // aqui está sendo feito o "novo" desenho que está sendo percorrido a snake

},300);


