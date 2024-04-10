import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Container, Row, Col, Card, Form, Button, Carousel} from 'react-bootstrap';
import {useParams, useNavigate, NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {clearUserInfo, setUserRoles} from '../../redux/slices/userSlice';
import {getWifiForDisplay} from "../../utilities/AccommodationUtilities.js";
import {getCityForDisplay} from "../../utilities/CitiesUtilities.js";

const DetallesAlojamiento = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const token = localStorage.getItem('token');
    const [alojamiento, setAlojamiento] = useState(null);
    const [reserva, setReserva] = useState({
        accommodation_id: id,
        checkin_date: '',
        checkout_date: '',
        total_price: '',
        card_holder_name: '',
        card_number: '',
        card_expiry_date: '',
        card_cvv: '',
    });

    useEffect(() => {
        // Obtener detalles del alojamiento
        axios
            .get(`http://localhost:8000/api/accommodations/${id}`)
            .then((response) => setAlojamiento(response.data))
            .catch((error) => console.error(error));
    }, [id]);

    const handleChange = (e) => {
        setReserva({...reserva, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/reservations/makeReservationIfIsAvailable', reserva, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the request headers
                },
            });

            console.log('Reserva creada:', response.data);
            alert('Reserva creada con éxito');

            setReserva({
                accommodation_id: id,
                checkin_date: '',
                checkout_date: '',
                total_price: '',
                card_holder_name: '',
                card_number: '',
                card_expiry_date: '',
                card_cvv: '',
            });
        } catch (error) {
            console.error(error);
            alert('Error al crear la reserva. Verifica la disponibilidad del alojamiento para las fechas seleccionadas.');
        }
    };

    if (!alojamiento) {
        return <p>Cargando...</p>;
    }

    return (<Container>
        <Row className="mt-5">
            <Col>
                <h2>{alojamiento.title}</h2>
            </Col>
        </Row>
        <Row className="mt-4">
            <Col md={8}>
                <Card>
                    <Carousel>
                        {alojamiento.image_gallery.map((image, index) => (<Carousel.Item key={index}>
                            <img className="d-block w-100" src={`/src/img/${alojamiento.image_gallery[index]}`}
                                 alt={`Slide ${index}`}/>
                        </Carousel.Item>))}
                    </Carousel>
                    <Card.Body>
                        <Card.Title>{alojamiento.title}</Card.Title>
                        <Card.Text>{alojamiento.description}</Card.Text>
                        <Card.Text> {getCityForDisplay(alojamiento.city_id)}</Card.Text>
                        <Card.Text> {alojamiento.address}</Card.Text>
                        <Card.Text> Camas: {alojamiento.beds}</Card.Text>
                        <Card.Text> Baños: {alojamiento.baths}</Card.Text>
                        <Card.Text> Capacidad de personas máxima: {alojamiento.max_guests}</Card.Text>
                        <Card.Text> Wifi: {getWifiForDisplay(alojamiento.wifi)}</Card.Text>
                        <Card.Text> Tipo de Alojamiento: {alojamiento.accommodation_type}</Card.Text>
                        <NavLink to={`/map/${alojamiento.id}`}>
                            <Button>
                                Mapa
                            </Button>
                        </NavLink>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={4}>
                {isLoggedIn ? (<>
                    <h4>Detalles de la Reserva</h4>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="checkin_date">
                            <Form.Label>Fecha de Check-in</Form.Label>
                            <Form.Control
                                type="date"
                                name="checkin_date"
                                value={reserva.checkin_date}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="checkout_date">
                            <Form.Label>Fecha de Check-out</Form.Label>
                            <Form.Control
                                type="date"
                                name="checkout_date"
                                value={reserva.checkout_date}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="total_price">
                            <Form.Label>Total Precio</Form.Label>
                            <Form.Control
                                type="number"
                                name="total_price"
                                value={reserva.total_price}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="card_holder_name">
                            <Form.Label>Nombre del titular de la tarjeta</Form.Label>
                            <Form.Control
                                type="text"
                                name="card_holder_name"
                                value={reserva.card_holder_name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="card_number">
                            <Form.Label>Número de tarjeta</Form.Label>
                            <Form.Control
                                type="text"
                                name="card_number"
                                value={reserva.card_number}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="card_expiry_date">
                            <Form.Label>Fecha de expiración</Form.Label>
                            <Form.Control
                                type="date"
                                name="card_expiry_date"
                                value={reserva.card_expiry_date}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="card_cvv">
                            <Form.Label>CVV</Form.Label>
                            <Form.Control
                                type="text"
                                name="card_cvv"
                                value={reserva.card_cvv}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Reservar
                        </Button>
                    </Form>
                </>) : null}
            </Col>
        </Row>
    </Container>);
};

export default DetallesAlojamiento;
