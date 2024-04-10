// formulario para editar alojamiento
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {clearUserInfo, setUserRoles} from '../../redux/slices/userSlice';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';


const FormEditAccommodation = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const [errors, setErrors] = useState({});
    const token = localStorage.getItem('token');

    const [alojamiento, setAlojamiento] = useState({
        city_id: '',
        title: '',
        address: '',
        beds: '',
        baths: '',
        max_guests: '',
        wifi: '',
        accommodation_type: '',
        description: '',
        image_gallery: '',
    });

    useEffect(() => {
        // Obtener detalles del alojamiento
        axios
            .get(`http://localhost:8000/api/accommodations/${id}`)
            .then((response) => setAlojamiento(response.data))
            .catch((error) => console.error(error));
    }, [id]);

    const handleChange = (e) => {
        setAlojamiento({...alojamiento, [e.target.name]: e.target.value});
    };
    const validateForm = () => {
        const newErrors = {};
        if (!alojamiento.city_id) {
            newErrors.city_id = 'El campo Id de la ciudad es obligatorio';
        }
        if (!alojamiento.title) {
            newErrors.title = 'El campo Título es obligatorio';
        }
        if (!alojamiento.address) {
            newErrors.address = 'El campo Dirección es obligatorio';
        }
        if (!alojamiento.beds) {
            newErrors.beds = 'El campo Camas es obligatorio';
        }
        if (!alojamiento.baths) {
            newErrors.baths = 'El campo Baños es obligatorio';
        }
        if (!alojamiento.max_guests) {
            newErrors.max_guests = 'El campo Huéspedes es obligatorio';
        }
        if (!alojamiento.wifi) {
            newErrors.wifi = 'El campo Wifi es obligatorio';
        }
        if (!alojamiento.accommodation_type) {
            newErrors.accommodation_type = 'El campo Tipo de alojamiento es obligatorio';
        }
        if (!alojamiento.description) {
            newErrors.description = 'El campo Descripción es obligatorio';
        }
        if (!alojamiento.image_gallery) {
            newErrors.image_gallery = 'El campo Galería de imágenes es obligatorio';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.patch(`http://localhost:8000/api/accommodations/${id}`, alojamiento, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the request headers
                },
            });

            console.log('Alojamiento creado:', response.data);
            alert('Alojamiento creado con éxito');

            setAlojamiento({
                city_id: '',
                title: '',
                address: '',
                beds: '',
                baths: '',
                max_guests: '',
                wifi: '',
                accommodation_type: '',
                description: '',
                image_gallery: '',
            });
        } catch (error) {
            console.error(error);
        }
    };
    return (<Container>
            <Row className="mt-5">
                <Col>
                    <h2>Editar alojamiento</h2>
                    <p>Completa el formulario para editar el alojamiento</p>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="city_id">
                            <Form.Label>Id de la ciudad</Form.Label>
                            <Form.Control
                                type="text"
                                name="city_id"
                                value={alojamiento.city_id}
                                onChange={handleChange}
                                isInvalid={!!errors.city_id}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.city_id}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="title">
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={alojamiento.title}
                                onChange={handleChange}
                                isInvalid={!!errors.title}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.title}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="address">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={alojamiento.address}
                                onChange={handleChange}
                                isInvalid={!!errors.address}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.address}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="beds">
                            <Form.Label>Camas</Form.Label>
                            <Form.Control
                                type="text"
                                name="beds"
                                value={alojamiento.beds}
                                onChange={handleChange}
                                isInvalid={!!errors.beds}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.beds}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="baths">
                            <Form.Label>Baños</Form.Label>
                            <Form.Control
                                type="text"
                                name="baths"
                                value={alojamiento.baths}
                                onChange={handleChange}
                                isInvalid={!!errors.baths}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.baths}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="max_guests">
                            <Form.Label>Huéspedes</Form.Label>
                            <Form.Control
                                type="text"
                                name="max_guests"
                                value={alojamiento.max_guests}
                                onChange={handleChange}
                                isInvalid={!!errors.max_guests}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.max_guests}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="wifi">
                            <Form.Label>Wifi</Form.Label>
                            <Form.Control
                                type="text"
                                name="wifi"
                                value={alojamiento.wifi}
                                onChange={handleChange}
                                isInvalid={!!errors.wifi}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.wifi}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="accommodation_type">
                            <Form.Label>Tipo de alojamiento</Form.Label>
                            <Form.Control
                                type="text"
                                name="accommodation_type"
                                value={alojamiento.accommodation_type}
                                onChange={handleChange}
                                isInvalid={!!errors.accommodation_type}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.accommodation_type}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                value={alojamiento.description}
                                onChange={handleChange}
                                isInvalid={!!errors.description}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.description}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="image_gallery">
                            <Form.Label>Galería de imágenes</Form.Label>
                            <Form.Control
                                type="text"
                                name="image_gallery"
                                value={alojamiento.image_gallery}
                                onChange={handleChange}
                                isInvalid={!!errors.image_gallery}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.image_gallery}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Row>
                            <Col className="text-end">
                                <Button variant="primary" type="submit">
                                    Editar alojamiento
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
export default FormEditAccommodation;