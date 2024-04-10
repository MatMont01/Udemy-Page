import { Card, CardBody, CardTitle, Col, Container, Row, Table } from "react-bootstrap";
import Menu from "../../components/Menu";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGeneroForDisplay } from "../../utilities/PersonaUtilities";
import moment from "moment/moment";
import { getListaPersonas } from "../../services/PersonaService";
import ListaMascotasText from "../../components/ListaMascotasText";
import { useSelector } from "react-redux";

const PersonaList = () => {
    const isAdmin = useSelector((state) => state.user.isAdmin);
    const navigate = useNavigate();
    const [personaList, setPersonaList] = useState(null);
    useEffect(() => {
        fetchListaPersonas();
    }, []);


    const fetchListaPersonas = () => {
        getListaPersonas().then((response) => {
            setPersonaList(response);
        }).catch((error) => {
            if (error.response.status === 401) {
                navigate('/login');
            }
        });
    }
    const onEditClick = (id) => {
        navigate('/personas/' + id);
    }
    const onDeleteClick = (id) => {
        const confirm = window.confirm('¿Está seguro de eliminar el registro?');
        if (!confirm) {
            return;
        }
        axios.delete('http://127.0.0.1:8000/api/personas/' + id, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(() => {
                fetchListaPersonas();
            }).catch((error) => {
                console.log(error);
                if (error.response.status === 401) {
                    navigate('/login');
                }
            });
    }
    const getFechaForDisplay = (fecha) => {
        return moment(fecha).format('DD/MM/YYYY');
    }
    const onProfilePictureClick = (id) => {
        navigate('/personas/' + id + '/profile-picture');
    }
    return (<>
        <Menu />
        <Container>
            <Row className="mt-3 mb-3">
                <Col>
                    <Card >
                        <CardBody>
                            <CardTitle>
                                <h3>Lista de Personas</h3>
                            </CardTitle>
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>ID</th>
                                        <th>Nombres</th>
                                        <th>Apellidos</th>
                                        <th>Ciudad</th>
                                        <th>Edad</th>
                                        <th>Fecha de Nacimiento</th>
                                        <th>Género</th>
                                        <th></th>
                                        {isAdmin && <>
                                            <th></th>
                                            <th></th>
                                        </>}
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {personaList && personaList.map(item =>
                                        <tr key={"tr" + item.id}>
                                            <td><img style={{ maxHeight: '100px' }} src={"http://localhost:8000/uploads/personas/" + item.id + ".jpg"} /></td>
                                            <td>{item.id}</td>
                                            <td>{item.nombres}</td>
                                            <td>{item.apellidos}</td>
                                            <td>{item.ciudad}</td>
                                            <td>{item.edad}</td>
                                            <td>{getFechaForDisplay(item.fechaNacimiento)}</td>
                                            <td>{getGeneroForDisplay(item.genero)}</td>
                                            <td><ListaMascotasText persona={item} /></td>
                                            {isAdmin && <>
                                                <td>
                                                    <button className="btn btn-primary" onClick={() => {
                                                        onEditClick(item.id);
                                                    }}>
                                                        Editar</button>
                                                </td>
                                                <td>
                                                    <button className="btn btn-danger" onClick={() => {
                                                        onDeleteClick(item.id)
                                                    }}>
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </>}
                                            <td>
                                                <button className="btn btn-success" onClick={() => {
                                                    onProfilePictureClick(item.id);
                                                }}>
                                                    Foto de perfil
                                                </button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    </>);
}

export default PersonaList;