const homeDomain = 'http://localhost:8080';

function fetchFormData() {
  const name = document.getElementById("Nome").value;
  const address = document.getElementById("Endereco").value;
  const type = document.getElementById("Tipo").value;

  return {
    name,
    address,
    type
  };
}

async function postFormData() {

  const data = fetchFormData();

  if (!data.name || !data.address || !data.type) return alert("Todos os campos devem estar preenchidos!");

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

  if(result.status === 200) alert("Registrado com sucesso.")

}

async function fetchEmployees() {

  // const response = await fetch(`${homeDomain}/v1/employee`);
  // const data = result.json();
  
  // if (response.status === 200) {
  //   insertEmployeesInfo(data)
  // }

  const mock = [
    {
      id: "10fnvjw0t8230tbvg302t8",
      name: "Zeca Gado",
      address: "Rua da Macumba, 123, Rio de Janeiro, RJ",
      type: "Registrador de Modal"
    },
    {
      id: "10fnvjw0t8230tbvg302t8",
      name: "Mamou Gado",
      address: "Rua da Macumba, 123, Rio de Janeiro, RJ",
      type: "Registrador de Modal"
    },
    {
      id: "10fnvjw0t8230tbvg302t8",
      name: "Chupou Gado",
      address: "Rua da Macumba, 123, Rio de Janeiro, RJ",
      type: "Registrador de Modal"
    },
    {
      id: "10fnvjw0t8230tbvg302t8",
      name: "Fudeu Gado",
      address: "Rua da Macumba, 123, Rio de Janeiro, RJ",
      type: "Registrador de Modal"
    },
  ]
  console.log(mock);

  insertEmployeesInfo(mock);

}

function insertEmployeesInfo(data) {
  const wrapper = document.getElementById('wrapper');
  const employees = data.map((employee) => {
    return `
      <div class="card" id="card">
        <p><strong>id:</strong> ${employee.id}</p>
        <p><strong>Nome:</strong> ${employee.name}</p>
        <p><strong>Endereço:</strong> ${employee.address}</p>
        <p><strong>Tipo:</strong> ${employee.type}</p>
      </div>
    `
  });
  
  let html = employees.join('');
  wrapper.insertAdjacentHTML('afterbegin', html);
  
}
await fetchEmployees();

function insertEmptyMessage() {
  
}