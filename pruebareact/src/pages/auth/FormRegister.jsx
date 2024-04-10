import React, {useState} from "react";
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
import {useNavigate} from "react-router-dom";
import Menu from "../../components/Menu";

import axios from "axios";


const FormRegister = () => {
    const navigate = useNavigate();
    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validated, setValidated] = useState(false);
    const [errorText, setErrorText] = useState('')
    const onFormSubmit = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();

        const isValid = form.checkValidity();
        setValidated(true);

        if (!isValid) {
            return;
        }
        doRegister();
    }
    const doRegister = () => {
        setErrorText('');
        axios.post('http://127.0.0.1:8000/api/register', {
            name: fullname,
            email: email,
            password: password
        }).then((response) => {
            if (response.data.id) {
                navigate('/login');
            }
        }).catch((error) => {
            console.log(error);
            if (error.response.status === 422) {
                setErrorText('El email ya existe');
            } else {
                setErrorText('Error al crear el usuario');
            }
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
                                <h3>Registro de usuario</h3>
                            </CardTitle>
                            <Form noValidate validated={validated} onSubmit={onFormSubmit}>
                                {errorText && <Alert variant="danger">{errorText}</Alert>}
                                <div>
                                    <FormLabel>Nombre</FormLabel>
                                    <FormControl required type="text" value={fullname}
                                                 onChange={(e) => {
                                                     setFullname(e.target.value);
                                                 }}/>
                                    <Form.Control.Feedback type="invalid">
                                        Escribe el nombre completo
                                    </Form.Control.Feedback>
                                </div>
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
                                    <Button variant="primary" type="submit">Registrar</Button>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    </>);
}

export default FormRegister;