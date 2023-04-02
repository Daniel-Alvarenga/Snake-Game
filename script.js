localStorage.setItem('recorde', 0);

recorde = localStorage.getItem('recorde');

score.innerText = "Score: 0";
best.innerText = "Best: " + recorde;

localStorage.setItem('tema', t);

var vez = 0;
var inicio = -1;
var execucao = 0;
var posicao = 42;
var tamanho = 1;
var velocidade = 0;
var permissao_sair = 0;
var t = 0;
var valor_aleatorio = 1;

var rastro = new String();

var musica = document.getElementById('musica');
var game_over = document.getElementById('gameOver');
var win = document.getElementById('win');
var eat = document.getElementById('eat');

var play_pixels = [ 
    242, 262, 282, 302, 322, 322, 322, 243, 244, 265, 284,
    283, 247, 267, 287, 307, 327, 328, 329, 311, 271, 251,
    252, 253, 254, 274, 331, 334, 314, 294, 293, 292, 291,
    338, 337, 256, 277, 298, 259, 279, 299, 319
];

var gameover_pixels = [
    222, 202, 182, 162, 242, 163, 243, 164, 244, 224, 204,
    226, 206, 186, 166, 246, 167, 168, 208, 207, 229, 249,
    169, 189, 209, 231, 211, 191, 171, 255, 251, 235, 215,
    195, 175, 192, 213, 194, 237, 217, 197, 177, 178, 218,
    257, 258, 179, 259, 402, 382, 362, 342, 422, 343, 423,
    364, 344, 424, 404, 384, 407, 386, 366, 346, 428, 409,
    390, 370, 350, 412, 392, 372, 352, 353, 393, 422, 433,
    354, 432, 434, 416, 396, 376, 356, 436, 357, 358, 398,
    397, 418, 439, 379, 399
];

var zerar_pixels = [
    144, 165, 186, 187, 167, 147, 207, 226, 225, 169, 189,
    209, 230, 231, 212, 192, 172, 151, 150, 154, 174, 194,
    235, 236, 214, 217, 197, 177, 157, 324, 304, 344, 385,
    364, 346, 366, 387, 368, 348, 328, 308, 310, 350, 370,
    390, 330, 312, 332, 352, 372, 392, 312, 333, 354, 395,
    375, 335, 315, 355, 317, 337, 317, 357, 397
];

var box = document.getElementById('monitor');
var inicio_x, inicio_y, fim_x, fim_y;

function pintar_play(){

    execucao = 1;

    for(x = 1; x<601; x++){
        id_limpar= "pixel" + x;
        idSelecionado_limpar = document.getElementById(id_limpar);
        idSelecionado_limpar.className = "apagado";
        idSelecionado_limpar.style.opacity = "1";
    }

    setTimeout(() => {
        for(x = 0; x< 12; x++){
            id = "pixel" + play_pixels[x];
            idSelecionado = document.getElementById(id);
            idSelecionado.className = "play";
        }
        setTimeout(() => {
            for(x = 12; x< 19; x++){
                id = "pixel" + play_pixels[x];
                idSelecionado = document.getElementById(id);
                idSelecionado.className = "play";
            }
            setTimeout(() => {
                for(x = 19; x< 33; x++){
                    id = "pixel" + play_pixels[x];
                    idSelecionado = document.getElementById(id);
                    idSelecionado.className = "play";
                }
                setTimeout(() => {
                    for(x = 33; x< 42; x++){
                        id = "pixel" + play_pixels[x];
                        idSelecionado = document.getElementById(id);
                        idSelecionado.className = "play";
                    }
                    setTimeout(() => {
                        execucao = 0;
                        inicio = 0;
                    },400);
                },400);
            },400);
        },400);
    },400);
}

pintar_play();

setInterval(() => {
    if(valor_aleatorio<600) valor_aleatorio++;
    else valor_aleatorio = 1;
});

if (window.innerWidth <= 500) {
    tela = "pequena";
}
else{
    tela = "grande";
}

document.addEventListener("keydown", keyPush);

