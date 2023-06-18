const bookings = [
    {
        id: 1,
        origem: 'Rio de Janeiro',
        destino: 'São Paulo',
        duracao: 3,
        status: false
    },
    {
        id: 2,
        origem: 'Rio de Janeiro',
        destino: 'São Paulo',
        duracao: 3,
        status: true
    },
    {
        id: 3,
        origem: 'Rio de Janeiro',
        destino: 'São Paulo',
        duracao: 3,
        status: true
    }
]

async function FetchBookingsAndList(bookings){
    const cardContainer = document.querySelector('.cards-container')
    // const result = await fetch(`${homeDomain}/v1/auth`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Accept': 'application/json',
    //     },
    //     body: JSON.stringify(loginForm),
    // })

    const bookingsHTML = bookings.map((booking, index) => {
        return `
        <div class="card">
            <div class="card-header">Viagem ${index + 1} </div>
            <div class="card-info">
                <p>Origem: ${booking.origem}</p>
                <p>Destino: ${booking.destino}</p>
                <p>Duração: ${booking.duracao} horas</p>
                <p>Status: ${booking.status === true ? 'Confirmado' : 'Reservado'}</p>
            </div>
            <div class="card-buttons">
                <button onclick="CancelBooking()" class="delete-button">Cancelar Viagem</button>
            </div>
        </div>
        `
    })

    cardContainer.innerHTML = bookingsHTML
}

FetchBookingsAndList(bookings)

async function DeleteBooking(id){
    // const result = await fetch(`${homeDomain}/v1/booking/delete`, {
    //     method: 'DELETE',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Accept': 'application/json',
    //     },
    //     body: JSON.stringify(loginForm),
    // })
    

}

