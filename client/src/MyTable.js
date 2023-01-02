import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faSearch } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';

function RiddleData(props) {

    const navigate = useNavigate();

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
        <tr className={statusClass}>
            <td>
                {props.indovinello.testo}
            </td>
            <td>
                {props.indovinello.difficolta}
            </td>
            <td >
                <span style={{ cursor: "pointer" }} className="mx-2"><FontAwesomeIcon icon={ (props.indovinello.stato=="aperto" && props.user.id !== props.indovinello.user ) ?  (faPlusSquare) : (faSearch)} onClick={() => { (props.indovinello.stato == "chiuso") ? (navigate(`/DetailsClosed/${props.indovinello.id}`)) : ((props.filter == "All" && props.user.id !== props.indovinello.user) ? (navigate(`/DetailsOpen/${props.indovinello.id}`)) : (navigate(`/userDetailsOpen/${props.indovinello.id}`))) }} /></span>
            </td>
        </tr>
    );
}

export function MyTable(props) {

    return (
        <Table>
            <thead>
                <tr>
                    <th>Testo</th>
                    <th>Difficoltà</th>
                    <th>Visualizza dettagli</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.indovinelli.map((i) => <RiddleData indovinello={i} key={i.id} filter={props.filter} user={props.user} aperto={props.aperto} />)
                }
            </tbody>
        </Table>
    );
}
