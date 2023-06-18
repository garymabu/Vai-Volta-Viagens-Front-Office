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
  const containerCards = document.querySelector('.container-cards')
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
    <div class="card">
      <div class="card-header">Viagem</div>
      <div class="card-info">
        <p><strong>Origem: </strong>${travel.origem}</p>
        <p><strong>Destino: </strong>${travel.destino}</p>
        <p><strong>Preço: </strong> R$${travel.valor}</p>
        <p><strong>Horário de Partida :</strong> ${travel.horaPartida}:00</p>
        <p><strong>Horário de Chegada :</strong> ${travel.horaChegada}:00</p>
      </div>
      <a href="pagina_de_reserva.html" class="button">Fazer Reserva</a>
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

  containerCards.innerHTML = travelsHTML
}

function RedirectToBookingPage() {
  setTimeout(() => {
    window.location.href = `../booking/index.html`;
  })
}


console.log(travelsHTML)

FetchDataAndRenderCards()


