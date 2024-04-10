import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Container, Row, Col, Form, Button, Card, Carousel} from 'react-bootstrap';
import {Link, NavLink, useNavigate} from "react-router-dom";
import Select from 'react-select';

const Inicio = () => {
    const navigate = useNavigate();
    const [ciudades, setCiudades] = useState([]);
    const [resultadosBusqueda, setResultadosBusqueda] = useState([]);
    const [errors, setErrors] = useState({});
    const [busqueda, setBusqueda] = useState({
        ciudad: '',
        fechaInicio: '',
        fechaFin: '',
        adultos: 1,
        ninos: 0,
    });
    const [alojamientos, setAlojamientos] = useState([]);

    useEffect(() => {
        // Fetch cities for autocomplete
        axios
            .get('http://localhost:8000/api/cities')
            .then((response) => setCiudades(response.data))
            .catch((error) => console.error(error));

        // Fetch all accommodations
        axios
            .get('http://localhost:8000/api/accommodations/indexNoLoguedUser')
            .then((response) => {
                setAlojamientos(response.data);
                console.log('Alojamientos cargados:', response.data);
            })
            .catch((error) => console.error(error));
    }, []);
    const validateSearch = () => {
        const newErrors = {};
        if (!busqueda.ciudad) {
            errors.ciudad = 'Debes seleccionar una ciudad';
        }
        if (!busqueda.fechaInicio) {
            errors.fechaInicio = 'Debes seleccionar una fecha de inicio';
        }
        if (!busqueda.fechaFin) {
            errors.fechaFin = 'Debes seleccionar una fecha de fin';
        }
        if (busqueda.fechaInicio && busqueda.fechaFin) {
            if (new Date(busqueda.fechaInicio) > new Date(busqueda.fechaFin)) {
                errors.fechaInicio = 'La fecha de inicio debe ser anterior a la fecha de fin';
            }
        }
        if (!busqueda.adultos) {
            errors.adultos = 'Debes seleccionar el número de adultos';

        }
        if (busqueda.adultos && busqueda.adultos < 1) {
            errors.adultos = 'Debes seleccionar al menos un adulto';

        }
        if (busqueda.ninos && busqueda.ninos < 0) {
            errors.ninos = 'El número de niños debe ser positivo';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }
    const handleChange = (selectedOption, actionMeta) => {
        // Handle changes when a city is selected
        setBusqueda({...busqueda, ciudad: selectedOption ? selectedOption.value : ''});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'http://localhost:8000/api/buscarAlojamientos',
                busqueda
            );

            console.log('Resultados de búsqueda:', response.data);
            setResultadosBusqueda(response.data);
        } catch (error) {
            console.error(error);
        }

        setBusqueda({ciudad: '', fechaInicio: '', fechaFin: '', adultos: 1, ninos: 0,});
    };

    return (
        <Container>
            <Row className="mt-5">
                <Col>
                    <h2>Bienvenido a AirBNB</h2>
                    <p>Descubre alojamientos increíbles para tu próxima aventura.</p>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Col>
                                <Form.Label>Ciudad</Form.Label>
                                <Select
                                    options={ciudades.map((ciudad) => ({value: ciudad.name, label: ciudad.name}))}
                                    value={{value: busqueda.ciudad, label: busqueda.ciudad}}
                                    onChange={handleChange}
                                    placeholder="Selecciona una ciudad"
                                    isSearchable
                                    required
                                />
                            </Col>
                            <Col>
                                <Form.Label>Fecha de inicio</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="fechaInicio"
                                    value={busqueda.fechaInicio}
                                    onChange={(e) => setBusqueda({...busqueda, fechaInicio: e.target.value})}
                                    required
                                />
                            </Col>
                            <Col>
                                <Form.Label>Fecha de fin</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="fechaFin"
                                    value={busqueda.fechaFin}
                                    onChange={(e) => setBusqueda({...busqueda, fechaFin: e.target.value})}
                                    required
                                />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <Form.Label>Adultos</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="adultos"
                                    value={busqueda.adultos}
                                    onChange={(e) => setBusqueda({...busqueda, adultos: e.target.value})}
                                    required
                                />
                            </Col>
                            <Col>
                                <Form.Label>Niños</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="ninos"
                                    value={busqueda.ninos}
                                    onChange={(e) => setBusqueda({...busqueda, ninos: e.target.value})}
                                />
                            </Col>
                            <Col>
                                <Button variant="primary" type="submit">
                                    Buscar
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            {resultadosBusqueda.length > 0 && (
                <Row className="mt-4">
                    <Col>
                        <h3>Resultados de búsqueda</h3>
                        <Row>
                            {resultadosBusqueda.map((alojamiento) => (
                                <Col key={alojamiento.id} md={4} className="mb-4">
                                    <Card>
                                        <Carousel>
                                            {alojamiento.image_gallery.map((image, index) => (
                                                <Carousel.Item key={index}>
                                                    <img className="d-block w-100"
                                                         src={`src/img/${alojamiento.image_gallery[index]}`}
                                                         alt={`Slide ${index}`}/>
                                                </Carousel.Item>
                                            ))}
                                        </Carousel>
                                        <Card.Body>
                                            <Card.Title>{alojamiento.title}</Card.Title>
                                            <Card.Text>{alojamiento.description}</Card.Text>
                                            <Button
                                                variant="primary"
                                                onClick={() => navigate(`/accommodations/${alojamiento.id}`)}>
                                                Ver detalles
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            )}
            <Row className="mt-4">
                <Col>
                    <h3>Alojamientos Disponibles</h3>
                    <Row>
                        {alojamientos.map((alojamiento) => (
                            <Col key={alojamiento.id} md={4} className="mb-4">
                                <Card>
                                    <Carousel>
                                        {alojamiento.image_gallery.map((image, index) => (
                                            <Carousel.Item key={index}>
                                                <img className="d-block w-100"
                                                     src={`src/img/${alojamiento.image_gallery[index]}`}
                                                     alt={`Slide ${index}`}/>
                                            </Carousel.Item>
                                        ))}
                                    </Carousel>
                                    <Card.Body>
                                        <Card.Title>{alojamiento.title}</Card.Title>
                                        <Card.Text>{"Precio " + alojamiento.description}</Card.Text>
                                        <Button
                                            variant="primary"
                                            onClick={() => navigate(`/accommodations/${alojamiento.id}`)}>
                                            Ver detalles
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};
export default Inicio;