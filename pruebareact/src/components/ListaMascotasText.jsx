import { getTipoForDisplay } from "../utilities/MascotaUtilities";
import PropTypes from 'prop-types';
const ListaMascotasText = ({persona}) => {

    return ( <>
        {persona.mascotas && persona.mascotas.map(item =>
            <div key={"div" + item.id}>
                <b>{getTipoForDisplay(item.tipo)}: </b>{item.nombre}
            </div>
        )}
    </> );
}
ListaMascotasText.propTypes = {
    persona: PropTypes.shape({
        mascotas: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            nombre: PropTypes.string.isRequired,
            tipo: PropTypes.number.isRequired
        })).isRequired
    }).isRequired
}
export default ListaMascotasText;