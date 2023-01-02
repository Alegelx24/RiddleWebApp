import { Form, Alert, Button, Container, Row, Col, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import API from './API';

function RiddleOpenDetail(props) {

  const { riddleId } = useParams();

  const riddleToShow = props.indovinelli.find((i) => i.id == parseInt(riddleId));
  let primaRisposta = props.risposte.find((i) => i.indovinello == riddleId);


  const [testo, setTesto] = useState(riddleToShow ? riddleToShow.testo : "");
  const [risposta, setRisposta] = useState("");
  const [errorMsg, setErrorMsg] = useState(""); // stringa vuota '' = non c'e' errore
  const [countdown, setCountdown] = useState(primaRisposta == undefined ? riddleToShow.durata : "loading");
  const [suggerimento1, setSuggerimento1] = useState("Disponibile tra " + (countdown == " " ? " " : countdown-Math.round(riddleToShow.durata/2)) + " s");
  const [suggerimento2, setSuggerimento2] = useState("Disponibile tra " + (countdown == " " ? " " : countdown-Math.round(riddleToShow.durata/4)) + " s");
  const [isDisabled, setIsDisable] = useState(false);
  const [altraRisposta, setAltraRisposta] = useState(false);


  const navigate = useNavigate();
  let timer;


  useEffect(() => { //carica il testo dell'indovinello
    API.getRiddleText(riddleId)
      .then((riddle) => {
        const indovinello = [riddle.testo];
        setTesto(indovinello);
      })
      .catch(err => console.log(err))

}, []);


  useEffect(() => { //fa partire il countdown se è attivo

    if (primaRisposta !== undefined || altraRisposta == true) {

      timer = setTimeout(() => {
        calculateTimeLeft();
      }, 1000);
    }
  }, [countdown, altraRisposta]);

  useEffect(() => {

    primaRisposta = props.risposte.find((i) => i.indovinello == riddleId);

    if (primaRisposta !== undefined) {
      setAltraRisposta(true);
    }
  }, [props.risposte]);


  const calculateTimeLeft = async () => {

    let timeLeft = await API.getRiddleScadenza(riddleId);

    let difference = timeLeft.scadenza - Math.floor(Date.now() / 1000);

    if (difference >= 0) {

      setCountdown(difference);
      let half = (riddleToShow.durata) / 2;
      let quarter = (riddleToShow.durata) / 4;

      if (difference < (half)) {
        changeSugg1();
      }
      else {
        setSuggerimento1("Disponibile tra " + (countdown==" " ? (Math.floor(riddleToShow.durata/2) - 1) : ( countdown=="loading" ? (" "):( countdown-Math.floor(riddleToShow.durata/2) - 1)) )  + " s")
      }
      if (difference < (quarter)) {
        changeSugg2();
      }
      else {
        setSuggerimento2("Disponibile tra " + (countdown==" " ? (Math.floor(riddleToShow.durata/4) - 1) : ( countdown=="loading" ? (" "):( countdown-Math.floor(riddleToShow.durata/4) - 1)) )  + " s")
      }
    }
    if (difference < 0) {
      clearTimeout(timer);
      API.updateRiddleState(riddleId, "chiuso");
      setErrorMsg("L'indovinello è chiuso");
      setIsDisable(true);
    }
  }

  async function changeSugg1() {
    let sugg1 = await API.getSuggerimento1(riddleId);
    setSuggerimento1(sugg1.suggerimento1)
  }

  async function changeSugg2() {
    let sugg2 = await API.getSuggerimento2(riddleId);
    setSuggerimento2(sugg2.suggerimento2)
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    // validation
    let isValid = true;
    const errorMessages = [];

    if (risposta === "") {
      isValid = false;
      errorMessages.push("Empty response");
    }

    if (isValid) {

      let alreadyResponded = false;

      for (let r of props.risposte) {

        if (r.userId == props.user.id && r.indovinello == riddleId) {
          alreadyResponded = true;
        }

      }

      if (alreadyResponded) {
        setErrorMsg("Hai già risposto!")
        setIsDisable(true);
      } else {

        const response = { testo: risposta, indovinello: riddleId, userId: props.user.id }

        setIsDisable(true)

        let rispostaEsatta = await props.getRispostaEsatta(riddleId);
        if (rispostaEsatta == risposta) {
          let pointsToAdd;

          setErrorMsg("Risposta esatta!");

          if (riddleToShow.difficolta == "facile") {
            pointsToAdd = 1;
          }
          else if (riddleToShow.difficolta == "medio") {
            pointsToAdd = 2;
          } else if (riddleToShow.difficolta == "facile") {
            pointsToAdd = 3;
          }
          await API.updateUserPoints(props.user.id, pointsToAdd)
          await API.updateRiddleState(riddleId, "chiuso");
          await API.addVincitore(riddleId, props.user.name);
          clearTimeout(timer);
        }
        else {

          setErrorMsg("Risposta sbagliata");

          if (primaRisposta == undefined) {
            let scadenza = Math.floor(Date.now() / 1000) + riddleToShow.durata;
            await API.addScadenza(scadenza, riddleId);
            primaRisposta = 1;
            setCountdown(riddleToShow.durata);
          }
        }
        props.addRisposta(response);
      }
    }
    else {
      setErrorMsg(errorMessages.join(" | "));
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col md="3"></Col>
          <Col>
          <br></br>
            {<h3>Inserisci la tua risposta</h3>}
          </Col>
        </Row>
        <Row>
          <Col md="3">
            <h4>{testo}</h4>
          </Col>
          <Col>
            {errorMsg ? (
              errorMsg == "Risposta esatta!" ? (
                <Alert
                  variant="success"
                  onClose={() => setErrorMsg("")}
                  dismissible
                >
                  {errorMsg}
                </Alert>)
                : (
                  <Alert
                    variant="danger"
                    onClose={() => setErrorMsg("")}
                    dismissible
                  >
                    {errorMsg}
                  </Alert>)
            ) : (
              false
            )}

            <Form>
              <Form.Group>
                <Form.Label></Form.Label>
                <Form.Control
                  disabled={isDisabled}
                  value={risposta}
                  onChange={(ev) => setRisposta(ev.target.value)}
                  style={{ backgroundColor: errorMsg.includes("Empty title") || errorMsg.includes("Invalid Id") ? '#f4cdd1' : 'transparent', }}
                ></Form.Control>
              </Form.Group>
              <br></br>
              <Button disabled={isDisabled}
                onClick={(event) => { handleSubmit(event) }}>Invia la risposta</Button>
            </Form>
            <br></br>
            <Button variant="secondary" onClick={() => { props.changeFilter("All"); navigate('/All') }}>Torna alla home</Button>
          </Col>
          <Col md="3">
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
            <Table>
              <thead>
                <tr>
                  <th>Suggerimento n.1</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {suggerimento1}
                  </td>
                </tr>
              </tbody>
            </Table>
            <Table>
              <thead>
                <tr>
                  <th>Suggerimento n.2</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {suggerimento2}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default RiddleOpenDetail;