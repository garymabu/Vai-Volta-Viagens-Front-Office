document.addEventListener('submit', function(event){
    const nameInput = document.getElementById("name")
    const cardNumberInput = document.getElementById("cardNumber")
    const expiryDateInput = document.getElementById("expiryDate")
    const cvvInput = document.getElementById("cvv")

    if(nameInput.value.length < 3){
      alert("Por favor, insira um nome válido no cartão.");
      nameInput.focus()
      event.preventDefault()
      return;
    }

    if (cardNumberInput.value.length !== 16 || isNaN(cardNumberInput.value)) {
      alert("Por favor, insira um número de cartão válido (16 dígitos numéricos).");
      cardNumberInput.focus();
      event.preventDefault();
      return;
    }

    const expiryDatePattern = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;
    if (!expiryDatePattern.test(expiryDateInput.value)) {
      alert("Por favor, insira uma data de expiração válida (no formato MM/AA).");
      expiryDateInput.focus();
      event.preventDefault();
      return;
    }

    if (cvvInput.value.length !== 3 || isNaN(cvvInput.value)) {
      alert("Por favor, insira um CVV válido (3 dígitos numéricos).");
      cvvInput.focus();
      event.preventDefault();
      return;
    }
})