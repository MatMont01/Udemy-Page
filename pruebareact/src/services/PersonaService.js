import axios from "axios";

export const getListaPersonas = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:8000/api/personas', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                resolve(response.data);
            }).catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}