function keyPush(event){
    switch (event.keyCode) {
        case 65:
            entrada_esquerda();
            break;

        case 177:
            entrada_esquerda();
            break;

        case 87:
            entrada_cima();
            break;

        case 68:
            entrada_direita();
            break;

        case 176:
            entrada_direita();
            break;

        case 83:
            entrada_baixo();
            break;

        case 37:
            entrada_esquerda();
            break;

        case 38:
            entrada_cima();
            break;

        case 39:
            entrada_direita();
            break;

        case 40:
            entrada_baixo();
            break;

        case 32:
            entrada_espaço();
            break;

        case 179: 
            entrada_espaço();
            break;

        case 84: 
            mudar_tema();
            break;
    }
}

document.addEventListener("keypress", function(e){
    if(inicio == 0 && execucao == 0){
        iniciar_jogo();
    }
    else if(inicio == -1 && execucao == 0) {
        pintar_play();
    }
});

document.addEventListener('touchmove', function(event) {
    event.preventDefault();
  }, { passive: false });

box.addEventListener("touchstart", function(event) {
  inicio_x = event.touches[0].screenX;
  inicio_y = event.touches[0].screenY;
}, false);

box.addEventListener("touchend", function(event) {
  fim_x = event.changedTouches[0].screenX;
  fim_y = event.changedTouches[0].screenY;

  var diferenca_x = fim_x - inicio_x;
  var diferenca_y = fim_y - inicio_y;

  if (Math.abs(diferenca_x) > Math.abs(diferenca_y)) {
    if (diferenca_x > 0) {
      entrada_direita();
    } else {
      entrada_esquerda();
    }
  } else {
    if (diferenca_y > 0) {
      entrada_baixo();
    } else {
      entrada_cima();
    }
  }
}, false);

function entrada_direita(){
    if(inicio == 0 && execucao == 0){
        iniciar_jogo();
    }

    else if(inicio == -1 && execucao == 0) {
         pintar_play();
    }

    else if(velocidade == 1){
        mudar_direcao(3);
    }
}

function entrada_esquerda(){
    if(inicio == 0 && execucao == 0){
        iniciar_jogo();
    }

    else if(inicio == -1 && execucao == 0) {
         pintar_play();
    }

    else if(velocidade == 1){
        mudar_direcao(1);
    }
}

function entrada_cima(){
    if(inicio == 0 && execucao == 0){
        iniciar_jogo();
    }

    else if(inicio == -1 && execucao == 0){
         pintar_play();
    }

    else if(velocidade == 1){
        mudar_direcao(2);
    }
}

function entrada_baixo(){
    if(inicio == 0 && execucao == 0){
        iniciar_jogo();
    }

    else if(inicio == -1 && execucao == 0) {
         pintar_play();
    }

    else if(velocidade == 1){
        mudar_direcao(4);
    }
}

function entrada_espaço(){
    if(inicio == 0 && execucao == 0){
        iniciar_jogo();
    }

    else if(inicio == -1 && execucao == 0) {
         pintar_play();
    }

    else if(velocidade == 1){
        musica.pause();
        velocidade = 0;
    }

    else if(velocidade == 0 && inicio == 1){
        musica.play();
        velocidade = 1;
    }
}

document.getElementById('mudar-tema').onclick = () =>{
    mudar_tema();
}

function mudar_tema(){

    if(t == 0){
        t = 1;
        localStorage.setItem('tema', t);
        document.documentElement.style.setProperty('--tema', 'rgb(35, 35, 35)');
        document.documentElement.style.setProperty('--cor', 'rgb(230, 230, 230)');
    }

    else{
        t = 0;
        localStorage.setItem('tema', t);
        document.documentElement.style.setProperty('--tema', 'rgb(230, 230, 230)');
        document.documentElement.style.setProperty('--cor', 'rgb(0, 0, 0)');
    }

}

