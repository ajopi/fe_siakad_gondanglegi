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
            // console.log(response.data.user);
        

            sessionStorage.setItem('accessLevel', response.data.user.access_level)
            sessionStorage.setItem('token', response.data.token);
            sessionStorage.setItem('userId', JSON.stringify(response.data.user.id));

        })
        .catch((error) => {
            console.log(error);
            alert("login gagal")
        });
}

const logoutUser = () => {

}

const authServices = {
    loginUser,
    logoutUser
}

export default authServices