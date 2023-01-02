import { MyTable } from "./MyTable.js";
import MySideBar from "./MySideBar.js";
import MyAddButton from "./MyAddButton.js";
import { Col, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import MyClassification from "./MyClassification.js";


function RiddleContent(props) {
	const location = useLocation();
	const currentFilter = location.pathname.replace("/", "");

	const navigate = useNavigate();

	return (
		<Row className="w-100">
			<Col md={2}>
				<MySideBar
					changeFilter={props.changeFilter}
					filter={props.filter}
				/>
			</Col>
			<Col md={7}>
				<br></br>
				<h1>{currentFilter.replace(/([A-Z])/g, " $1").trim()}</h1>
				<h2>Indovinelli aperti</h2>
				<MyTable
					indovinelli={props.indovinelli.filter(i => i.stato == "aperto")}
					filter={props.filter}
					user={props.user}
					aperto={true}
				></MyTable>
				<div className="text-end">
					<span onClick={() => navigate("/Add")}>
						<MyAddButton></MyAddButton>
					</span>
				</div>
				<h2>Indovinelli chiusi</h2>
				<MyTable
					indovinelli={props.indovinelli.filter(i => i.stato == "chiuso")}
					filter={props.filter}
					user={props.user}
				></MyTable>
			</Col>
			<Col md="3">
				<MyClassification classifica={props.classifica}></MyClassification>
			</Col>
		</Row>
	);
}

export default RiddleContent;
