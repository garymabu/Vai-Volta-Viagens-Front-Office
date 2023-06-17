const homeDomain = 'http://localhost:8080';

const travels = [
  {
    id: 1,
    origem: "Rio de Janeiro",
    destino: "Porto Alegre",
    horaPartida: 10,
    horaChegada: 15,
  },
  {
    id: 2,
    origem: "São Paulo",
    destino: "Rio de Janeiro",
    horaPartida: 17,
    horaChegada: 18
  },
  {
    id: 3,
    origem: "Bahia",
    destino: "Porto Alegre",
    horaPartida: 10,
    horaChegada: 16
  },
]


function FetchFormData(){
  const origem = document.querySelector('#Origem').value;
  const destino = document.querySelector('#Destino').value;
  console.log(origem)
  console.log(destino)
  return {
    origem:origem,
    destino: destino
  }
}



async function FetchDataAndRenderCards(){
  const cardBox = document.getElementById('cardBox')
  const {
    origem,
    destino
  } = FetchFormData();

  if(!origem || !destino){
    return alert("Local de origem ou destino não informados.")
  }

  // const result = await fetch(`${homeDomain}/v1/travel`, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json',
  //   },
  //   body: JSON.stringify(data),
  // })

  const searchedTravels = travels.filter((travel) => travel.origem === origem && travel.destino === destino)

  console.log(searchedTravels)
  
  let travelsHTML = searchedTravels.map((travel) => {
      return `
        <div id="travelCard" class="travel-card">
          <div class="origin-destiny-content">
            <h3 id="Origem">${travel.origem}</h3>
            <p> → </p>
            <h3 id="Destino">${travel.destino}</h3>
          </div>
          <div>
            <span id="horaChegada">Horário de partida: ${travel.horaPartida}:00</span>
            <span id="horaPartida">Horário de chegada: ${travel.horaChegada}:00</span>
          </div>
          <div>
            <button onclick="RedirectToBookingPage()" class="btn-reserve">Clique para saber mais</button>
          </div>
        </div>
      `
  })

  if(travelsHTML.length < 1) {
    travelsHTML[0] =`
      <div>
        <h2>Nenhuma viagem encontrada!</h2>
      </div>
    `
  }

  let html = travelsHTML.join('')
  cardBox.innerHTML = html
}

function RedirectToBookingPage() {
  setTimeout(() => {
    window.location.href = `../booking/index.html`;
  })
}


console.log(travelsHTML)

FetchDataAndRenderCards()


