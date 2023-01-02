
/**
 * All the API calls
 */
const APIURL = new URL('http://localhost:3001/api/'); 

async function getAllRiddles() {
  // call: GET /api/riddles
  const response = await fetch(new URL('riddles' , APIURL), {credentials: 'include'});
  const riddlesJSON = await response.json();
  if (response.ok) {
    return riddlesJSON;
  } else {
    throw riddlesJSON; 
  }
}

async function getAllAnonimousRiddles() {
  // call: GET /api/anonimousRiddles
  const response = await fetch(new URL('anonimousRiddles', APIURL));
  const riddlesJson = await response.json();
  if (response.ok) {
    return riddlesJson.map((ri) => ({id: ri.id, testo: ri.testo, difficolta: ri.difficolta, stato: ri.stato }));
  } else {
    throw riddlesJson;  // an object with the error coming from the server
  }
}

async function getClosedRiddle(riddleId) {
  // call: GET /api/closedRiddle/riddleId
  const response = await fetch(new URL('closedRiddle/' + riddleId, APIURL), {credentials: 'include'});
  const riddleJSON = await response.json();
  if (response.ok) {
    return riddleJSON;
  } else {
    throw riddleJSON;  // an object with the error coming from the server
  }
}

async function getResponses(riddleId) {
  // call: GET  /api/responses/riddleId
  const response = await fetch(new URL('responses/' + riddleId, APIURL), {credentials: 'include'});
  const responsesJSON = await response.json();
  if (response.ok) {
    return responsesJSON;
  } else {
    throw responsesJSON;  // mi aspetto che sia un oggetto json fornito dal server che contiene l'errore
  }
}

async function getAllResponses() {
  //call: GET  /api/responses/riddleId
  const response = await fetch(new URL('responses/', APIURL), {credentials: 'include'});
  const responsesJSON = await response.json();
  if (response.ok) {
    return responsesJSON;
  } else {
    throw responsesJSON;  // mi aspetto che sia un oggetto json fornito dal server che contiene l'errore
  }
}

async function getRiddleText(riddleId) {
  //call: GET  /api/riddleText/riddleId
  const response = await fetch(new URL('riddleText/' + riddleId, APIURL), {credentials: 'include'});
  const responsesJSON = await response.json();
  if (response.ok) {
    return responsesJSON;
  } else {
    throw responsesJSON;  // mi aspetto che sia un oggetto json fornito dal server che contiene l'errore
  }
}

async function getRiddleScadenza(riddleId) {
  //call: GET  /api/riddleText/riddleId
  const response = await fetch(new URL('riddleScadenza/' + riddleId, APIURL), {credentials: 'include'});
  const responsesJSON = await response.json();
  if (response.ok) {
    return responsesJSON;
  } else {
    throw responsesJSON;  // mi aspetto che sia un oggetto json fornito dal server che contiene l'errore
  }
}

async function getRispostaEsatta(riddleId) {
  //call: GET  /api/riddleText/riddleId
  const response = await fetch(new URL('riddleResponse/' + riddleId, APIURL), {credentials: 'include'});
  const responsesJSON = await response.json();
  if (response.ok) {
    return responsesJSON;
  } else {
    throw responsesJSON;  // mi aspetto che sia un oggetto json fornito dal server che contiene l'errore
  }
}

async function getSuggerimento1(riddleId) {
  //call: GET  /api/riddleSugg1/riddleId
  const response = await fetch(new URL('riddleSugg1/' + riddleId, APIURL), {credentials: 'include'});
  const responsesJSON = await response.json();
  if (response.ok) {
    return responsesJSON;
  } else {
    throw responsesJSON;  // mi aspetto che sia un oggetto json fornito dal server che contiene l'errore
  }
}

async function getSuggerimento2(riddleId) {
  //call: GET  /api/riddleSugg2/riddleId
  const response = await fetch(new URL('riddleSugg2/' + riddleId, APIURL), {credentials: 'include'});
  const responsesJSON = await response.json();
  if (response.ok) {
    return responsesJSON;
  } else {
    throw responsesJSON;  // mi aspetto che sia un oggetto json fornito dal server che contiene l'errore
  }
}


