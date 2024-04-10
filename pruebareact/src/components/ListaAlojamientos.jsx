import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ListaAlojamientos = ({ alojamientos }) => {
    return (
        <div>
            <h3>Alojamientos Disponibles</h3>
            <Row xs={1} md={2} lg={3} className="g-4">
                {alojamientos.map((alojamiento) => (
                    <Col key={alojamiento.id}>
                        <Card>
                            <Card.Img variant="top" src={alojamiento.image_gallery[0]} />
                            <Card.Body>
                                <Card.Title>{alojamiento.title}</Card.Title>
                                <Card.Text>{alojamiento.description}</Card.Text>
                                <Link to={`/alojamiento/${alojamiento.id}`}>
                                    {/*
                    Si está logueado, redirigir a la página de detalles con
                    opción de reserva. Si no está logueado, redirigir a la
                    página de detalles sin opción de reserva.
                  */}
                                    Ver detalles
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ListaAlojamientos;
