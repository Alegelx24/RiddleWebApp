import { ListGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

function MySideBar(props) {

    const navigate = useNavigate();

    const location = useLocation();
    const currentFilter = location.pathname.replace("/", "");

    return (
        <ListGroup as="ul" className="bg-light vh-100 below-nav d-flex p-3" variant="flush "  >
        <ListGroup.Item  style={{ cursor: "pointer" }} as="li" active={currentFilter == "All"} className={`${currentFilter !== "All" ? "bg-transparent" : ""}`} onClick={() => {props.changeFilter('All'); navigate("/All") }} >
            Tutti gli indovinelli
        </ListGroup.Item>
        <ListGroup.Item style={{ cursor: "pointer" }} as="li" active={currentFilter == "MyRiddles"} className={`${currentFilter !== "MyRiddles" ? "bg-transparent" : ""}`} onClick={() => { props.changeFilter('MyRiddles'); navigate("/MyRiddles")}}>I miei indovinelli</ListGroup.Item>
       </ListGroup>
    );
}

export default MySideBar;
