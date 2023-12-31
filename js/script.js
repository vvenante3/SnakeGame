const canvas = document.querySelector("canvas");

// ctx = contexto
const ctx = canvas.getContext("2d");

// ## definição de um ponto inicial (apenas para ter uma noção)
// ctx.fillStyle = "red";
// ctx.fillRect(280, 280, 50, 50); //X, Y, largura e altura

// A lógica utilizada para mover o objeto (snake) será em forma de Array, onde o último elemento será posicionado para o primeiro elemento.

//MENU PRINCIPAL (GAME OVER)
const score = document.querySelector(".valorScore");
const finalScore = document.querySelector(".finalScore > span"); //busca a class finalScore e a tag span dentro dele
const menu = document.querySelector(".menu");
const buttonPlay = document.querySelector(".btnPlay");

const audio = new Audio('../audio/audio.mp3'); //FUNÇÃO QUE INSERE SOM QUANDO A SNAKE PASSA PELA MAÇÃ

const size = 30;

let snake = [ //posicionamento dos elementos da snake
    { x:240, y:270 },
    { x:270, y:270 },
    { x:300, y:270 },
];

const aumentarScore = () => {
    score.innerText = +score.innerText + 10; //colocar apenas o "+"" funciona como um "parseInt"
}

const randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min) //seleciona um numero randomico >0 e <1]
}

const randomPosition = () => {
    const number = randomNumber(0, canvas.width - size); // criar numero aleatorio
    return Math.round(number / 30) * 30;
}

const apple = { //POSICIONAMENTO MAÇA
    x: randomPosition(),
    y: randomPosition(),
    color: "red"
}

let direcao, loopId;

const drawApple = () => { //CRIAÇÃO DA MAÇÃ
    const { x,y,color } = apple;

    ctx.shadowColor = color;
    ctx.shadowBlur = 40;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
    ctx.shadowBlur = 0;
}

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
    ctx.lineWidth = 0.1;
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

const checkEat = () => { // FUNÇÃO QUE FARÁ A SNAKE COMER A MAÇÃ E AUMENTAR SEU CORPO(elemento)
    const head = snake[snake.length -1]
     //insere o som quando a snake passa pela maça

    if(head.x == apple.x && head.y == apple.y){
        aumentarScore();
        snake.push(head);
        audio.play();

        let x = randomPosition();   //posição que irá surgir a cobra
        let y = randomPosition();

        while(snake.find((position) => position.x == x && position.y == y)){ //Esta condicional foi criada para que a maça não surja em cima de um dos elementos da cobra. Caso o numero aleatório (posição) dê em um elemento da snake, ele será sorteado novamente
            x = randomPosition();
            y = randomPosition();
        }
        apple.x = x;
        apple.y = y;
    }
}

const colisao = () => {
    const head = snake[snake.length -1];
    const canvasLimit = canvas.width - size;
    const pescocoIndex = snake.length -2; //faz com que ignore a cabeça da snake;

    const wallColisao = head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit; //colisão pelas extremidades

    const colisaoSnake = snake.find((position, index) => {
        return index <pescocoIndex && position.x == head.x && position.y == head.y
    })

    if(wallColisao || colisaoSnake){
        gameOver();
    }
}

const gameOver = () => {
    direcao = undefined;

    menu.style.display = "flex";
    finalScore.innerText = score.innerText;
    canvas.style.filter = "blur(2px)";
}

const loop = () => { //A FUNÇÃO LOOP FARÁ O JOGO FUNCIONAR
    clearInterval(loopId);

    ctx.clearRect(0, 0, 600, 600); //"limpando o caminho já percorrido da snake"
    drawGrid();
    drawApple();
    moverSnake(); //movimentação da snake
    drawSnake(); // aqui está sendo feito o "novo" desenho que está sendo percorrido a snake
    checkEat();
    colisao();

    loopId = setTimeout(() => {
        loop();
    }, 300);
}

loop();

// document.addEventListener("keydown", (event) => {   //IDENTIFICA AS TECLAS QUE SÃO SELECIONADAS NO TECLADO
//     console.log(event.key);
// })

document.addEventListener("keydown", ({ key }) => { //MOVIMENTAÇÕES COM AS TECLAS (direita, esquerda, baixo e cima)
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

buttonPlay.addEventListener("click", () => {
    score.innerText = "00"
    menu.style.display = "none"
    canvas.style.filter = "none";

    snake = [ 
    { x:240, y:270 },
    { x:270, y:270 },
    { x:300, y:270 },
    ]
})