function iniciar_jogo(){

    execucao = 1;

    setTimeout(() => {
        for(x = 41; x>32; x--){
            id = "pixel" + play_pixels[x];
            idSelecionado = document.getElementById(id);
            idSelecionado.className = "apagado";
        }
        setTimeout(() => {
            for(x = 33; x > 18; x--){
                id = "pixel" + play_pixels[x];
                idSelecionado = document.getElementById(id);
                idSelecionado.className = "apagado";
            }
            setTimeout(() => {
                for(x = 19; x> 11; x--){
                    id = "pixel" + play_pixels[x];
                    idSelecionado = document.getElementById(id);
                    idSelecionado.className = "apagado";
                }
                setTimeout(() => {
                    for(x = 11; x >-1; x--){
                        id = "pixel" + play_pixels[x];
                        idSelecionado = document.getElementById(id);
                        idSelecionado.className = "apagado";
                    }

                    pintar();

                },350)
            },350)
        },350)
    },350)

}

function pintar(){
    game_over.pause();

    musica.currentTime = 0;
    musica.play();


    for(x = 1; x<601; x++){
        id = "pixel" + x;
        idSelecionado = document.getElementById(id);
        idSelecionado.style.opacity = "1";
    }

    pontuacao = 0;
    document.getElementById('pontos').value = pontuacao;

    pixel42.className = "cobra";
    pixel498.className = "maça";

    for(v = 0; v<tamanho; v++){
        rastro[v] = null;
    }

    if(tela == "grande"){
        tempo_espera = 150;
    }
    else{
        tempo_espera = 250;
    }

    direcao = "d";
    ultima_direcao = "d";
    posicao = 42;
    tamanho = 1;
    comando_andar(2);
    tamanho++;
    comando_andar(2);
    tamanho++;

    velocidade = 1;

    if(vez == 0){
        setInterval(mover, tempo_espera);
        vez = 1;
        inicio = 1;
        execucao = 0;
    } 
}

function mover(){
    if(velocidade == 1){
        if (direcao == "e"){
            comando_andar(1);
        }
        else if (direcao == "d"){
            comando_andar(2);
        }
        else if (direcao == "b"){
            comando_andar(3);
        }
        else if (direcao == "c"){
            comando_andar(4);
        }
    }
}

function comando_andar(x){

    verificacao_esquerda = ((posicao - 1)) % 20;
    verificacao_direita = ((posicao)) % 20;
    verificacao_baixo = (posicao -(-20));
    verificacao_cima = (posicao - 20);

    if(x == 1){
        if(verificacao_esquerda == 0){
              perder();
        }
        else{
            direcao = "e";
             esquerda(); 
        }
    }

    else if(x == 2){
        if(verificacao_direita == 0){
              perder();
        }
        else{
            direcao = "d";
            direita(); 
        }
    }

    else if(x == 3){
        if(verificacao_baixo > 600){
              perder();
        }
        else{
            direcao = "b";
             baixo(); 
        }
    }

    else if(x == 4){
        if(verificacao_cima < 0){
              perder();
        }
        else{
            direcao = "c";
             cima(); 
        }
    }

    verificar_maças();
}

function esquerda(){
    limpar();
    posicao--;
    andar(posicao);
    ultima_direcao = "e";
}

function direita(){
    limpar();
    posicao++;
    andar(posicao);
    ultima_direcao = "d";
}

function baixo(){
    limpar();
    posicao = posicao - (-20);
    andar(posicao);
    ultima_direcao = "b";
}

function cima(){
    limpar();
    posicao = posicao - 20;
    andar(posicao);
    ultima_direcao = "c";
}

function limpar(){
    id_limpar = "pixel" + posicao;
    idSelecionado_limpar = document.getElementById(id);
    idSelecionado_limpar.className = "apagado";
    gerar_rastro();
}

function andar(y){

    id_andar = "pixel" + y;
    idSelecionado_andar = document.getElementById(id_andar);

    if(idSelecionado_andar.className == "maça"){
        idSelecionado_andar.className = "cobra";
        comer();
    }

    else if(idSelecionado_andar.className == "cobra"){
        perder();
        game_over = document.getElementById('gameOver');
        game_over.currentTime = 0.2;
        game_over.play();
    }

    else{
        idSelecionado_andar.className = "cobra";
    }
}

