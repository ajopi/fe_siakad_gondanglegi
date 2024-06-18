import axios from 'axios'

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
            // const idUser = sessionStorage.getItem('userId');
            sessionStorage.setItem('token', response.data.token);
            sessionStorage.setItem('userId', JSON.stringify(response.data.user.id));
            
        })
        .catch((error) => {
            console.log(error);
        });
}

const logoutUser = () => {

}

const authServices = {
    loginUser,
    logoutUser
}

export default authServices