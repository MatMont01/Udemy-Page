import React, {useState, useEffect,} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {Card, CardBody, Carousel, Col, Container, Row} from 'react-bootstrap';
import Menu from '../components/Menu';
import axios from "axios";
import {useParams} from "react-router-dom";

const MapPage = ({google}) => {
    const {id} = useParams();
    const [alojamiento, setAlojamiento] = useState(null);
    const [showInfoWindow, setShowInfoWindow] = useState(false);
    const [activeMarker, setActiveMarker] = useState(null);

    const onMarkerClick = (props, marker, e) => {
        console.log('onMarkerClick');
        setActiveMarker(marker);
        setShowInfoWindow(true);
    };

    const onInfoWindowClose = () => {
        console.log('onInfoWindowClose');
    };

    useEffect(() => {
        // Obtener detalles del alojamiento
        axios
            .get(`http://localhost:8000/api/accommodations/${id}`)
            .then((response) => {
                setAlojamiento(response.data);
                console.log('latitud:', response.data.latitud);
                console.log('longitud:', response.data.longitud);
            })
            .catch((error) => console.error(error));
    }, [id]);

    return (
        <>
            <Menu/>
            <Container>
                <Row className="mt-3 mb-3">
                    <Col md={{span: 8, offset: 2}}>
                        <Card>
                            <CardBody>
                                <div className="mapContainer">
                                    {alojamiento ? (
                                        <Map
                                            google={google}
                                            zoom={14}
                                            style={{width: '100%', height: '100%', position: 'relative'}}
                                            initialCenter={{lat: -17.783482, lng: -63.181837}}
                                        >
                                            <Marker
                                                position={{lat: alojamiento.latitud, lng: alojamiento.longitud}}
                                                onClick={onMarkerClick}
                                            />
                                            <InfoWindow
                                                marker={activeMarker}
                                                visible={showInfoWindow}
                                                onClose={onInfoWindowClose}
                                            >
                                                <div>
                                                    <h1>{alojamiento.title}</h1>
                                                    <Carousel>
                                                        {alojamiento.image_gallery.map((image, index) => (
                                                            <Carousel.Item key={index}>
                                                                <img
                                                                    className="d-block w-100"
                                                                    src={`/src/img/${alojamiento.image_gallery[index]}`}
                                                                    alt={`Slide ${index}`}
                                                                />
                                                            </Carousel.Item>
                                                        ))}
                                                    </Carousel>
                                                </div>
                                            </InfoWindow>
                                        </Map>
                                    ) : (
                                        <p>Cargando alojamiento...</p>
                                    )}
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

const API_KEY = 'AIzaSyAAmC6UQdG0MO9rRPq9dGNCQnhtKh9Kuiw';

export default GoogleApiWrapper({
    apiKey: API_KEY,
})(MapPage);