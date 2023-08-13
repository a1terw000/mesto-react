export const default_url = "https://auth.nomoreparties.com"

function checkResponse(res) {
  if(res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка ${res.status}`)
  }
}

export function register(data) {
  return fetch (`${default_url}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(checkResponse)
}


export function login(data) {
  return fetch (`${default_url}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(checkResponse)
}