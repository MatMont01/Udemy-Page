// BuscadorAlojamientos.jsx
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const BuscadorAlojamientos = ({ onSearch }) => {
    const [ciudad, setCiudad] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [adultos, setAdultos] = useState(1);
    const [ninos, setNinos] = useState(0);

    const handleSearch = () => {
        // Lógica para realizar la búsqueda
        onSearch({
            ciudad,
            fechaInicio,
            fechaFin,
            adultos,
            ninos,
        });
    };

    return (
        <Form>
            {/* Elementos del buscador (ciudad, fechas, adultos, niños) */}
            {/* ... (puedes utilizar los componentes de react-bootstrap) */}
            <Button variant="primary" onClick={handleSearch}>
                Buscar
            </Button>
        </Form>
    );
};

export default BuscadorAlojamientos;