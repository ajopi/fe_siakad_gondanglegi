import axios from 'axios'
const token = sessionStorage.getItem('token');

const loginUser = (username, password) => {
    let data = JSON.stringify({
        username,
        password
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/login`,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        data: data
    };

    return axios.request(config)
        .then((response) => {
            console.log(response.data.user);
            sessionStorage.setItem('accessLevel', response.data.user.access_level)
            sessionStorage.setItem('token', response.data.token);
            sessionStorage.setItem('userId', JSON.stringify(response.data.user.id));
            sessionStorage.setItem('user', JSON.stringify(response.data.user))
        })
        .catch((error) => {
            console.log(error);
            alert("login gagal")
        });
}


const logoutUser = () => {
    try {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('accessLevel');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('user');
        window.location.replace('/')
    } catch (error) {
        alert(error.message)
    }

}

const handleDeleteSurat = (id) => {
    let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/dinas/${id}/delete`,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-access-token': token
        }
    };

    axios.request(config)
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}

const handleDeleteAktivitas = (id) => {
    const token = sessionStorage.getItem('token');

    let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/activ/${id}/delete`,
        headers: {
            'x-access-token': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    };

    axios.request(config)
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });

}

const handleDeleteGuru = (id) => {
    let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/guru/${id}/delete`,
        headers: {
            'x-access-token': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    axios.request(config)
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });

}

const handleDeleteSiswa = (id) => {
    const FormData = require('form-data');
    let data = new FormData();
    let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/siswa/${id}/delete`,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-access-token': token,
        },
        data: data
    };

    axios.request(config)
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });

}

const handleDeletePenilaian = (id) => {
    let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/penilaian/${id}/delete`,
        headers: {
            'x-access-token': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    axios.request(config)
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });

}
const authServices = {
    loginUser,
    logoutUser,
    handleDeleteSurat,
    handleDeleteAktivitas,
    handleDeleteGuru,
    handleDeleteSiswa,
    handleDeletePenilaian
}

export default authServices