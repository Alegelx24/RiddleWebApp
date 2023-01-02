import { Button, Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import API from './API';
import { Table } from "react-bootstrap";


function UserRiddleOpenDetail(props) {

  const { riddleId } = useParams();
  const riddleToShow = props.indovinelli.find((i) => i.id == parseInt(riddleId));
  let isPrimaRisposta = props.risposte.find((i) => i.indovinello == riddleId);
  let timer;

  const [risposte, setRisposte] = useState([]);
  const [riddle, setRiddle] = useState("");
  const [countdown, setCountdown] = useState(isPrimaRisposta==undefined ? riddleToShow.durata : "loading"  );

  const navigate = useNavigate();

  useEffect(() => {// caricamento iniziale dei dati
   
      API.getClosedRiddle(riddleId)
        .then((riddle) => {
          setRiddle(riddle);
        })
        .catch(err => console.log(err))
      API.getResponses(riddleId)
        .then((risposte) => {
          let listaRisposte = [];
          risposte.map((ri) => {
            listaRisposte.push(ri.risposta);
            return ('');
          });
          setRisposte(listaRisposte);
        })
        .catch(err => console.log(err))

  }, []);


  useEffect(() => {//setTimeout per la visualizzazione del countdown

    if (isPrimaRisposta !== undefined) {
      timer = setTimeout(() => {
        calculateTimeLeft();
      }, 1000);
    }

  }, [countdown, isPrimaRisposta]);

  useEffect(() => {
    
    isPrimaRisposta = props.risposte.find((i) => i.indovinello == riddleId);
    API.getResponses(riddleId)
        .then((risposte) => {
          let listaRisposte = [];
          risposte.map((ri) => {
            listaRisposte.push(ri.risposta);
            return('');
          });
          setRisposte(listaRisposte);
        })
        .catch(err => console.log(err))
      
  }, [props.risposte]);


  const calculateTimeLeft = async () => {//calcola il tempo rimanente rispetto alla scadenza dell'indovinello+gestione dello scadere

    let timeLeft = await API.getRiddleScadenza(riddleId);

    let difference = timeLeft.scadenza - Math.floor(Date.now() / 1000);

    let indovinello = props.indovinelli.find((i) => i.id== riddleId) 

    if (difference >= 0) {
      setCountdown(difference);
    }
    if(difference<0 || indovinello.stato=="chiuso" ){
      setCountdown("L'indovinello è chiuso");
      clearTimeout(timer);
    }
  }

  return (
    <>
      <Container>
        <Row>
          <Col md="2"></Col>
        <Col>
            <br></br>
            {<h2>Dettagli del tuo indovinello aperto</h2>}
          </Col>
        </Row>
        <Row>
          <Col md="2">
            <h4>{riddle.testo}</h4>
          </Col>
          <Col md="8">
            <span></span>
            <Table>
              <thead>
                <tr>
                  <th>Risposte date</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {
                  risposte.map((r) => <ResponseData
                    risposta={r} key={r.id} />)
                }
              </tbody>
            </Table>
          </Col>
          <Col md="2">
            <Table>
              <thead>
              <tr>
                <th>Countdown</th>
              </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {countdown}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col md="3"></Col>
          <Col>
            <br></br>
            <Button variant="secondary" onClick={() => { navigate('/'+props.filter) }}>Torna alla home</Button>
          </Col>
          <Col md="3"></Col>
        </Row>
      </Container>
    </>
  );
}

function ResponseData(props) {

  return (
    <tr>
      <td>
        {props.risposta}
      </td>
    </tr>
  );
  
}


export default UserRiddleOpenDetail;