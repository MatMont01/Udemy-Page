import React, {useState} from 'react';
import axios from 'axios';
import {Container, Row, Col, Form, Button, Alert} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

const FormCreateAccommodation = () => {
    const navigate = useNavigate();
    const [accommodation, setAccommodation] = useState({
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
        latitud: '',
        longitud: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setAccommodation({...accommodation, [e.target.name]: e.target.value});
    };

    const validateForm = () => {
        const newErrors = {};

        // Añadir lógica de validación según tus requisitos
        if (!accommodation.city_id) {
            newErrors.city_id = 'Por favor, ingresa el id de la ciudad';
        }

        if (!accommodation.title) {
            newErrors.title = 'Por favor, ingresa el título';
        }

        if (!accommodation.address) {
            newErrors.address = 'Por favor, ingresa la dirección';
        }

        if (!accommodation.beds) {
            newErrors.beds = 'Por favor, ingresa el número de camas';
        }

        if (!accommodation.baths) {
            newErrors.baths = 'Por favor, ingresa el número de baños';
        }

        if (!accommodation.max_guests) {
            newErrors.max_guests = 'Por favor, ingresa el número de huéspedes';
        }

        if (!accommodation.wifi) {
            newErrors.wifi = 'Por favor, ingresa si tiene wifi';
        }

        if (!accommodation.accommodation_type) {
            newErrors.accommodation_type = 'Por favor, ingresa el tipo de alojamiento';
        }

        if (!accommodation.description) {
            newErrors.description = 'Por favor, ingresa la descripción';
        }

        if (!accommodation.image_gallery) {
            newErrors.image_gallery = 'Por favor, ingresa la galería de imágenes';
        }

        if (!accommodation.latitud) {
            newErrors.latitud = 'Por favor, ingresa la latitud';
        }

        if (!accommodation.longitud) {
            newErrors.longitud = 'Por favor, ingresa la longitud';
        }

        // Agrega más validaciones para otros campos según sea necesario

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const response = await axios.post(
                    'http://localhost:8000/api/accommodations',
                    accommodation
                );

                console.log('Alojamiento creado:', response.data);
                alert('Alojamiento creado con éxito');

                setAccommodation({
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
                    latitud: '',
                    longitud: '',
                });

                // Puedes redirigir al usuario a la página de detalles del nuevo alojamiento o a donde desees.
                navigate(`/accommodations/${response.data.id}`);
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <Container>
            <Row className="mt-5">
                <Col>
                    <h2>Crear nuevo alojamiento</h2>
                    <p>Completa el formulario para crear un nuevo alojamiento</p>
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
                                value={accommodation.city_id}
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
                                value={accommodation.title}
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
                                value={accommodation.address}
                                onChange={handleChange}
                                isInvalid={!!errors.address}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.address}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="beds">
                            <Form.Label>Número de camas</Form.Label>
                            <Form.Control
                                type="text"
                                name="beds"
                                value={accommodation.beds}
                                onChange={handleChange}
                                isInvalid={!!errors.beds}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.beds}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="baths">
                            <Form.Label>Número de baños</Form.Label>
                            <Form.Control
                                type="text"
                                name="baths"
                                value={accommodation.baths}
                                onChange={handleChange}
                                isInvalid={!!errors.baths}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.baths}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="max_guests">
                            <Form.Label>Número de huéspedes</Form.Label>
                            <Form.Control
                                type="text"
                                name="max_guests"
                                value={accommodation.max_guests}
                                onChange={handleChange}
                                isInvalid={!!errors.max_guests}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.max_guests}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="wifi">
                            <Form.Label>¿Tiene wifi?</Form.Label>
                            <Form.Control
                                type="text"
                                name="wifi"
                                value={accommodation.wifi}
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
                                value={accommodation.accommodation_type}
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
                                value={accommodation.description}
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
                                value={accommodation.image_gallery}
                                onChange={handleChange}
                                isInvalid={!!errors.image_gallery}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.image_gallery}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="latitud">
                            <Form.Label>Latitud</Form.Label>
                            <Form.Control
                                type="text"
                                name="latitud"
                                value={accommodation.latitud}
                                onChange={handleChange}
                                isInvalid={!!errors.latitud}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.latitud}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="longitud">
                            <Form.Label>Longitud</Form.Label>
                            <Form.Control
                                type="text"
                                name="longitud"
                                value={accommodation.longitud}
                                onChange={handleChange}
                                isInvalid={!!errors.longitud}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.longitud}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <hr/>
                        <Button variant="primary" type="submit">
                            Crear alojamiento
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default FormCreateAccommodation;