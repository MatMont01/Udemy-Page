import {
    Alert,
    Button,
    Card,
    CardBody,
    CardTitle,
    Col,
    Container,
    Form,
    FormControl,
    FormLabel,
    Row
} from "react-bootstrap";
import Menu from "../../components/Menu";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {setLoginInfo} from "../../redux/slices/userSlice";
import {useDispatch} from "react-redux";

const FormLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validated, setValidated] = useState(false);
    const onFormSubmit = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();

        const isValid = form.checkValidity();
        setValidated(true);

        if (!isValid) {
            return;
        }
        doLogin();
    }
    const doLogin = () => {
        axios.post('http://127.0.0.1:8000/api/login', {
            email: email,
            password: password
        }).then((response) => {
            if (response.data.access_token) {
                localStorage.setItem('token', response.data.access_token);
                dispatch(setLoginInfo({
                    email: email,
                    isLoggedIn: true
                }))
                navigate('/');
            } else {
                alert('Usuario o contraseña incorrectos');
            }
        }).catch((error) => {
            console.log(error);
            alert('Usuario o contraseña incorrectos');
        });

    }

    return (<>
        <Menu/>
        <Container>
            <Row className="mt-3 mb-3">
                <Col md={{
                    span: 6,
                    offset: 3
                }}>
                    <Card>
                        <CardBody>
                            <CardTitle>
                                <h3>Inicio de sesión</h3>
                            </CardTitle>
                            <Form noValidate validated={validated} onSubmit={onFormSubmit}>
                                <div>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl required type="email" value={email}
                                                 onChange={(e) => {
                                                     setEmail(e.target.value);
                                                 }}/>
                                    <Form.Control.Feedback type="invalid">
                                        Escribe un email
                                    </Form.Control.Feedback>
                                </div>
                                <div>
                                    <FormLabel>Contraseña</FormLabel>

                                    <FormControl required type="password" value={password}
                                                 onChange={(e) => {
                                                     setPassword(e.target.value);
                                                 }}/>
                                    <Form.Control.Feedback type="invalid">
                                        Escribe una contraseña
                                    </Form.Control.Feedback>
                                </div>
                                <div className="mt-2">
                                    <Button variant="primary" type="submit">Iniciar sesión</Button>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    </>);
}

export default FormLogin;