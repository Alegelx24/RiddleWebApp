import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Indovinello, ListaIndovinelli } from './lista_indovinelli.js';
import { AnonimousContent } from './AnonimousContent';
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import API from './API';
import { LoginForm } from './LoginComponents';
import MyNavbar from './MyNavBar.js';
import AnonimousNavBar from './AnonimousNavbar';
import RiddleForm from "./RiddleForm";
import RiddleOpenDetail from "./RiddleOpenDetail";
import RiddleClosedDetail from "./RiddleClosedDetail";
import RiddleContent from './RiddleContent';
import UserRiddleOpenDetail from './UserRiddleOpenDetail';


function App() {
  return (
    <Router>
      <App2 />
    </Router>
  )
}

function App2() {

  //let url = window.location.href;
  //let currfilter = url.split("/")[3];

  const [indovinelli, setIndovinelli] = useState([]);
  const [risposte, setRisposte] = useState([]);
  const [indovinelliAnonimous, setIndovinelliAnonimous] = useState([]);
  const [classifica, setClassifica] = useState([]);
  const [dirty, setDirty] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);  // no user is logged in when app loads
  const [user, setUser] = useState({});
  const [message, setMessage] = useState('');
  const [loggedAnonimous, setLoggedAnonimous] = useState(false);  // no user is logged in when app loads
  const [filter, setFilter] = useState("All");
  const [timerId, setTimerId] = useState(""); //id del timer per il polling


  const navigate = useNavigate();


  useEffect(() => {
    const checkAuth = async () => {
      try {
        // here you have the user info, if already logged in
        // TODO: store them somewhere and use them, if needed
        const user = await API.getUserInfo();
        if (!loggedIn)
          setLoggedIn(true);
        setUser(user);
      } catch (err) {
        handleError(err);
      }
    };
    checkAuth();
  }, [loggedIn]);


  useEffect(() => {//anonimous login, caricamento delle info necessario in caso di login
    if (loggedAnonimous) {
      API.getAllAnonimousRiddles()
        .then((riddles) => {
          let lista_indovinelli = new ListaIndovinelli();
          riddles.map((ri) =>  {
            const riddle = new Indovinello(ri.id, ri.testo, null, null, null, null, ri.stato, ri.difficolta, null, null);
            lista_indovinelli.addNewIndovinello(riddle);
            return ('');
          });
          setIndovinelliAnonimous(lista_indovinelli.list);
        })
        .catch(err => console.log(err))
    }
    if (loggedAnonimous) {
      API.getClassification()
        .then((users) => {
          setClassifica(users);
        })
        .catch(err => console.log(err))
    }
  }, [loggedAnonimous])


  useEffect(() => {//login user, caricamento delle info iniziali, setDirty posto a true, startTimer posto a true

    if (loggedIn) {
      API.getAllRiddles()
        .then((riddles) => {
          let lista_indovinelli = new ListaIndovinelli();
          riddles.map((ri) => {
            const riddle = new Indovinello(ri.id, ri.testo, ri.durata, null, null, null, ri.stato, ri.difficolta, ri.user, ri.scadenza);
            lista_indovinelli.addNewIndovinello(riddle);
            return ('');
          });
          setIndovinelli(lista_indovinelli.list);
        })
        .catch(err => console.log(err))

      API.getAllResponses()
        .then((responses) => {
          let listaRisposte = [];
          responses.map((ri) => {
            const response = { id: ri.id, risposta: ri.risposta, indovinello: ri.indovinello };
            listaRisposte.push(response);
            return ('');
          });
          setRisposte(responses);
        })
        .catch(err => console.log(err))

      API.getClassification()
        .then((users) => {
          setClassifica(users);
        })
        .catch(err => console.log(err))
      startStopTimer(true);
      setDirty(true);
    }
  }, [loggedIn]);


  useEffect(() => {//dirty effect, ricaricamento delle info, set di un nuovo timeout
    if (dirty) {

      API.getAllRiddles()
        .then((riddles) => {
          let lista_indovinelli = new ListaIndovinelli();
          riddles.map((ri) => {
            if (ri.scadenza != null && ri.stato == "aperto") {
              if (ri.scadenza < Math.floor(Date.now() / 1000)) {
                ri.stato = "chiuso";
                updateRiddleStato(ri.id, "chiuso")
              }
            }
            const riddle = new Indovinello(ri.id, ri.testo, ri.durata, null, null, null, ri.stato, ri.difficolta, ri.user, ri.scadenza);
            lista_indovinelli.addNewIndovinello(riddle);
            return ('');
          })
          setIndovinelli(lista_indovinelli.list);
          setInitialLoading(false);
        })
        .catch(err => console.log(err))

      API.getAllResponses()
        .then((responses) => {
          let listaRisposte = [];
          responses.map((ri) => {
            const response = { id: ri.id, risposta: ri.risposta, indovinello: ri.indovinello };
            listaRisposte.push(response);
            return ('');
          });
          setRisposte(responses);
        })
        .catch(err => console.log(err))

      API.getClassification()
        .then((users) => {
          setClassifica(users);
        })
        .catch(err => console.log(err))

      startStopTimer(true);
      setDirty(false);
    }
  }, [dirty])


  function handleError(err) {
    console.log(err);
  }

  function changeFilter(f) {
    setFilter(f);
  }

  function startStopTimer(t) {
    if (t)
      setTimerId(setTimeout(() => setDirty(true), 1000))
    else
      clearTimeout(timerId);
  }


  function addRiddle(riddle) {
    setIndovinelli((oldIndovinelli) => [...oldIndovinelli, riddle]);
    API.addRiddle(riddle)
      .catch(err => handleError(err));
  }


  function addRisposta(risposta) {
    setRisposte((oldRisposte) => [...oldRisposte, risposta]);
    API.addRisposta(risposta)
      .catch(err => handleError(err));
  }

  async function getRispostaEsatta(riddleId) {
    const rispostaEsatta = await API.getRispostaEsatta(riddleId).catch(err => handleError(err));
    return rispostaEsatta.risposta;
  }

  async function updateRiddleStato(riddleId, stato) {
    const result = await API.updateRiddleState(riddleId, stato).catch(err => handleError(err));
    return result;
  }

  //LOGIN FUNCTIONS
  const doLogIn = (credentials) => {
    API.logIn(credentials)
      .then(usercred => {
        setUser(usercred);
        setLoggedIn(true);
        setMessage('');
        navigate('/');
      }
      )
      .catch(err => {
        setMessage('err');
      })
  }

  const doLogOut = async () => {
    await API.logOut();
    setLoggedIn(false);
    setUser({});
    setIndovinelli([]);
    startStopTimer(false);
    setTimeout(() => setDirty(false))
    navigate('/login');
  }

  const doAnonimousLogIn = () => {
    setLoggedAnonimous(true);
    setMessage('');
    navigate('/anonimous');
  }

  const doAnonimousLogOut = async () => {
    setLoggedAnonimous(false);
    setUser({});
    setIndovinelliAnonimous([]);
    navigate('/login');
  }

  function Loading(props) {
    return (
      <h2>Loading data ...</h2>
    )
  }

  return (
    <>
      {loggedIn ? <MyNavbar user={user} loggedIn={loggedIn} doLogOut={doLogOut} /> : false}
      {loggedAnonimous ? <AnonimousNavBar loggedAnonimous={loggedAnonimous} doLogOut={doAnonimousLogOut} /> : false}
      <Routes>
        <Route path="/" element={loggedIn ? <Navigate to="/All" /> : <Navigate to='/login' />} />
        <Route path='/login' element={loggedIn ? <Navigate to='/' /> : <LoginForm login={doLogIn} message={message} loggedIn={loggedIn} loggedAnonimous={loggedAnonimous} loginAnonimous={doAnonimousLogIn} />} />
        <Route path="/All" element={initialLoading ? <Loading /> : <RiddleContent changeFilter={changeFilter} filter={filter} indovinelli={indovinelli} classifica={classifica} user={user}></RiddleContent>} />
        <Route path="/MyRiddles" element={initialLoading ? <Loading /> : <RiddleContent changeFilter={changeFilter} filter={filter} user={user} indovinelli={indovinelli.filter((riddle) => riddle.user == user.id)} classifica={classifica}></RiddleContent>} />
        <Route path="/Anonimous" element={<AnonimousContent indovinelli={indovinelliAnonimous} classifica={classifica} ></AnonimousContent>} />
        <Route path="/Add" element={<RiddleForm filter={filter} indovinelli={indovinelli} addRiddle={addRiddle}></RiddleForm>} />
        <Route path="/DetailsOpen/:riddleId" element={<RiddleOpenDetail changeFilter={changeFilter} indovinelli={indovinelli} risposte={risposte} user={user} addRiddle={addRiddle} addRisposta={addRisposta} getRispostaEsatta={getRispostaEsatta}></RiddleOpenDetail>} />
        <Route path="/DetailsClosed/:riddleId" element={<RiddleClosedDetail changeFilter={changeFilter} filter={filter} indovinelli={indovinelli} user={user} risposte={risposte} addRiddle={addRiddle}></RiddleClosedDetail>} />
        <Route path="/userDetailsOpen/:riddleId" element={<UserRiddleOpenDetail changeFilter={changeFilter} indovinelli={indovinelli} risposte={risposte} user={user} filter={filter} addRiddle={addRiddle} ></UserRiddleOpenDetail>} />
      </Routes>
    </>
  );
}


export default App;
