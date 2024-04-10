import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {Container, Row, Col, Form, Button, Carousel, Card, Modal, ModalBody} from 'react-bootstrap';
import {getCityForDisplay} from "../../utilities/CitiesUtilities.js";

const ReservationLogued = () => {
    const [reservations, setReservations] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [activeReservation, setActiveReservation] = useState(null);

    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/reservations', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                setReservations(response.data);
            } catch (error) {
                console.error('Error fetching reservations:', error);
            }
        };

        if (isLoggedIn) {
            fetchReservations();
        }
    }, [isLoggedIn]);

    const handleDeleteReservation = async (reservationId) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/reservations/${reservationId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            console.log('Reserva eliminada:', response.data);
            alert('Reserva eliminada con éxito');
            // Actualizar la lista de reservas después de eliminar
            fetchReservations();
        } catch (error) {
            console.error('Error al eliminar reserva:', error);
        }
    };

    const handleReservationDetails = (reservation) => {
        setActiveReservation(reservation);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <h2>Reservations</h2>
            {reservations.length === 0 ? (
                <p>No reservations found.</p>
            ) : (
                //card con carousel
                <Row>
                    {reservations.map((reservation) => (
                        <Col key={reservation.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                            <Card>
                                <Carousel>
                                    {reservation.accommodation.image_gallery.map((image, index) => (
                                        <Carousel.Item key={index}>
                                            <img className="d-block w-100"
                                                 src={`/src/img/${reservation.accommodation.image_gallery[index]}`}
                                                 alt={`Slide ${index}`}/>
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                                <Card.Body>
                                    <Card.Title>{reservation.accommodation.title}</Card.Title>
                                    <Card.Text>
                                        {reservation.accommodation.description}
                                    </Card.Text>
                                    <Card.Text>
                                        {getCityForDisplay(reservation.accommodation.city_id)}
                                    </Card.Text>
                                    <Card.Text>
                                        {reservation.checkin_date} - {reservation.checkout_date}
                                    </Card.Text>
                                    <Card.Text>
                                        {reservation.total_price}
                                    </Card.Text>
                                    <Button variant="danger" onClick={() => handleDeleteReservation(reservation.id)}>
                                        Cancelar reserva
                                    </Button>
                                    <Button variant="primary" onClick={() => handleReservationDetails(reservation)}>
                                        Ver detalles
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            {/* Modal para mostrar detalles de la reserva */}
            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Detalles de la reserva</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {activeReservation && (
                        <div>
                            <Carousel>
                                {activeReservation.accommodation.image_gallery.map((image, index) => (
                                    <Carousel.Item key={index}>
                                        <img className="d-block w-100"
                                             src={`/src/img/${activeReservation.accommodation.image_gallery[index]}`}
                                             alt={`Slide ${index}`}/>
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{activeReservation.accommodation.title}</Card.Title>
                                    <Card.Text>
                                        {activeReservation.accommodation.description}
                                    </Card.Text>
                                    <Card.Text>
                                        {activeReservation.checkin_date} - {activeReservation.checkout_date}
                                    </Card.Text>

                                    <Card.Text>
                                        {activeReservation.total_price}
                                    </Card.Text>
                                    <Card.Text>
                                        {activeReservation.card_holder_name}
                                    </Card.Text>
                                    <Card.Text>
                                        {activeReservation.card_number}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ReservationLogued;
