import { Card, CardBody, CardTitle, Col, Container, Row, Table } from "react-bootstrap";
import Menu from "../../components/Menu";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getTipoForDisplay } from "../../utilities/MascotaUtilities";

const MascotaList = () => {
    const navigate = useNavigate();
    const [mascotaList, setMascotaList] = useState([]);

    useEffect(() => {
        fetchListaMascotas();
    }, [])


    const fetchListaMascotas = () => {
        axios.get('http://localhost:8000/api/mascotas/', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                setMascotaList(response.data);
            }).catch((error) => {
                console.log(error);
            });
    }
    const onEditClick = (id) => {
        navigate('/mascotas/' + id);
    }
    const onDeleteClick = (id) => {
        const confirm = window.confirm('¿Está seguro de eliminar el registro?');
        if (!confirm) {
            return;
        }
        axios.delete('http://localhost:8000/api/mascotas/' + id, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(() => {
                fetchListaMascotas();
            }).catch((error) => {
                console.log(error);
            });
    }
    return (
        <> <Menu />
            <Container>
                <Row className="mt-3 mb-3">
                    <Col>
                        <Card >
                            <CardBody>
                                <CardTitle>
                                    <h3>Lista de Mascotas</h3>
                                </CardTitle>
                                <Table hover>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Tipo</th>
                                            <th>Persona</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mascotaList && mascotaList.map(item =>
                                            <tr key={"tr" + item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.nombre}</td>
                                                <td>{getTipoForDisplay(item.tipo)}</td>
                                                <td>{item.propietario.nombres} {item.propietario.apellidos}</td>
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

export default MascotaList;