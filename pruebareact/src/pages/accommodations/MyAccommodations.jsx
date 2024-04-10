import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Container, Row, Col, Card, Carousel, Button, Modal, ModalBody} from 'react-bootstrap';
import {useParams, NavLink} from 'react-router-dom';
import {getWifiForDisplay} from "../../utilities/AccommodationUtilities.js";

const MyAccommodations = () => {
    const {id} = useParams();
    const token = localStorage.getItem('token');
    const [alojamientos, setAlojamientos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const fetchAccommodations = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/accommodations', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (Array.isArray(response.data)) {
                    setAlojamientos(response.data);
                } else {
                    console.error('Invalid response format:', response.data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchAccommodations();
    }, [token]);

    const handleDeleteAccommodation = async (accommodationId) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/accommodations/${accommodationId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('Alojamiento eliminado:', response.data);
            alert('Alojamiento eliminado con éxito');
        } catch (error) {
            console.error('Error al eliminar alojamiento:', error);
        }
    };

    const handleImageClick = (index) => {
        setActiveIndex(index);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <Container>
            <Row className="mt-5">
                <Col>
                    <h2>Mis alojamientos</h2>
                    <p>Estos son tus alojamientos</p>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <Row>
                        {Array.isArray(alojamientos) &&
                            alojamientos.map((alojamiento, index) => (
                                <Col key={alojamiento.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                                    <Card>
                                        <Carousel activeIndex={activeIndex} onSelect={(index) => setActiveIndex(index)}>
                                            {alojamiento.image_gallery.map((image, imageIndex) => (
                                                <Carousel.Item key={imageIndex}
                                                               onClick={() => handleImageClick(imageIndex)}>
                                                    <img className="d-block w-100" src={`/src/img/${image}`}
                                                         alt={`Slide ${imageIndex}`}/>
                                                </Carousel.Item>
                                            ))}
                                        </Carousel>
                                        <Card.Body>
                                            <Card.Title>{alojamiento.title}</Card.Title>
                                            <Card.Text>{alojamiento.description}</Card.Text>
                                            <Card.Text>{alojamiento.address}</Card.Text>
                                            <NavLink className="nav-link" to={`/accommodations/edit/${alojamiento.id}`}>
                                                <Button variant="primary">Editar</Button>
                                            </NavLink>
                                            <NavLink className="nav-link" to="#"
                                                     onClick={() => handleDeleteAccommodation(alojamiento.id)}>
                                                <Button variant="danger">Eliminar</Button>
                                            </NavLink>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                    </Row>
                </Col>
            </Row>
            {Array.isArray(alojamientos) &&
                alojamientos.map((alojamiento, index) => (
                    <Col key={alojamiento.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                        <Modal show={showModal} onHide={handleCloseModal} size="lg">
                            <Modal.Header closeButton>
                                <Modal.Title>Galería de imágenes</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="modal-dialog modal-dialog-scrollable">
                                    <div className="modal-content">
                                        <div className="modal-body">
                                            <Carousel activeIndex={activeIndex}
                                                      onSelect={(index) => setActiveIndex(index)}>
                                                {alojamiento.image_gallery.map((image, imageIndex) => (
                                                    <Carousel.Item key={imageIndex}>
                                                        <img className="d-block w-100" src={`/src/img/${image}`}
                                                             alt={`Slide ${imageIndex}`}/>
                                                    </Carousel.Item>
                                                ))}
                                            </Carousel>
                                        </div>
                                    </div>
                                </div>
                            </Modal.Body>
                            <ModalBody>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{alojamiento.title}</Card.Title>
                                        <Card.Text>{alojamiento.description}</Card.Text>
                                        <Card.Text>{alojamiento.address}</Card.Text>
                                        <Card.Text>{alojamiento.beds}</Card.Text>
                                        <Card.Text>{alojamiento.baths}</Card.Text>
                                        <Card.Text>{alojamiento.max_guests}</Card.Text>
                                        <Card.Text>{getWifiForDisplay(alojamiento.wifi)}</Card.Text>
                                        <Card.Text>{alojamiento.accommodation_type}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </ModalBody>
                        </Modal>

                    </Col>
                ))}
        </Container>
    );
};

export default MyAccommodations;