import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardTitle, Col, Container, Form, FormControl, FormLabel, FormSelect, Row } from "react-bootstrap";
import Menu from "../../components/Menu";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { getListaPersonas } from "../../services/PersonaService";

const FormMascota = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [validated, setValidated] = useState(false);
    const [nombre, setNombre] = useState('');
    const [tipo, setTipo] = useState('');
    const [personaId, setPersonaId] = useState('');
    const [personaList, setPersonaList] = useState([]);
    useEffect(() => {
        fetchListaPersonas();
        if (!id) {
            return;
        }
        fetchMascota();
    }, [id])
    const fetchMascota = () => {
        axios.get('http://localhost:8000/api/mascotas/' + id, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                setNombre(response.data.nombre);
                setTipo(response.data.tipo);
                setPersonaId(response.data.persona_id);
            }).catch((error) => {
                console.log(error);
            });
    }
    const fetchListaPersonas = () => {
        getListaPersonas().then((response) => {
            setPersonaList(response);
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
        axios.put('http://localhost:8000/api/mascotas/' + id, {
            nombre: nombre,
            tipo: tipo,
            persona_id: personaId,
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            console.log(response);
            navigate('/mascotas');
        }).catch((error) => {
            console.log(error);
        });
    }
    const doInsert = () => {
        axios.post('http://localhost:8000/api/mascotas', {
            nombre: nombre,
            tipo: tipo,
            persona_id: personaId
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            console.log(response);
            navigate('/mascotas');
        }).catch((error) => {
            console.log(error);
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
                                    <h3>Formulario de Mascota</h3>
                                </CardTitle>
                                <Form noValidate validated={validated} onSubmit={onFormSubmit}>
                                    <div>
                                        <FormLabel>Nombre</FormLabel>
                                        <FormControl required type="text" value={nombre}
                                            onChange={(e) => {
                                                setNombre(e.target.value);
                                            }} />
                                        <Form.Control.Feedback type="invalid">
                                            Escribe un nombre
                                        </Form.Control.Feedback>
                                    </div>
                                    <div>
                                        <FormLabel>Tipo</FormLabel>

                                        <FormSelect required value={tipo} onChange={(e) => {
                                            setTipo(e.target.value);
                                        }}>
                                            <option value="">Seleccione un tipo</option>
                                            <option value="0">Perro</option>
                                            <option value="1">Gato</option>
                                            <option value="2">Loro</option>
                                            <option value="3">Llama</option>
                                            <option value="4">Capibara</option>
                                        </FormSelect>
                                        <Form.Control.Feedback type="invalid">
                                            Seleccione un género
                                        </Form.Control.Feedback>
                                    </div>
                                    <div>
                                        <FormLabel>PersonaId</FormLabel>
                                        <FormSelect required value={personaId} onChange={(e) => {
                                            setPersonaId(e.target.value);
                                        }}>
                                            <option value="">Seleccione una persona</option>
                                            {personaList && personaList.map(item =>
                                                <option key={"option" + item.id} value={item.id}>{item.nombres} {item.apellidos}</option>
                                            )}
                                        </FormSelect>
                                        <Form.Control.Feedback type="invalid">
                                            Escribe una personaId
                                        </Form.Control.Feedback>
                                    </div>

                                    <div className="mt-3">
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

export default FormMascota;