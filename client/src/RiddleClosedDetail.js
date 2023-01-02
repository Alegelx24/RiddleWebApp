import { Button, Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import API from './API';
import { Table } from "react-bootstrap";


function RiddleClosedDetail(props) {

  const { riddleId } = useParams();

  const [risposte, setRisposte] = useState([]);
  const [riddle, setRiddle] = useState("");
  const [dirty, setDirty] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {//login user
      API.getClosedRiddle(riddleId)
        .then((riddle) => {
          setRiddle(riddle);
        })
        .catch(err => console.log(err))

      API.getResponses(riddleId)
        .then((risposte) => {
          let listaRisposte = [];
          risposte.map((ri) => {
            const risposta = { id: ri.id, risposta: ri.risposta };
            listaRisposte.push(risposta);
            return ('');
          });
          setRisposte(listaRisposte);
          setDirty(true);
        })
        .catch(err => console.log(err))

  }, []);



  useEffect(() => {//dirty effect
    if (dirty) {
      API.getClosedRiddle(riddleId)
        .then((riddle) => {
          setRiddle(riddle);
          setDirty(true);
        })
        .catch(err => console.log(err))

      API.getResponses(riddleId)
        .then((risposte) => {
          let listaRisposte = [];
          risposte.map((ri) => {
            const risposta = { id: ri.id, risposta: ri.risposta };
            listaRisposte.push(risposta);
            return ('');
          });
          setRisposte(listaRisposte);
          setDirty(true);
        })
        .catch(err => console.log(err))
    }
  }, [dirty])


  return (
    <>
      <Container>
        <Row>
          <Col md="2"></Col>
          <Col>
          <br></br>
            {<h2>Dettagli indovinello chiuso</h2>}
          </Col>
        </Row>
        <Row>
          <Col md="2"></Col>
          <Col md="8">
            <Table>
              <thead>
                <tr>
                  <th>Testo</th>
                  <th>Risposta Corretta</th>
                  <th> Vincitore</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {riddle.testo}
                  </td>
                  <td>
                    {riddle.risposta}
                  </td>
                  <td >
                    {riddle.vincitore}
                  </td>
                </tr>
              </tbody>
            </Table>
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
        </Row>
        <Row>
          <Col md="3"></Col>
          <Col>
            <br></br>
            <Button variant="secondary" onClick={() => { props.filter == ("All") ? navigate("/All") : navigate('/MyRiddles') }}>Torna alla home</Button>
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
        {props.risposta.risposta}
      </td>
    </tr>
  );
}

export default RiddleClosedDetail;