function comer(){
    pontuacao+=5;
    score.innerText = "Score: " + pontuacao;

    recorde = localStorage.getItem('recorde');

    if(pontuacao > recorde){
        localStorage.setItem('recorde', pontuacao);
        recorde = localStorage.getItem('recorde');
        best.innerText = "Best: " + recorde;
    }

    if(pontuacao == 2985){
        zerar();
    }
    else{
        tamanho++;
        eat.currentTime = 0.5;
        eat.play();
        nova_maça();
    }
}

function  nova_maça(){
    verificacao_maça = 0;

    ponto = valor_aleatorio;
    id_maça = "pixel" + ponto;
    idSelecionado_maça= document.getElementById(id_maça);

    if(idSelecionado_maça.className == "apagado" && rastro_selecionado != ponto){
        idSelecionado_maça.className = "maça";
        verificacao_maça = 1;   
    }

    else{
        do{
            if(ponto>600) ponto++;
            else ponto = 0;

            id_maça = "pixel" + ponto;
            idSelecionado_maça= document.getElementById(id_maça);

            if(idSelecionado_maça.className == "apagado"){
                idSelecionado_maça.className = "maça";
                verificacao_maça = 1;   
            }
        }while(verificacao_maça == 0);
    }
}

function gerar_rastro(){
    for(v = (tamanho-1); v > 0; v--){
        rastro[v] = rastro[v-1];
    }

    rastro[0] = posicao;

    for(v = 0; v < (tamanho-1); v++){
        rastro_selecionado = (rastro[v]);
        id_rastro = "pixel" + rastro_selecionado;
        idSelecionado_rastro = document.getElementById(id_rastro);
        idSelecionado_rastro.className = "cobra";
    }

    rastro_selecionado = (rastro[tamanho - 1]);

    if(tamanho > 1){
        id_rastro = "pixel" + rastro_selecionado
        idSelecionado_rastro = document.getElementById(id_rastro);
        idSelecionado_rastro.className = "apagado";
    }

}

function mudar_direcao(d){
    if(d == 1 && direcao != "d" && ultima_direcao != "d"){
        direcao = "e";
    }

    else if(d == 3 && direcao != "e" && ultima_direcao != "e"){
        direcao = "d";
    }

    else if(d== 4 && direcao != "c" && ultima_direcao != "c"){
        direcao = "b";
    }

    else if(d == 2 && direcao != "b" && ultima_direcao != "b"){
        direcao = "c";
    }
}

function perder(){

    velocidade = 0

    for(v = 1; v<601; v++){
        id_perder = "pixel" + v;
        idSelecionado_perder = document.getElementById(id_perder);
        if(idSelecionado_perder.className == "cobra"){
            idSelecionado_perder.style.opacity = "0.2";
        }
        else if(idSelecionado_perder.className == "maça"){
            idSelecionado_perder.className = "maça";
            idSelecionado_perder.style.opacity = "0.2";
        }

    }

    musica.pause();

    game_over = document.getElementById('gameOver');
    game_over.play();

    for(x = 0; x<11; x++){
        id_perder = "pixel" + gameover_pixels[x];
        idSelecionado_perder = document.getElementById(id_perder);
        idSelecionado_perder.className = "gameover";
        idSelecionado_perder.style.opacity = "1";
    }

    setTimeout(() =>{
        for(x = 11; x<25; x++){
            id_perder = "pixel" + gameover_pixels[x];
            idSelecionado_perder = document.getElementById(id_perder);
            idSelecionado_perder.className = "gameover";
        idSelecionado_perder.style.opacity = "1";
        }
        setTimeout(() =>{
            for(x = 25; x<38; x++){
                id_perder = "pixel" + gameover_pixels[x];
                idSelecionado_perder = document.getElementById(id_perder);
                idSelecionado_perder.className = "gameover";
                idSelecionado_perder.style.opacity = "1";
            }
            setTimeout(() =>{
                for(x = 38; x<48; x++){
                    id_perder = "pixel" + gameover_pixels[x];
                    idSelecionado_perder = document.getElementById(id_perder);
                    idSelecionado_perder.className = "gameover";
                    idSelecionado_perder.style.opacity = "1";
                }
                setTimeout(() =>{
                    for(x = 48; x<60; x++){
                        id_perder = "pixel" + gameover_pixels[x];
                        idSelecionado_perder = document.getElementById(id_perder);
                        idSelecionado_perder.className = "gameover";
                        idSelecionado_perder.style.opacity = "1";
                    }
                    setTimeout(() =>{
                        for(x = 60; x<69; x++){
                            id_perder = "pixel" + gameover_pixels[x];
                            idSelecionado_perder = document.getElementById(id_perder);
                            idSelecionado_perder.className = "gameover";
                            idSelecionado_perder.style.opacity = "1";
                        }
                        setTimeout(() =>{
                            for(x = 69; x<80; x++){
                                id_perder = "pixel" + gameover_pixels[x];
                                idSelecionado_perder = document.getElementById(id_perder);
                                idSelecionado_perder.className = "gameover";
                                idSelecionado_perder.style.opacity = "1";
                            }
                            setTimeout(() =>{
                                for(x = 80; x<93; x++){
                                    id_perder = "pixel" + gameover_pixels[x];
                                    idSelecionado_perder = document.getElementById(id_perder);
                                    idSelecionado_perder.className = "gameover";
                                    idSelecionado_perder.style.opacity = "1";
                                }
                                    setTimeout(() =>{
                                       inicio = -1;
                                       execucao = 0;
                                    },1700);
                            }, 200);
                        }, 200);
                    }, 200);
                }, 200);
            }, 200);
        }, 200);
    }, 200);
}

