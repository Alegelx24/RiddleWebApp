import { Form, Button, Alert, Container, Row, Col, Navbar } from 'react-bootstrap';
import { useState, useEffect } from 'react';


function LoginForm(props) {
  const [username, setUsername] = useState('alessandro@polito.it');
  const [password, setPassword] = useState('password');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (props.message) {
      setErrorMessage("Email o password errate");
    }
  }, [props.message]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const credentials = { username, password };
    const errorMessages = [];

    let valid = true;
    if (username === '' || password === '') {
      valid = false;
      errorMessages.push('Uno o più campi mancanti');
    }

    if(!ValidateEmailAddress(username))
    {
      valid = false;
      errorMessages.push('Formato email invalido');
    }

    if (valid) {
      props.login(credentials);

    }
    else {
      setErrorMessage(errorMessages.join(" | "));
    }
  };

  const handleAnonimous = (event) => {
    props.loginAnonimous();;
  };

  return (
    <>
      <LoginNavbar></LoginNavbar>
      <Container>
        <Row>
          <Col>
            <br></br>
            <h2>Login</h2>
            <Form>
              {errorMessage ? <Alert variant='danger'>{errorMessage}</Alert> : ''}
              <Form.Group controlId='username'>
                <Form.Label><h6>Email</h6></Form.Label>
                <Form.Control type='email' value={username} onChange={ev => setUsername(ev.target.value)} />
              </Form.Group>
              <Form.Group controlId='password'>
                <Form.Label><h6>Password</h6></Form.Label>
                <Form.Control type='password' value={password} onChange={ev => setPassword(ev.target.value)} />
              </Form.Group>
              <br></br>
              <Button type="submit" onClick={handleSubmit}> Login </Button>
              <span>{"   "} </span>
              <Button variant="dark"  onClick={handleAnonimous}>Continua come anonimo  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-snapchat" viewBox="0 0 16 16">
                <path d="M15.943 11.526c-.111-.303-.323-.465-.564-.599a1.416 1.416 0 0 0-.123-.064l-.219-.111c-.752-.399-1.339-.902-1.746-1.498a3.387 3.387 0 0 1-.3-.531c-.034-.1-.032-.156-.008-.207a.338.338 0 0 1 .097-.1c.129-.086.262-.173.352-.231.162-.104.289-.187.371-.245.309-.216.525-.446.66-.702a1.397 1.397 0 0 0 .069-1.16c-.205-.538-.713-.872-1.329-.872a1.829 1.829 0 0 0-.487.065c.006-.368-.002-.757-.035-1.139-.116-1.344-.587-2.048-1.077-2.61a4.294 4.294 0 0 0-1.095-.881C9.764.216 8.92 0 7.999 0c-.92 0-1.76.216-2.505.641-.412.232-.782.53-1.097.883-.49.562-.96 1.267-1.077 2.61-.033.382-.04.772-.036 1.138a1.83 1.83 0 0 0-.487-.065c-.615 0-1.124.335-1.328.873a1.398 1.398 0 0 0 .067 1.161c.136.256.352.486.66.701.082.058.21.14.371.246l.339.221a.38.38 0 0 1 .109.11c.026.053.027.11-.012.217a3.363 3.363 0 0 1-.295.52c-.398.583-.968 1.077-1.696 1.472-.385.204-.786.34-.955.8-.128.348-.044.743.28 1.075.119.125.257.23.409.31a4.43 4.43 0 0 0 1 .4.66.66 0 0 1 .202.09c.118.104.102.26.259.488.079.118.18.22.296.3.33.229.701.243 1.095.258.355.014.758.03 1.217.18.19.064.389.186.618.328.55.338 1.305.802 2.566.802 1.262 0 2.02-.466 2.576-.806.227-.14.424-.26.609-.321.46-.152.863-.168 1.218-.181.393-.015.764-.03 1.095-.258a1.14 1.14 0 0 0 .336-.368c.114-.192.11-.327.217-.42a.625.625 0 0 1 .19-.087 4.446 4.446 0 0 0 1.014-.404c.16-.087.306-.2.429-.336l.004-.005c.304-.325.38-.709.256-1.047Zm-1.121.602c-.684.378-1.139.337-1.493.565-.3.193-.122.61-.34.76-.269.186-1.061-.012-2.085.326-.845.279-1.384 1.082-2.903 1.082-1.519 0-2.045-.801-2.904-1.084-1.022-.338-1.816-.14-2.084-.325-.218-.15-.041-.568-.341-.761-.354-.228-.809-.187-1.492-.563-.436-.24-.189-.39-.044-.46 2.478-1.199 2.873-3.05 2.89-3.188.022-.166.045-.297-.138-.466-.177-.164-.962-.65-1.18-.802-.36-.252-.52-.503-.402-.812.082-.214.281-.295.49-.295a.93.93 0 0 1 .197.022c.396.086.78.285 1.002.338.027.007.054.01.082.011.118 0 .16-.06.152-.195-.026-.433-.087-1.277-.019-2.066.094-1.084.444-1.622.859-2.097.2-.229 1.137-1.22 2.93-1.22 1.792 0 2.732.987 2.931 1.215.416.475.766 1.013.859 2.098.068.788.009 1.632-.019 2.065-.01.142.034.195.152.195a.35.35 0 0 0 .082-.01c.222-.054.607-.253 1.002-.338a.912.912 0 0 1 .197-.023c.21 0 .409.082.49.295.117.309-.04.56-.401.812-.218.152-1.003.638-1.18.802-.184.169-.16.3-.139.466.018.14.413 1.991 2.89 3.189.147.073.394.222-.041.464Z" />
              </svg></Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}

function LogoutButton(props) {
  return (
    <Col>
      <span className='text-light'>Benvenuto {props.user?.name}!</span>&emsp;<Button variant="outline-light" onClick={props.logout}>Logout</Button>
    </Col>
  )
}

function LoginNavbar(props) {
  return (
    <Navbar bg="primary" className="navbar-expand-md" variant="dark">
      <Container>
        <Navbar.Brand >
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-question-diamond-fill" viewBox="0 0 16 16">
            <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM5.495 6.033a.237.237 0 0 1-.24-.247C5.35 4.091 6.737 3.5 8.005 3.5c1.396 0 2.672.73 2.672 2.24 0 1.08-.635 1.594-1.244 2.057-.737.559-1.01.768-1.01 1.486v.105a.25.25 0 0 1-.25.25h-.81a.25.25 0 0 1-.25-.246l-.004-.217c-.038-.927.495-1.498 1.168-1.987.59-.444.965-.736.965-1.371 0-.825-.628-1.168-1.314-1.168-.803 0-1.253.478-1.342 1.134-.018.137-.128.25-.266.25h-.825zm2.325 6.443c-.584 0-1.009-.394-1.009-.927 0-.552.425-.94 1.01-.94.609 0 1.028.388 1.028.94 0 .533-.42.927-1.029.927z" />
          </svg>
          &emsp;
          <span></span>
          Welcome to World of Riddles!
        </Navbar.Brand>
      </Container>
    </Navbar>);
}

function ValidateEmailAddress(emailString) {
  var atSymbol = emailString.indexOf("@");
  if(atSymbol < 1) return false;
  
  var dot = emailString.indexOf(".");
  if(dot <= atSymbol + 2) return false;
  
  if (dot === emailString.length - 1) return false;
  
  return true;
}



export { LoginForm, LogoutButton, LoginNavbar };