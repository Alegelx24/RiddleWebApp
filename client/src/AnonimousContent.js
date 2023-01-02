import { Table } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import MyClassification from './MyClassification';

function AnonimousContent(props) {
    return (
        <Container>
            <Row>
                <Col md="3">     
                <br></br>               
                    <h2>Indovinelli</h2>
                </Col>
                <Col md="9">
                </Col>
            </Row>
            <Row >
                <Col md="9">
                    <AnonimousTable indovinelli={props.indovinelli} ></AnonimousTable>
                </Col>
                <Col md="3">
                    <MyClassification classifica={props.classifica}></MyClassification>
                </Col>
            </Row>
        </Container>
    );
}

function AnonimousTable(props) {


    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <th>Testo</th>
                        <th>Difficoltà</th>
                        <th>Stato</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.indovinelli.map((i) => <QuizRow indovinello={i} key={i.id} />)
                    }
                </tbody>
            </Table>
        </>
    );
}

function QuizRow(props) {
    let statusClass = null;

    switch (props.indovinello.status) {
        case 'added':
            statusClass = 'table-success';
            break;
        case 'deleted':
            statusClass = 'table-danger';
            break;
        case 'updated':
            statusClass = 'table-warning';
            break;
        default:
            break;
    }

    return (
        <tr className={statusClass}><QuizData indovinello={props.indovinello} />
        </tr>
    );
}

function QuizData(props) {
    return (
        <>
            <td>{props.indovinello.testo}</td>
            <td>{props.indovinello.difficolta}</td>
            <td>{props.indovinello.stato}</td>
        </>
    );
}

export { AnonimousContent };