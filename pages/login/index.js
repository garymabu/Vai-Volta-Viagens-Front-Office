const homeDomain = 'http://localhost:8080';

function FetchFormData() {
  const nome = document.querySelector('#Nome').value;
  const idade = Number(document.querySelector('#Idade').value);
  const username = document.querySelector('#Username').value;
  const senha = document.querySelector('#Senha').value;
  const confirmSenha = document.querySelector('#ConfirmSenha').value;
  const cpf = document.querySelector('#CPF').value;
  const prof = document.querySelector('#Prof').value;
  const tel = document.querySelector('#Tel').value;
  return {
    name: nome,
    age: idade,
    login:username,
    password:senha,
    confirmSenha,
    cpf,
    profession: prof,
    tell: tel
  };
}

async function FetchAndPostFormData() {
  const {
    password,
    confirmSenha,
    ...formData
  } = FetchFormData();
  if(password !== confirmSenha)
    alert('Senhas não coincidem');
  else {
    const data = {
      ...formData,
      password
    };

    const result = await fetch(`${homeDomain}/v1/client`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if(result.status === 200)
    {
      FetchLoginAndRedirect({login: data.login, password: data.password});
    }
    else
      alert('Erro ao Cadastrar! Por favor verifique seus dados e tente novamente.')
  }
}

async function FetchLoginAndRedirect(loginForm) {
  const result = await fetch(`${homeDomain}/v1/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(loginForm),
  })
  if(result.status === 200)
  {
    const token = (await result.json()).token;
    sessionStorage.setItem('token', token);
    RedirectToUserHome()
  }
  else
    alert('Erro ao logar! Por favor verifique seus dados e tente novamente.')
}

async function FetchLoginAndPostLoginData() {
  const login = document.querySelector('#Login').value;
  const password = document.querySelector('#SenhaLogin').value;

  const loginForm = {
    login,
    password,
  };

  FetchLoginAndRedirect(loginForm);
}

function RedirectToUserHome() {
  setTimeout(() => {
    window.location.href = `../user_home/index.html`;
  })
}