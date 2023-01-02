import { Table } from "react-bootstrap";


function ClassificaData(props) {

  return (
    <tr >
      <td>
        {props.user.name}
      </td>
      <td>
        {props.user.points}
      </td>
    </tr>
  );
}

function MyClassification(props) {

  const classifica = props.classifica;

  return (
    <Table>
      <thead>
        <tr>
          <th>Classifica</th>
        </tr>
      </thead>
      <tbody>
        {
          classifica.map((u) => <ClassificaData
            user={u} key={u.id} />)
        }
      </tbody>
    </Table>
  );
}

export default MyClassification;
