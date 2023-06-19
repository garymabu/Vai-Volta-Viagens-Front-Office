const passengerCountInput = document.getElementById("passenger-count");
const passengerCountInfo = document.getElementById("passenger-count-info");
const modalOverlay = document.querySelector(".modal-overlay");
const modal = document.querySelector(".modal");

const tripIds = JSON.parse(
  decodeURIComponent(window.location.search.split("=")[1])
);

document.getElementById("user").addEventListener("click", function (ev) {
  ev.preventDefault();
});

document
  .getElementById("confirm-passenger-count")
  .addEventListener("click", function () {
    const passengerCount = parseInt(passengerCountInput.value);

    if (passengerCount > 0) {
      openModal();
      createPassengerFields(passengerCount);
      passengerCountInfo.textContent = passengerCount;
    }
  });

document
  .getElementById("passengers-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const passengerAges = Array.from(
      document.querySelectorAll(".passenger-age")
    ).map((input) => Number(input.value));
    if (Math.max(...passengerAges) < 21)
      alert("Não é permitido menores de 21 anos sem acompanhante");
    else {
      closeModal();
      showReservationInfo();
    }
  });

document.querySelector(".modal-overlay").addEventListener("click", function () {
  closeModal();
});

document.querySelector(".close-modal").addEventListener("click", function () {
  closeModal();
});

function createPassengerFields(count) {
  passengerCountInfo.textContent = count;
}

function openModal() {
  modalOverlay.style.visibility = "visible";
  modal.style.visibility = "visible";
}

function closeModal() {
  modalOverlay.style.visibility = "hidden";
  modal.style.visibility = "hidden";
}

function createPassengerFields(count) {
  const container = document.getElementById("passengers-container");
  container.innerHTML = "";

  for (let i = 1; i <= count; i++) {
    const passengerDiv = document.createElement("div");
    passengerDiv.innerHTML = `
      <div>
        <label for="passenger-name-${i}">Nome do Passageiro ${i}:</label>
        <input type="text" id="passenger-name-${i}" name="passenger-name-${i}" class="passenger-name form-input" required>
      </div>
      <div>
        <label for="passenger-age-${i}">Idade do Passageiro ${i}:</label>
        <input type="number" id="passenger-age-${i}" name="passenger-age-${i}" class="passenger-age form-input" required>
      </div>
    `;
    container.appendChild(passengerDiv);
  }
}

async function getTripInfo() {
  const tripResponse = await fetch("http://localhost:8080/v1/trip", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
  const trips = await tripResponse.json();
  const filteredTrips = trips.filter((trip) => tripIds.includes(trip.id));
  return filteredTrips;
}

async function showReservationInfo() {
  const reservationCard = document.getElementById("reservation-card");
  const reservationInfo = document.getElementById("reservation-info");
  const origin = document.getElementById("origin");
  const destination = document.getElementById("destination");
  const duration = document.getElementById("duration");
  const scale = document.getElementById("scale");
  const price = document.getElementById("price");

  const trips = await getTripInfo();
  const [firstTrip] = trips;
  const [lastTrip] = trips.slice(-1);

  // Preencha as informações da viagem com os dados relevantes
  origin.textContent = firstTrip.departureLocalization.cityName;
  destination.textContent = lastTrip.arrivalLocalization.cityName;

  console.log(firstTrip.departureDatetime);
  console.log(lastTrip.arrivalDatetime);

  var timeDiff = Math.abs(
    new Date(lastTrip.arrivalDatetime) - new Date(firstTrip.departureDatetime)
  );

  console.log("timeDiff", timeDiff);

  // Calculate the number of hours between the two dates
  var hoursDiff = Math.ceil(timeDiff / (1000 * 60 * 60));

  duration.textContent = `${hoursDiff} horas`;
  scale.textContent = `${trips.length - 1} escala(s)`;
  price.textContent = "R$ 200";

  reservationCard.style.display = "none";
  reservationInfo.style.display = "block";
}

async function FetchFormAndCreateBooking() {
  const booking = {
    id: String(Math.floor(Math.random() * 65536)),
    numero,
    tempoViagem,
    tipoId,
    codigo,
    escala,
    dataCriacao: new Date(),
    valor,
    origemId,
    destinoId,
    clienteId,
    funcionarioId,
  };

  await fetch(`${homeDomain}/v1/booking/bookingCreate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
}

function RedirectToPaymentPage() {
  setTimeout(() => {
    window.location.href = `../payment/index.html`;
  });
}
