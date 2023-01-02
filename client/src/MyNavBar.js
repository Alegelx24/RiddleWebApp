import { Navbar, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { LogoutButton } from './LoginComponents'


function MyNavbar(props) {
    const navigate = useNavigate();
    return (
        <Navbar bg="primary" className="navbar-expand-md" variant="dark">
            <Container>
                <div style={{ cursor: "pointer" }} onClick={() => navigate("/All")}>
                    <Navbar.Brand >
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-question-diamond-fill" viewBox="0 0 16 16">
                            <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM5.495 6.033a.237.237 0 0 1-.24-.247C5.35 4.091 6.737 3.5 8.005 3.5c1.396 0 2.672.73 2.672 2.24 0 1.08-.635 1.594-1.244 2.057-.737.559-1.01.768-1.01 1.486v.105a.25.25 0 0 1-.25.25h-.81a.25.25 0 0 1-.25-.246l-.004-.217c-.038-.927.495-1.498 1.168-1.987.59-.444.965-.736.965-1.371 0-.825-.628-1.168-1.314-1.168-.803 0-1.253.478-1.342 1.134-.018.137-.128.25-.266.25h-.825zm2.325 6.443c-.584 0-1.009-.394-1.009-.927 0-.552.425-.94 1.01-.94.609 0 1.028.388 1.028.94 0 .533-.42.927-1.029.927z" />
                        </svg>
                        &ensp;
                        World of Riddles!
                    </Navbar.Brand>
                </div>

                <div>
                    {props.loggedIn ? <LogoutButton logout={props.doLogOut} user={props.user} /> : false}
                </div>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-person" viewBox="0 0 16 16">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                    </svg>
                </span>
            </Container>
        </Navbar>);
}

export default MyNavbar;