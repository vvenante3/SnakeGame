const canvas = document.querySelector("canvas");

// ctx = contexto
const ctx = canvas.getContext("2d");

// ## definição de um ponto inicial (apenas para ter uma noção)
// ctx.fillStyle = "red";
// ctx.fillRect(280, 280, 50, 50); //X, Y, largura e altura

// A lógica utilizada para mover o objeto (snake) será em forma de Array, onde o último elemento será posicionado para o primeiro elemento.

const size = 30;
const snake = [ //posicionamento dos elementos da snake
    { x:240, y:270 },
    { x:270, y:270 },
    { x:300, y:270 },
];

let direcao, loopId;

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

const drawGrid = () => {
    ctx.lineWidth = 0.2;
    ctx.strokeStyle = "white";

    for(let i = 30; i < canvas.width; i+=30){
        //grid's verticais
        ctx.beginPath()
        ctx.lineTo(i, 0);
        ctx.lineTo(i, 600);
        ctx.stroke()
        //grid's horizontais
        ctx.beginPath()
        ctx.lineTo(0, i);
        ctx.lineTo(600, i); 
        ctx.stroke()
    }  
}
drawGrid();

const loop = () => { //A FUNÇÃO LOOP FARÁ O JOGO FUNCIONAR
    clearInterval(loopId);

    ctx.clearRect(0, 0, 600, 600); //"limpando o caminho já percorrido da snake"
    drawGrid();
    moverSnake(); //movimentação da snake
    drawSnake(); // aqui está sendo feito o "novo" desenho que está sendo percorrido a snake

    loopId = setTimeout(() => {
        loop();
    }, 300);
}

loop();

// document.addEventListener("keydown", (event) => {   //IDENTIFICA AS TECLAS QUE SÃO SELECIONADAS NO TECLADO
//     console.log(event.key);
// })

document.addEventListener("keydown", ({key }) => { //MOVIMENTAÇÕES COM AS TECLAS (direita, esquerda, baixo e cima)
    if( key == "ArrowRight" && direcao != "left"){ //direita
        direcao = "right";
    }
    if( key == "ArrowLeft" && direcao != "right"){ //esquerda
        direcao = "left";
    }
    if( key == "ArrowDown" && direcao != "up"){ //baixo
        direcao = "down";
    }
    if( key == "ArrowUp" && direcao != "down"){ //cima
        direcao = "up"; 
    }
});


