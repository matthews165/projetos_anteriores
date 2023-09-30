let fii_user = [];
let fii_table = [];

async function carregarDadosUser(url) {
    await fetch(url)
        .then(resp => resp.json())
        .then(json => fii_user = json);
    carregarDadosFundos();
}

async function carregarDadosFundos() {

    for (let fii of fii_user) {
        let json = await fetch(`https://api-simple-flask.herokuapp.com/api/${fii.nome}`)
            .then(resp => resp.json());
        fii_table.push(json);
    }


    exibirTabela();
}

carregarDadosUser("json/fii.json");

function exibirTabela() {
    
    let proxProv;

    let qtdDeCotas = 0
    let TotalInvestido = 0
    let SomaProvento = 0

    let tabela = document.querySelector("#tabela")

    console.log(fii_user)
    console.log(fii_table)

    let tbNome = ""

    for (let i = 0; i < fii_user.length; i++) {

        let linha = document.createElement("tr")
        let itemFundo = document.createElement("td")
        let itemSetor = document.createElement("td")
        let itemDB = document.createElement("td")
        let itemPG = document.createElement("td")
        let itemCB = document.createElement("td")
        let itemQTDCotas = document.createElement("td")
        let itemTotalInvestido = document.createElement("td")
        let itemPrecoMedio = document.createElement("td")
        let itemRendimento = document.createElement("td")
        let itemDy12Meses = document.createElement("td")
        let itemRendimento24 = document.createElement("td")
        let itemProvento = document.createElement("td")

        tbNome = fii_user[i].nome.toUpperCase() + "11"

        if (fii_table[i].proximoRendimento.rendimento == '-') {
            proxProv = fii_table[i].ultimoRendimento.rendimento;
        } else {
            proxProv = fii_table[i].proximoRendimento.rendimento;
        }
        if (fii_table[i].proximoRendimento.dataBase == '-') {
            dataBase = `${fii_table[i].ultimoRendimento.dataBase}`;
        } else {
            dataBase = `${fii_table[i].proximoRendimento.dataBase}`;
        }

        if (fii_table[i].proximoRendimento.dataPag == '-') {
            dataPag = `${fii_table[i].ultimoRendimento.dataPag}`;
        } else {
            dataPag = `${fii_table[i].proximoRendimento.dataPag}`;
        }

        let rendimento = proxProv * 100 / fii_table[i].valorAtual;
        

        for (let x = 0; x < fii_table.length; x++) {

            console.log("API:" + fii_table[x].fundo)

            if (tbNome == fii_table[x].fundo) {

                qtdDeCotas = qtdDeCotas + Number(fii_user[i].qtde)
                TotalInvestido = TotalInvestido + Number(fii_user[i].totalgasto)
                

                let PrecoMedio = Number(fii_user[i].totalgasto) / Number(fii_user[i].qtde)
                let Dy12Meses = Number(fii_table[x].ultimoRendimento.rendimento) * 12
                let Provento = (Number(fii_table[x].ultimoRendimento.rendimento) * Number(fii_table[x].ultimoRendimento.cotaBase)) / 100

                SomaProvento = SomaProvento + Provento 

                tabela.appendChild(linha)
                linha.appendChild(itemFundo)
                linha.appendChild(itemSetor)
                linha.appendChild(itemDB)
                linha.appendChild(itemPG)
                linha.appendChild(itemProvento)
                linha.appendChild(itemCB)
                linha.appendChild(itemQTDCotas)
                linha.appendChild(itemTotalInvestido)
                linha.appendChild(itemPrecoMedio)
                linha.appendChild(itemRendimento)
                linha.appendChild(itemDy12Meses)
                linha.appendChild(itemRendimento24)


                itemFundo.innerHTML = fii_table[x].fundo.toUpperCase()
                itemSetor.innerHTML = fii_table[x].setor
                itemDB.innerHTML = dataBase
                itemPG.innerHTML = dataPag
                itemProvento.innerHTML = "R$ "+Provento.toFixed(2)
                itemCB.innerHTML = "R$ "+fii_table[x].ultimoRendimento.cotaBase
                itemQTDCotas.innerHTML = fii_user[i].qtde
                itemTotalInvestido.innerHTML = "R$ "+fii_user[i].totalgasto
                itemPrecoMedio.innerHTML = "R$ "+PrecoMedio.toFixed(2)
                itemRendimento.innerHTML = rendimento.toFixed(2)+"%"
                itemDy12Meses.innerHTML = Dy12Meses.toFixed(2)+"%"
                itemRendimento24.innerHTML = "R$"+fii_table[x].rendimentoMedio24M.toFixed(2)


                
            }
        }
    }


    const rows = document.querySelectorAll("tr")
    console.log(rows)

    for(let i =1;i< rows.length;i++){

        let row = rows[i]['children'][9]['innerText']

        if (row.split("%")[0] < 0.6){
            rows[i].classList.add('negativo')
        }
        else{
            rows[i].classList.add('positivo')
        }
       
    }


    let mediaProvento = proxProv * qtdDeCotas

    let linha = document.createElement("tr")
    let Final = document.createElement("td")
    let traco = document.createElement("td")
    let mdProvento = document.createElement("td")
    let traco1 = document.createElement("td")
    let ttcotas = document.createElement("td")
    let ttInvetimento = document.createElement("td")
    let traco2 = document.createElement("td")
    let traco3 = document.createElement("td")
    let traco4 = document.createElement("td")
    let traco5 = document.createElement("td")

    tabela.appendChild(linha)

    tabela.appendChild(Final)
    tabela.appendChild(traco)
    tabela.appendChild(mdProvento)
    tabela.appendChild(traco1)
    tabela.appendChild(ttcotas)
    tabela.appendChild(ttInvetimento)
    tabela.appendChild(traco2)
    tabela.appendChild(traco3)
    tabela.appendChild(traco4)
    tabela.appendChild(traco5)
    

    Final.setAttribute("colspan", 3)
    Final.innerHTML = "total geral"
    Final.classList.add("fundo_total")

    traco.classList.add("fundo_total")
    mdProvento.classList.add("fundo_total")
    traco1.classList.add("fundo_total")
    ttcotas.classList.add("fundo_total")
    ttInvetimento.classList.add("fundo_total")
    traco2.classList.add("fundo_total")
    traco3.classList.add("fundo_total")
    traco4.classList.add("fundo_total")
    traco5.classList.add("fundo_total")
    
   
    
    traco.innerHTML = "-"
    mdProvento.innerHTML = "R$: "+ mediaProvento.toFixed(2)
    traco1.innerHTML = "-"
    ttcotas.innerHTML = qtdDeCotas
    ttInvetimento.innerHTML = "R$: " + TotalInvestido.toFixed(2)
    traco2.innerHTML = "-"
    traco3.innerHTML = "-"
    traco4.innerHTML = "-"
    traco5.innerHTML = "-"
    
    console.log(mediaProvento)
    console.log(SomaProvento)


  

    document.querySelector("#loading").src = ""





    /* Implemente aqui os cálculos solicitados no PDF,
    os cálculos devem ter como base, uma repetição no vetor fii_user
    e para cada fundo, consulte suas demais informações no vetor fii_table

    DICA para procurar um fundo do vetor fii_user no vetor fii_table
    let dados_fii = fii_table.find( (item) => item.fundo.indexOf(fii.nome.toUpperCase()) >= 0);

    Dentro da repetição, após os cálculos, monte a linha na tabela com o comando

    document.querySelector("table").innerHTML += variável

    Note que o cabeçalho da tabela já está pronto no HTML.
    Fora do for, adicione na tabela a linha final de total conforme exemplo no PDF.
    */
}