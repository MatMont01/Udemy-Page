import axios from "axios";
import {useEffect} from "react";
import {Container, Nav, NavDropdown, Navbar} from "react-bootstrap";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clearUserInfo, setUserRoles} from "../redux/slices/userSlice";


const Menu = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const email = useSelector((state) => state.user.email);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    const paginasSinSesion = ["/login", "/register"]; // Definición de paginasSinSesion

    const fetchUserInfo = () => {
        axios
            .get("http://localhost:8000/api/me", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                dispatch(
                    setUserRoles({
                        roles: response.data.parsedRoles,
                        isAdmin: response.data.parsedRoles.includes("admin"),
                        isClient: response.data.parsedRoles.includes("client"),
                        isLoggedIn: true,
                        email: response.data.email,
                    })
                );
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onCerrarSesionClick = () => {
        localStorage.removeItem("token");
        dispatch(clearUserInfo());
        navigate("/login");
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        //if (!isLoggedIn) {
        // if (!token && !paginasSinSesion.includes(window.location.pathname)) {
        //     navigate("/login");
        // } else {
        //     fetchUserInfo();
        // }
        //}
    }, [isLoggedIn, navigate]);

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-3">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    AirBNB
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink className="nav-link" to="/">
                            Inicio
                        </NavLink>

                        {isLoggedIn && (
                            <>
                                <NavDropdown title="Alojamientos" id="basic-nav-dropdown">

                                    <NavLink to={"/accommodations/MyAccommodations"} className="dropdown-item">
                                        Mis alojamientos
                                    </NavLink>

                                    <NavLink to={"/accommodations/create"} className="dropdown-item">
                                        Crear alojamiento
                                    </NavLink>
                                </NavDropdown>

                                <NavLink className="nav-link" to="/reservations">
                                    Reservas
                                </NavLink>

                                {email && (
                                    <NavDropdown
                                        className="d-flex"
                                        title={email}
                                        id="basic-nav-dropdown"
                                    >
                                        <button
                                            className="dropdown-item text-start"
                                            onClick={onCerrarSesionClick}
                                        >
                                            Cerrar sesión
                                        </button>
                                    </NavDropdown>
                                )}
                            </>
                        )}

                        {!isLoggedIn && (
                            <>
                                <NavLink className="nav-link" to="/login">
                                    Login
                                </NavLink>
                                <NavLink className="nav-link" to="/register">
                                    Register
                                </NavLink>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Menu;
