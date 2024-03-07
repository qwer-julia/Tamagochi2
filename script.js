const btnHappiness = document.querySelector('#app_button-increse-happiness');
const btnGetAngry = document.querySelector('#app_button-get-angry')
const kuromiImage = document.querySelector('#imagemPrincipal')
const btnSleep = document.querySelector('#app_button-sleep')
const btnEat = document.querySelector('#app_button-eat')
const botoes = document.querySelectorAll('.app__button')
const btnWakeUp = document.querySelector('#app_button-wakeup')

const exibirValorFome = document.querySelector('#valorFome')
let valorFome = 100
const exibirValorCarinho = document.querySelector('#valorCarinho')
let valorCarinho = 100
const exibirValorHigiene = document.querySelector('#valorHigiene')
let valorHigiene = 100
const exibirValorSono = document.querySelector('#valorSono')
let valorSono = 100


let intervalo = null
let tempoDecorridoEmSegundos

function ficarBravo(){
    tempoDecorridoEmSegundos = 3
    kuromiImage.setAttribute('src', './images/kuromi_angry.png')
    intervalo = setInterval(voltarAoNormal, 1000)
}

function ficarFeliz(){
    tempoDecorridoEmSegundos = 3
    if (valorCarinho >= 100){
        kuromiImage.setAttribute('src', './images/kuromi_happy100.png')
    }else{
        kuromiImage.setAttribute('src', './images/kuromi_happy.png')
    }
    intervalo = setInterval(voltarAoNormal, 1000)
}

btnHappiness.addEventListener('click', () =>{
    clearInterval(intervalo)
    valorCarinho += 10
    ficarFeliz()
})

btnGetAngry.addEventListener('click', () =>{
    clearInterval(intervalo)
    valorHigiene += 10
    ficarBravo()
})

btnEat.addEventListener('click', () =>{
    clearInterval(intervalo)
    valorFome += 10
    tempoDecorridoEmSegundos = 3
    kuromiImage.setAttribute('src', './images/kuromi_eat.png')
    intervalo = setInterval(voltarAoNormal, 1000)
})

const aumentarSono = () =>{
    valorSono += 10
}

btnSleep.addEventListener('click', (e) =>{
    clearInterval(intervalo)
    desabilitarBotoes()
    tempoDecorridoEmSegundos = 100
    nivelSono = setInterval(aumentarSono, 5000)
    btnWakeUp.disabled = false
    btnSleep.classList.add('hidden')
    btnWakeUp.classList.remove('hidden', 'disable')   
    kuromiImage.setAttribute('src', './images/kuromi_asleep.png')
})

btnWakeUp.addEventListener('click', (e)=> {
    clearInterval(intervalo)
    clearInterval(nivelSono)
    tempoDecorridoEmSegundos = 3
    ficarBravo()
    btnSleep.classList.remove('hidden')
    btnWakeUp.classList.add('hidden')   
})


function zerar(){
    clearInterval(intervalo)
    intervalo = null;
}

const voltarAoNormal = () => {
    if(tempoDecorridoEmSegundos <= 0){
        habilitarBotoes()
        kuromiImage.setAttribute('src', './images/kuromi_padrao2.png')
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
}

function desabilitarBotoes(){
    botoes.forEach(function (btn){
        btn.classList.add('disable')
    })
}

function habilitarBotoes(){
    botoes.forEach(function (btn){
        btn.classList.remove('disable')
    })
}

exibirValorFome.innerHTML = valorFome
exibirValorCarinho.innerHTML = valorCarinho
exibirValorHigiene.innerHTML = valorHigiene
exibirValorSono.innerHTML = valorSono


setInterval(abaixarCaracteristicas, 5000)

function abaixarCaracteristicas(){
    if (valorFome == 0 || valorCarinho == 0 || valorHigiene == 0 || valorSono == 0){
        kuromiImage.setAttribute('src', './images/kuromi_sad.png')
    }
    else{
        valorFome -= 1
        valorCarinho -= 1
        valorHigiene -= 1
        valorSono -= 1

        exibirValorFome.innerHTML = valorFome
        exibirValorCarinho.innerHTML = valorCarinho
        exibirValorHigiene.innerHTML = valorHigiene
        exibirValorSono.innerHTML = valorSono
    }
}

