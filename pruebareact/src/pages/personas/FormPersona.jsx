import { useEffect, useState } from "react";
import { Alert, Button, Card, CardBody, CardTitle, Col, Container, Form, FormControl, FormLabel, FormSelect, Row } from "react-bootstrap";
import Menu from "../../components/Menu";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { getGeneroForDisplay } from "../../utilities/PersonaUtilities";

const FormPersona = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [validated, setValidated] = useState(false);
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [edad, setEdad] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [genero, setGenero] = useState('');

    useEffect(() => {
        if (!id) {
            return;
        }
        fetchPersona();
    }, [id])
    const fetchPersona = () => {
        axios.get('http://127.0.0.1:8000/api/personas/' + id, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                setNombres(response.data.nombres);
                setApellidos(response.data.apellidos);
                setCiudad(response.data.ciudad);
                setEdad(response.data.edad);
                setFechaNacimiento(response.data.fechaNacimiento);
                setGenero(response.data.genero);
            }).catch((error) => {
                console.log(error);
                if(error.response.status === 401){
                    navigate('/login');
                }
            });
    }

    
    const onFormSubmit = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();

        const isValid = form.checkValidity();
        setValidated(true);

        if (!isValid) {
            return;
        }
        doSave();
    }
    const doSave = () => {
        if (id) {
            doUpdate();
        } else {
            doInsert();
        }

    }
    const doUpdate = () => {
        axios.put('http://127.0.0.1:8000/api/personas/' + id, {
            nombres: nombres,
            apellidos: apellidos,
            ciudad: ciudad,
            edad: edad,
            fechaNacimiento: fechaNacimiento,
            genero: genero
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            console.log(response);
            navigate('/personas');
        }).catch((error) => {
            console.log(error);
            if(error.response.status === 401){
                navigate('/login');
            }
        });
    }
    const doInsert = () => {
        axios.post('http://127.0.0.1:8000/api/personas', {
            nombres: nombres,
            apellidos: apellidos,
            ciudad: ciudad,
            edad: edad,
            fechaNacimiento: fechaNacimiento,
            genero: genero
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            console.log(response);
            navigate('/personas');
        }).catch((error) => {
            console.log(error);
            if(error.response.status === 401){
                navigate('/login');
            }
        });
    }
    return (
        <>
            <Menu />
            <Container>
                <Row className="mt-3 mb-3">
                    <Col md={{
                        span: 6,
                        offset: 3
                    }}>
                        <Card >
                            <CardBody>
                                <CardTitle>
                                    <h3>Formulario de Persona</h3>
                                </CardTitle>
                                <Form noValidate validated={validated} onSubmit={onFormSubmit}>
                                    <div>
                                        <FormLabel>Nombres</FormLabel>
                                        <FormControl required type="text" value={nombres}
                                            onChange={(e) => {
                                                setNombres(e.target.value);
                                            }} />
                                        <Form.Control.Feedback type="invalid">
                                            Escribe un nombre
                                        </Form.Control.Feedback>
                                    </div>
                                    <div>
                                        <FormLabel>Apellidos</FormLabel>

                                        <FormControl required type="text" value={apellidos}
                                            onChange={(e) => {
                                                setApellidos(e.target.value);
                                            }} />
                                        <Form.Control.Feedback type="invalid">
                                            Escribe un apellido
                                        </Form.Control.Feedback>
                                    </div>
                                    <div>
                                        <FormLabel>Ciudad</FormLabel>

                                        <FormControl required type="text" value={ciudad}
                                            onChange={(e) => {
                                                setCiudad(e.target.value);
                                            }} />
                                        <Form.Control.Feedback type="invalid">
                                            Escribe una ciudad
                                        </Form.Control.Feedback>
                                    </div>
                                    <div>
                                        <FormLabel>Edad</FormLabel>

                                        <FormControl required type="number" value={edad}
                                            onChange={(e) => {
                                                setEdad(e.target.value);
                                            }} />
                                        <Form.Control.Feedback type="invalid">
                                            Escribe una edad
                                        </Form.Control.Feedback>
                                    </div>
                                    <div>
                                        <FormLabel>Fecha de Nacimiento</FormLabel>

                                        <FormControl required type="date" value={fechaNacimiento}
                                            onChange={(e) => {
                                                setFechaNacimiento(e.target.value);
                                            }} />
                                        <Form.Control.Feedback type="invalid">
                                            Escribe una fecha de nacimiento
                                        </Form.Control.Feedback>
                                    </div>
                                    <div>
                                        <FormLabel>Género</FormLabel>

                                        <FormSelect required value={genero} onChange={(e) => {
                                            setGenero(e.target.value);
                                        }}>
                                            <option value="">Seleccione un género</option>
                                            <option value="M">Masculino</option>
                                            <option value="F">Femenino</option>
                                            <option value="O">Indefinido</option>
                                        </FormSelect>
                                        <Form.Control.Feedback type="invalid">
                                            Seleccione un género
                                        </Form.Control.Feedback>
                                    </div>
                                    <Alert className="mt-3" variant="info">El nombre es: {nombres}<br />
                                        El apellido es: {apellidos}<br />
                                        La ciudad es: {ciudad}<br />
                                        La edad es: {edad}<br />
                                        La fecha de nacimiento es: {fechaNacimiento}<br />
                                        El genero es: {getGeneroForDisplay(genero)}<br />
                                    </Alert>
                                    <div>
                                        <Button variant="primary" type="submit">Guardar</Button>
                                        <Button variant="link">Volver</Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default FormPersona;