import { MyTable } from "./MyTable.js";
import { Col, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import MySideBar from "./MySideBar.js";
import MyAddButton from "./MyAddButton.js";
import MyClassification from "./MyClassification.js";

function UserRiddleContent(props) {
	
	const location = useLocation();
	const currentFilter = location.pathname.replace("/", "");

	const navigate = useNavigate();

	return (
		<Row className="w-100">
			<Col md={2}>
				<MySideBar
					changeFilter={props.changeFilter}
				/> 
			</Col>
			<Col md={7}>
				<h1>{currentFilter.replace(/([A-Z])/g," $1").trim()}</h1>
				<h2>Indovinelli aperti</h2>
				<MyTable
					indovinelli={props.indovinelli.filter(i => i.stato == "aperto")} 
				></MyTable>
				<h2>Indovinelli chiusi</h2>
				<MyTable
					indovinelli={props.indovinelli.filter(i => i.stato == "chiuso")} 
				></MyTable>
				<div className="text-end">
					<span onClick={() => navigate("/Add")}>
						<MyAddButton></MyAddButton>
					</span>
				</div>
			</Col>
			<Col md="3">
				<MyClassification classifica={props.classifica}></MyClassification>
			</Col>
		</Row>
	);
}

export default UserRiddleContent;
