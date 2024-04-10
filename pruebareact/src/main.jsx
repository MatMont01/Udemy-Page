import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import ProfilePicture from './pages/personas/ProfilePicture.jsx';
import MascotaList from './pages/mascotas/MascotaList.jsx';
import FormPersona from './pages/personas/FormPersona.jsx';
import PersonaList from './pages/personas/PersonaList.jsx';
import FormMascota from './pages/mascotas/FormMascota.jsx';
import DetallesAlojamiento from './pages/accommodations/DetallesAlojamientos.jsx';
import MyAccommodations from "./pages/accommodations/MyAccommodations.jsx";
import FormEditAccommodation from './pages/accommodations/FormEditAccommodation.jsx';
import ReservationLogued from './pages/reservations/ReservationLogued.jsx';
import ResultadosBuscador from './pages/accommodations/ResultadosBuscador.jsx';
//import CrearAlojamiento from './pages/accommodations/FormCreateAccommodation.jsx';
//import ListaMisAlojamientos from './pages/accommodations/MyAccommodations.jsx';
import FormLogin from './pages/auth/FormLogin.jsx';
import FormRegister from './pages/auth/FormRegister.jsx';
import MapPage from './pages/MapPage.jsx';
import Footer from "./components/Footer.jsx";
import Inicio from "./pages/accommodations/Inicio.jsx";
import {store} from './redux/store.js';
import {Provider} from 'react-redux';
import FormCreateAccommodation from "./pages/accommodations/FormCreateAccommodation.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: '/personas',
        element: <PersonaList/>
    },
    {
        path: '/personas/create',
        element: <FormPersona/>
    },
    {
        path: '/personas/:id',
        element: <FormPersona/>
    },
    {
        path: '/personas/:id/profile-picture',
        element: <ProfilePicture/>
    },
    {
        path: '/mascotas',
        element: <MascotaList/>
    },
    {
        path: '/mascotas/create',
        element: <FormMascota/>
    },
    {
        path: '/mascotas/:id',
        element: <FormMascota/>
    },
    {
        path: '/login',
        element: <FormLogin/>
    },
    {
        path: '/register',
        element: <FormRegister/>
    },
    {
        path: '/map/:id',
        element: <MapPage/>
    },
    {
        path: '/footer',
        element: <Footer/>
    },
    {
        path: '/inicio',
        element: <Inicio/>
    },
    {
        path: '/accommodations/:id',
        element: <DetallesAlojamiento/>
    },
    {
        path: '/accommodations/MyAccommodations',
        element: <MyAccommodations/>
    },
    {
        path: '/accommodations/create',
        element: <FormCreateAccommodation/>
    },
    {
        path: '/accommodations/edit/:id',
        element: <FormEditAccommodation/>
    },
    {
        path: '/reservations',
        element: <ReservationLogued/>
    },
    {
        path: '/accommodations/results',
        element: <ResultadosBuscador/>
    },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>,
)
