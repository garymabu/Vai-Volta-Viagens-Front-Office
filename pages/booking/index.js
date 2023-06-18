const passengerCountInput = document.getElementById('passenger-count');
const passengerCountInfo = document.getElementById('passenger-count-info')
const modalOverlay = document.querySelector('.modal-overlay');
const modal = document.querySelector('.modal');

document.getElementById('confirm-passenger-count').addEventListener('click', function() {
  const passengerCount = parseInt(passengerCountInput.value);

  if (passengerCount > 0) {
    openModal();
    createPassengerFields(passengerCount);
    passengerCountInfo.textContent = passengerCount
  }
});

document.getElementById('passengers-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Aqui você pode processar os dados do formulário

  closeModal();
  showReservationInfo();
});

document.querySelector('.close-modal').addEventListener('click', function() {
  closeModal();
});

function createPassengerFields(count) {
  passengerCountInfo.textContent = count;
}


function openModal() {
  modalOverlay.style.visibility = 'visible';
  modal.style.visibility = 'visible';
}

function closeModal() {
  modalOverlay.style.visibility = 'hidden';
  modal.style.visibility = 'hidden';
}

function createPassengerFields(count) {
  const container = document.getElementById('passengers-container');
  container.innerHTML = '';

  for (let i = 1; i <= count; i++) {
    const passengerDiv = document.createElement('div');
    passengerDiv.innerHTML = `
      <div>
        <label for="passenger-name-${i}">Nome do Passageiro ${i}:</label>
        <input type="text" id="passenger-name-${i}" name="passenger-name-${i}" class="form-input" required>
      </div>
      <div>
        <label for="passenger-age-${i}">Idade do Passageiro ${i}:</label>
        <input type="number" id="passenger-age-${i}" name="passenger-age-${i}" class="form-input" required>
      </div>
    `;
    container.appendChild(passengerDiv);
  }
}

function showReservationInfo() {
  const reservationCard = document.getElementById('reservation-card');
  const reservationInfo = document.getElementById('reservation-info');
  const origin = document.getElementById('origin');
  const destination = document.getElementById('destination');
  const duration = document.getElementById('duration');
  const scale = document.getElementById('scale');
  const price = document.getElementById('price');

  // Preencha as informações da viagem com os dados relevantes
  origin.textContent = 'São Paulo';
  destination.textContent = 'Rio de Janeiro';
  duration.textContent = '3 horas';
  scale.textContent = '1 escala';
  price.textContent = 'R$ 200';

  reservationCard.style.display = 'none';
  reservationInfo.style.display = 'block';
}




async function FetchFormAndCreateBooking(){

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
    funcionarioId
  }


  await fetch(`${homeDomain}/v1/booking/bookingCreate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(data),
  })
}


function RedirectToPaymentPage() {
  setTimeout(() => {
    window.location.href = `../payment/index.html`;
  })
}