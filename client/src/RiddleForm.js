import { Form, Alert, Button, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Indovinello } from "./lista_indovinelli.js";

function RiddleForm(props) {

    const { riddleId } = useParams();
    const riddleToShow = props.indovinelli.find((i) => i.id == parseInt(riddleId));

    const [id, setId] = useState(riddleToShow ? riddleToShow.id : -1);
    const [testo, setTesto] = useState(riddleToShow ? riddleToShow.testo : "");
    const [durata, setDurata] = useState(30);
    const [risposta, setRisposta] = useState(riddleToShow ? riddleToShow.risposta : "");
    const [suggerimento1, setSuggerimento1] = useState(riddleToShow ? riddleToShow.suggerimento1 : "");
    const [suggerimento2, setSuggerimento2] = useState(riddleToShow ? riddleToShow.suggerimento2 : "");
    const [difficolta, setDifficolta] = useState( "facile" );
    const [errorMsg, setErrorMsg] = useState(""); // stringa vuota '' = non c'e' errore

    const navigate = useNavigate();


    const handleSubmit = (event) => {
        event.preventDefault();
        // validation
        let isValid = true;
        const errorMessages = [];

        
        //Se il titolo è vuoto
        if (testo.trim() === '') {
            isValid = false;
            errorMessages.push("Titolo vuoto");
        }


        if (risposta.trim() === "") {
            isValid = false;
            errorMessages.push("Risposta vuota");
        }
        
        if (durata <30 || durata>600 ) {
            isValid = false;
            errorMessages.push("La durata deve essere compresa tra 30s e 600s");
        }

        if (suggerimento1.trim() === "") {
            isValid = false;
            errorMessages.push("Suggerimento1 vuoto");
        }

        if (suggerimento2.trim() === "") {
            isValid = false;
            errorMessages.push("Suggerimento2 vuoto");
        }


        if (isValid) {

            const newRiddle = new Indovinello(
                id,
                testo,
                durata,
                risposta,
                suggerimento1,
                suggerimento2,
                "aperto",
                difficolta
            );

            props.addRiddle(newRiddle);

            props.filter=="All" ? navigate('/All') : navigate('/MyRiddles');        }
            
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
                        {<h1>Inserisci un nuovo indovinello</h1>}
                    </Col>
                </Row>
                <Row>
                    <Col md="3"></Col>
                    <Col>
                        {errorMsg ? (
                            <Alert
                                variant="danger"
                                onClose={() => setErrorMsg("")}
                                dismissible>
                                {errorMsg}
                            </Alert>
                        ) : (
                            false
                        )}
                        <Form>
                            <Form.Group>
                                <Form.Label>Testo</Form.Label>
                                <Form.Control
                                    value={testo}
                                    onChange={(ev) => setTesto(ev.target.value)}
                                    style={{ backgroundColor: errorMsg.includes("Titolo vuoto") || errorMsg.includes("Titolo vuoto") ? '#f4cdd1' : 'transparent', }}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group style={{ cursor: "pointer" }} className="mb-3" controlId="formBasicCheckbox">
                                <Form.Label>Durata in secondi</Form.Label>
                                <Form.Control
                                    value={durata}
                                    onChange={(ev) => setDurata(ev.target.value)}
                                    style={{ backgroundColor: errorMsg.includes("La durata deve essere compresa tra 30s e 600s") || errorMsg.includes("La durata deve essere compresa tra 30s e 600s") ? '#f4cdd1' : 'transparent', }}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Risposta</Form.Label>
                                <Form.Control
                                    value={risposta}
                                    onChange={(ev) => setRisposta(ev.target.value)}
                                    style={{ backgroundColor: errorMsg.includes("Risposta vuota") || errorMsg.includes("Risposta vuota") ? '#f4cdd1' : 'transparent', }}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Suggerimento1</Form.Label>
                                <Form.Control
                                    value={suggerimento1}
                                    onChange={(ev) => setSuggerimento1(ev.target.value)}
                                    style={{ backgroundColor: errorMsg.includes("Suggerimento1 vuoto") || errorMsg.includes("Suggerimento1 vuoto") ? '#f4cdd1' : 'transparent', }}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Suggerimento2</Form.Label>
                                <Form.Control
                                    value={suggerimento2}
                                    onChange={(ev) => setSuggerimento2(ev.target.value)}
                                    style={{ backgroundColor: errorMsg.includes("Suggerimento2 vuoto") || errorMsg.includes("Suggerimento2 vuoto") ? '#f4cdd1' : 'transparent', }}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Difficoltà</Form.Label>
                                <Form.Select aria-label="Default select example"  value={difficolta}
                                    
                                    onChange={(ev) => setDifficolta(ev.target.value)}>
                                    <option value="facile">Facile</option>
                                    <option value="medio">Medio</option>
                                    <option value="difficile">Difficile</option>
                                </Form.Select>
                            </Form.Group>
                        </Form>
                        <br></br>
                        <Button onClick={(event) => { handleSubmit(event) }}>Crea</Button>
                        <span>{"   "} </span>
                        <Button variant="secondary" onClick={() => {  props.filter=="All" ? navigate('/All') : navigate('/MyRiddles') }}>Torna alla home</Button>
                    </Col>
                    <Col md="3"></Col>
                </Row>
            </Container>
        </>
    );
}


export default RiddleForm;