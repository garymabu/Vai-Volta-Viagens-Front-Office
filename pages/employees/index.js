const homeDomain = 'http://localhost:8080';

await fetchEmployees();

document.querySelector('.post-update-button').onclick = updateEmployee;
document.querySelector('.cancel-update-button').onclick = toggleUpdateContainer;
document.querySelector('.confirm-button').onclick = deleteEmployee;
document.querySelector('.cancel-button').onclick = toggleDeletionConfirmationContainer;
document.querySelector('.submit-employee-info-button').onclick = postFormData;

function fetchFormData(nameInputId, addressInputId, typeInputId) {
  const name = document.getElementById(nameInputId).value;
  const address = document.getElementById(addressInputId).value;
  const type = document.getElementById(typeInputId).value;

  return {
    name,
    address,
    type
  };
}

async function postFormData() {

  const nameInputId = 'name';
  const addressInputId = 'address';
  const typeInputId = 'type';

  const data = fetchFormData(nameInputId, addressInputId, typeInputId);

  if (!data.name || !data.address || !data.type) {
    return alert("Todos os campos devem estar preenchidos!");
  }
  // TODO: Integration with backend
  const result = await fetch(
    `${homeDomain}/v1/employee`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    }
  )

  if (result.status === 200) {
    alert("Registrado com sucesso.");
    location.reload();
  }

}

//Event listeners
async function fetchEmployees() {

  // TODO: Integration with backend
  // const response = await fetch(`${homeDomain}/v1/employee`,
    // {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',
    //   },
    //   body: JSON.stringify(token),
    // });
  // const { data } = result.json();

  const response = { status: 200 };

  // const data = [];

  const data = [
    {
      id: "130tbvg302t8",
      name: "Zeca Gado",
      address: "Rua da Macumba, 123, Rio de Janeiro, RJ",
      type: "Registrador de Modal"
    },
    {
      id: "8230tbvg302t8",
      name: "Mamou Gado",
      address: "Rua da Macumba, 123, Rio de Janeiro, RJ",
      type: "Registrador de Modal"
    },
    {
      id: "bvg302t8dethjk",
      name: "Chupou Gado",
      address: "Rua da Macumba, 123, Rio de Janeiro, RJ",
      type: "Registrador de Modal"
    },
    {
      id: "wejkoprvyh4p",
      name: "Fudeu Gado",
      address: "Rua da Macumba, 123, Rio de Janeiro, RJ",
      type: "Registrador de Modal"
    },
  ];

  if (response.status === 200 && data.length) insertEmployeeCard(data);
  else insertEmptyMessage();

}

function toggleUpdateContainer() { 
  
  const updateContainer = document.getElementById('update');
  
  if (updateContainer.style.display === "none") {
    updateContainer.style.display = "flex";
    const updateButton = document.querySelector(".post-update-button");
    updateButton.dataset.id = this.dataset.id;
  }
  else updateContainer.style.display = "none";
}

function toggleDeletionConfirmationContainer() { 
  const deleteContainer = document.getElementById('delete');
  
  if (deleteContainer.style.display === "none") {
    deleteContainer.style.display = "flex";
    const deleteButton = document.querySelector(".confirm-button");
    deleteButton.dataset.id = this.dataset.id;
  }
  else deleteContainer.style.display = "none";
}

async function updateEmployee() {
  
  const nameInputId = 'update-name';
  const addressInputId = 'update-address';
  const typeInputId = 'update-type';

  const data = fetchFormData(nameInputId, addressInputId, typeInputId);

  data.id = this.dataset.id;


  if (!data.name || !data.address || !data.type) {
    return alert("Todos os campos devem estar preenchidos!");
  }
  // TODO: Integration with backend
  const result = await fetch(
    `${homeDomain}/v1/employee/update`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    }
  )

  if (result.status === 200) {
    alert("Atualiado com sucesso.");
    location.reload();
  }

}

async function deleteEmployee() {
  const data = {
    id: this.dataset.id
  };
  // TODO: Integration with backend
  const result = await fetch(
    `${homeDomain}/v1/employee/update`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    }
  )

  if (result.status === 200) {
    alert("Apagado com sucesso.");
    location.reload();
  }

}

// Card renderers
function insertEmployeeCard(data) {

  const wrapper = document.getElementById('wrapper');
  const employees = data.map((employee, index) => {
    return `
      <div class="card" id="card">
        <div>
          <p id="employee-id"><strong>id:</strong> ${employee.id}</p>
          <p><strong>Nome:</strong> ${employee.name}</p>
          <p><strong>Endereço:</strong> ${employee.address}</p>
          <p><strong>Tipo:</strong> ${employee.type}</p>
        </div>
        <div class="card-button-wrapper">
          <button class="update-button" id="update-${index}" data-id="${employee.id}">
            <img src="../../images/update_icon.png" alt="delete button">
          </button>
          <button class="delete-button" id="delete-${index}" data-id="${employee.id}">
            <img src="../../images/trash_can_icon.png" alt="delete button">
          </button>
        </div>
      </div>
    `
  });

  const html = employees.join('');
  wrapper.insertAdjacentHTML('afterbegin', html);

  const updateButtons = document.querySelectorAll('.update-button');
  const deleteButtons = document.querySelectorAll('.delete-button');
  updateButtons.forEach(element => element.addEventListener('click', toggleUpdateContainer));
  deleteButtons.forEach(element => element.addEventListener('click', toggleDeletionConfirmationContainer));

}

function insertEmptyMessage() {
  const wrapper = document.getElementById('wrapper');

  const html = `
    <div class="card" id="card">
      <p>Sem funcionários cadastrados</p>
    </div>
  `;

  wrapper.insertAdjacentHTML('afterbegin', html);

}