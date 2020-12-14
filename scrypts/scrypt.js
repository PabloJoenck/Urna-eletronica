// CONTROLE DE INTERFACE 

let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso =  document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');

// CONTROLE DE AMBIENTE

let etapaAtual = 0;
let numero = '';
let Votobranco = false;

function comecarEtapa(){
    let etapa = etapas[etapaAtual];
    let numeroHTML = ''; 
    numero = '';
    Votobranco = false;

    for(let i=0;i<etapa.numeros;i++) {
        if (i===0) {
            numeroHTML += '<div class="numero pisca"></div>';
        }else {
        numeroHTML += '<div class="numero"></div>';
        }
       
    }
    
    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display ='none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHTML;
}
function atualizaInterface(n) {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero) {
            return true;
        } else{
            return false;
    }});

    if(candidato.length >0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;       
       
        let fotohtml = '';
        for (let i in candidato.foto) {
            if (candidato.foto[i].dl){
                fotohtml += `<div class="d-1-image"><img src="./img/${candidato.foto[i].url}" alt="" />${candidato.foto[i].legenda}`
                }else {
                fotohtml += `<div class="d-1-image small"><img src="./img/${candidato.foto[i].url}" alt="" />${candidato.foto[i].legenda}`
                }
        }
        lateral.innerHTML = fotohtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="Aviso--Grande pisca">VOTO NULO</div>';
    }
    
}
function clicou(n) {
   let elnumero = document.querySelector('.numero.pisca');
   if(elnumero !== null) {
       elnumero.innerHTML = n;
       numero = numero.concat(n);

       elnumero.classList.remove('pisca');
       if(elnumero.nextElementSibling !== null) {
       elnumero.nextElementSibling.classList.add('pisca');
       } else {
           atualizaInterface();
       }

       
   }

}
function branco() {
        numero = '';
        Votobranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="Aviso--Grande pisca">VOTO EM BRANCO</div>';
        lateral.innerHTML = '';
    }
function corrige() {
    comecarEtapa();
}
function confirma() {
    let etapa = etapas[etapaAtual];

    let VotoCofirmado = false;
    if (Votobranco === true){
        VotoCofirmado = true;
        console.log("Confirmando como BRANCO...");

    } else if(numero.length === etapa.numeros) {
        VotoCofirmado = true;
        console.log("Confirmando como "+numero);
    }

    if (VotoCofirmado){
        etapaAtual++;
        if (etapas[etapaAtual] !== undefined){
           comecarEtapa();
       } else {
           document.querySelector('.tela').innerHTML = '<div class="Aviso--FIM pisca">FIM..</div>'
       }
    }
}
comecarEtapa();