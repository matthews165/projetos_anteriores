var formulario = document.querySelector('form')

formulario.addEventListener('submit', function(e){
    //refresh block
    e.preventDefault()
    //url da pesquisa
    let urlform =  "https://pokeapi.co/api/v2/pokemon/";
    // valor do inpt name
    let nome = document.getElementById("name")
    // concatenar o url com o inputname
    urlform = urlform + this.name.value 
    // transformar os valores em minusculo 
    urlform = urlform.toLocaleLowerCase()

    //id content
    let resposta = document.getElementById('content')

    //id imgpokemon
    let imagem = document.getElementById('imgPokemon')

    //respostas em html
    let html = ''

    fetch(urlform)
        .then(resposta => resposta.json())
        .then(function(data){
            console.log(data)
            html = 'nome: ' + mai (data.name) + '<br>'
            html = html +'type: ' + mai  (data.types[0].type.name)
            resposta.innerHTML = html

            imagem.innerHTML = "<img src='" + data.sprites.front_default + "'><img src='" + data.sprites.back_default + "'>"
            
        })
        .catch(function(err){
            if(err == "SyntaxError: Unexpected token 'N', \"Not Found\" is not valid JSON"){
                html = 'pokemon nao encontrado! '
            } else {
                html = 'erro:' + err
            }
            resposta.innerHTML = html
                
        })

    
});

function mai(val){
    return val[0].toUpperCase() + val.substr(1)
}


