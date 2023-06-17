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


  await fetch(`${homeDomain}/v1/booking/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(data),
  })
}