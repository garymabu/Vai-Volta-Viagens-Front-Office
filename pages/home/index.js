const homeDomain = "http://localhost:8080";

async function FetchLocalizationsAndLoadInPage() {
  const result = await fetch(`${homeDomain}/v1/localization`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const { content } = await result.json();
  const localizations = document.querySelector("#localizations");

  content.forEach((localization) => {
    const option = document.createElement("option");
    option.dataset.id = localization.id;
    option.value = localization.cityName;
    localizations.appendChild(option);
  });
}

async function GetPossibleRoutes(startingLocationId, endingLocationId) {
  const result = await fetch(
    `${homeDomain}/v1/trip/match-with-layover?departureLocalizationId=${startingLocationId}&destinationLocalizationId=${endingLocationId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  const routes = await result.json();

  return routes;
}

function FetchFormData() {
  const origem = document.querySelector(
    `option[value='${document.querySelector("#Origem").value}']`
  ).dataset.id;

  const destino = document.querySelector(
    `option[value='${document.querySelector("#Destino").value}']`
  ).dataset.id;
  return {
    origem,
    destino,
  };
}

async function FetchDataAndRenderCards() {
  const cardBox = document.getElementById("cardBox");
  const { origem, destino } = FetchFormData();
  console.log("origem e destino", origem, destino);

  if (!origem || !destino) {
    return alert("Local de origem ou destino não informados.");
  }

  const routes = await GetPossibleRoutes(origem, destino);

  const main = document.querySelector("main");
  if (main.querySelector("h2") === null) {
    const title = document.createElement("h2");
    title.innerText = "Viagens disponíveis:";
    main.prepend(title);
  }

  while (cardBox.firstChild) {
    cardBox.removeChild(cardBox.firstChild);
  }

  routes.forEach((route) => {
    const card = document.createElement("div");
    card.classList.add("travel-card");
    card.id = "travelCard";
    card.innerHTML = `
      <div class="origin-destiny-content">
        <h3 id="Origem">${route.firstTrip.departureLocalization.cityName}</h3>
        <p> → </p>
        <h3 id="Destino">${route.lastTrip.arrivalLocalization.cityName}</h3>
      </div>
      <div>
        <span id="horaChegada">Horário de partida: ${route.firstTrip.departureDatetime}:00</span>
        <span id="horaPartida">Horário de chegada: ${route.lastTrip.arrivalDatetime}:00</span>
      </div>
      <div>
        <button onclick="RedirectToBookingPage()" class="btn-reserve">Clique para saber mais</button>
      </div>
    `;
    cardBox.appendChild(card);
  });
  // const searchedTravels = travels.filter(
  //   (travel) => travel.origem === origem && travel.destino === destino
  // );

  // let travelsHTML = searchedTravels.map((travel) => {
  //   return `
  //       <div id="travelCard" class="travel-card">
  //         <div class="origin-destiny-content">
  //           <h3 id="Origem">${travel.origem}</h3>
  //           <p> → </p>
  //           <h3 id="Destino">${travel.destino}</h3>
  //         </div>
  //         <div>
  //           <span id="horaChegada">Horário de partida: ${travel.horaPartida}:00</span>
  //           <span id="horaPartida">Horário de chegada: ${travel.horaChegada}:00</span>
  //         </div>
  //         <div>
  //           <button onclick="RedirectToBookingPage()" class="btn-reserve">Clique para saber mais</button>
  //         </div>
  //       </div>
  //     `;
  // });

  // if (travelsHTML.length < 1) {
  //   travelsHTML[0] = `
  //     <div>
  //       <h2>Nenhuma viagem encontrada!</h2>
  //     </div>
  //   `;
  // }

  // let html = travelsHTML.join("");
  // cardBox.innerHTML = htmla;
}

function RedirectToBookingPage() {
  setTimeout(() => {
    window.location.href = `../booking/index.html`;
  });
}

FetchLocalizationsAndLoadInPage();