function verificar_maças(){
    if(velocidade == 1){
        for(x = 1; x<601; x++){
            id_busca = "pixel" + [x];
            idSelecionado_busca = document.getElementById(id_busca);
            if(idSelecionado_busca.className == "maça"){
                existencia = 1;
            }
        }

        if(existencia == 0){
            nova_maça();
        }
    }
    existencia = 0;
}

function zerar(){
    velocidade = 0

    musica.pause();
    win.play();

    for(v = 1; v<601; v++){
        id_perder = "pixel" + v;
        idSelecionado_perder = document.getElementById(id_perder);
        if(idSelecionado_perder.className == "cobra"){
            idSelecionado_perder.style.opacity = "0.2";
        }
        else if(idSelecionado_perder.className == "maça"){
            idSelecionado_perder.className = "maça";
            idSelecionado_perder.style.opacity = "0.2";
        }

    }

    for(x = 0; x<9; x++){
        id_zerar = document.getElementById('pixel' + zerar_pixels[x]);
        id_zerar.className = "zerar";
        id_zerar.style.opacity = "1";
    }
    setTimeout(()=>{
        for(x = 9; x<19; x++){
            id_zerar = document.getElementById('pixel' + zerar_pixels[x]);
            id_zerar.className = "zerar";
            id_zerar.style.opacity = "1";
        }
        setTimeout(()=>{
            for(x = 19; x<29; x++){
                id_zerar = document.getElementById('pixel' + zerar_pixels[x]);
                id_zerar.className = "zerar";
                id_zerar.style.opacity = "1";
            }
            setTimeout(()=>{
                for(x = 29; x<41; x++){
                    id_zerar = document.getElementById('pixel' + zerar_pixels[x]);
                    id_zerar.className = "zerar";
                    id_zerar.style.opacity = "1";
                }
                setTimeout(()=>{
                    for(x = 41; x<46; x++){
                        id_zerar = document.getElementById('pixel' + zerar_pixels[x]);
                        id_zerar.className = "zerar";
                        id_zerar.style.opacity = "1";
                    }
                    setTimeout(()=>{
                        for(x = 46; x<59; x++){
                            id_zerar = document.getElementById('pixel' + zerar_pixels[x]);
                            id_zerar.className = "zerar";
                            id_zerar.style.opacity = "1";
                        }
                        setTimeout(()=>{
                            for(x = 59; x<64; x++){
                                id_zerar = document.getElementById('pixel' + zerar_pixels[x]);
                                id_zerar.className = "zerar";
                                id_zerar.style.opacity = "1";
                            }
                            inicio = -1;
                            execucao = 0;
                        },200);
                    },200);
                },200);
            },200);           
        },200);
    },200);
}