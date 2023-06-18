const homeDomain = 'http://localhost:8080';

const travels = [
  {
    id: 1,
    origem: "Rio de Janeiro",
    destino: "Porto Alegre",
    horaPartida: 10,
    horaChegada: 15,
    valor: 500.00
  },
  {
    id: 2,
    origem: "Rio de Janeiro",
    destino: "Porto Alegre",
    horaPartida: 10,
    horaChegada: 15,
    valor: 400.00
  },
  {
    id: 3,
    origem: "São Paulo",
    destino: "Rio de Janeiro",
    horaPartida: 17,
    horaChegada: 18,
    valor: 400.00
  },
  {
    id: 4,
    origem: "Bahia",
    destino: "Porto Alegre",
    horaPartida: 10,
    horaChegada: 16,
    valor: 300.00
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

  let travelsHTML = searchedTravels.map((travel) => {
      return `
      <div class="card">
        <div class="card-header">Descrição da Viagem:</div>
        <div class="card-info">
        <p><strong>Origem:</strong> ${travel.origem}</p>
        <p><strong>Destino:</strong> ${travel.destino}</p>
        <p><strong>Preço:</strong> R$${travel.valor}</p>
        <p><strong>Horário de Partida:</strong> ${travel.horaPartida}:00</p>
        <p><strong>Horário de Chegada:</strong> ${travel.horaChegada}:00</p>
      </div>
      <a href="../booking/index.html" class="button">Fazer Reserva</a>
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

FetchDataAndRenderCards()