function addRiddle(riddle) {
  //call: POST /api/riddle
  return new Promise((resolve, reject) => {
    fetch(new URL('riddle', APIURL), {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ testo: riddle.testo, durata: riddle.durata, risposta: riddle.risposta, suggerimento1: riddle.suggerimento1, suggerimento2: riddle.suggerimento2, stato: riddle.stato, difficolta: riddle.difficolta })
    }).then((response) => {
      if (response.ok) {
        resolve(null);
      } else {
        // analyze the cause of error
        response.json()
          .then((message) => { reject(message); }) // error message in the response body
          .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
      }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
  });
}

function addRisposta(risposta) {
  //call: POST /api/response
  return new Promise((resolve, reject) => {
    fetch(new URL('response', APIURL), {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ testo: risposta.testo, indovinello : risposta.indovinello, userId : risposta.userId })
    }).then((response) => {
      if (response.ok) {
        resolve(null);
      } else {
        // analyze the cause of error
        response.json()
          .then((message) => { reject(message); }) // error message in the response body
          .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
      }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
  });
}

async function updateUserPoints(userId, pointsToAdd ) {
    //call: PUT /api/userPoints/:userId
  return new Promise((resolve, reject) => {
    fetch(new URL('userPoints/' + userId, APIURL), {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: userId, pointsToAdd : pointsToAdd })
    }).then((response) => {
      if (response.ok) {
        resolve(null);
      } else {
        // analyze the cause of error
        response.json()
          .then((message) => { reject(message); }) // error message in the response body
          .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
      }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
  });
}

async function updateRiddleState(riddleId, state ) {
      //call: PUT /api/riddleState/:riddleId
  return new Promise((resolve, reject) => {
    fetch(new URL('riddleState/' + riddleId, APIURL), {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: riddleId, stato : state })
    }).then((response) => {
      if (response.ok) {
        resolve(null);
      } else {
        // analyze the cause of error
        response.json()
          .then((message) => { reject(message); }) // error message in the response body
          .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
      }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
  });
}

async function addScadenza(scadenza, riddleId ) {
      //call: PUT /api/riddleScadenza/:riddleId
  return new Promise((resolve, reject) => {
    fetch(new URL('riddleScadenza/' + riddleId, APIURL), {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: riddleId, scadenza : scadenza })
    }).then((response) => {
      if (response.ok) {
        resolve(null);
      } else {
        // analyze the cause of error
        response.json()
          .then((message) => { reject(message); }) // error message in the response body
          .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
      }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
  });
}

async function addVincitore( riddleId, vincitore ) {
      //call: POST /api/riddleVincitore/:riddleId
  return new Promise((resolve, reject) => {
    fetch(new URL('riddleVincitore/' + riddleId, APIURL), {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: riddleId, vincitore : vincitore })
    }).then((response) => {
      if (response.ok) {
        resolve(null);
      } else {
        // analyze the cause of error
        response.json()
          .then((message) => { reject(message); }) // error message in the response body
          .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
      }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
  });
}

async function getClassification() {
  //call: GET /api/classification
  const response = await fetch(APIURL+'classification');
  const usersJSON = await response.json();
  if (response.ok) {
    return usersJSON;
  } else {
    throw usersJSON;  // mi aspetto che sia un oggetto json fornito dal server che contiene l'errore
  }
}


async function logIn(credentials) {
  let response = await fetch(new URL('sessions', APIURL), {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  if (response.ok) {
    const user = await response.json();
    return user;
  } else {
    const errDetail = await response.json();
    throw errDetail.message;
  }
}

async function logOut() {
  await fetch(new URL('sessions/current', APIURL), { method: 'DELETE', credentials: 'include' });
}

async function getUserInfo() {
  const response = await fetch(new URL('sessions/current', APIURL), {credentials: 'include'});
  const userInfo = await response.json();
  if (response.ok) {
    return userInfo;
  } else {
    throw userInfo;  // an object with the error coming from the server
  }
}
 const API = { addRiddle,addRisposta, getAllRiddles,getAllAnonimousRiddles, getClosedRiddle, getResponses, getAllResponses,getRiddleText, getRispostaEsatta, getClassification,updateUserPoints, updateRiddleState,addScadenza,addVincitore, getRiddleScadenza,getSuggerimento1,getSuggerimento2, logIn, logOut, getUserInfo};


 export default API;