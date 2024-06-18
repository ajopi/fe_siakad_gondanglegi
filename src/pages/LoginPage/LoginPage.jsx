import React, { useState } from 'react'
import './LoginPage.css'
import Logo from '../../img/favicon-1 1.png'
import { useNavigate } from 'react-router-dom'
import authServices from '../../Services/auth.services'

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");



  console.log(username);
  console.log(password);
  const accessLvl = parseInt(sessionStorage.getItem("accessLevel"));

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      authServices.loginUser(username, password).then(() => {
        console.log("login success!");

        if (accessLvl === 1) {
          navigate("/permohonan-surat");
        } else {
          navigate("/kelola-aktivitas-admin");
        }
      })
    } catch (error) {
      alert(error.message);
    }

  }


  return (
    <div className='containerLoginPage'>
      <div className='container_content'>
        <img src={Logo} alt='logo' />
        <h3 className='title_login'> SIAKAD <br />
          SISTEM INFORMASI AKADEMIK <br />
          SMK MUTU</h3>

        <div className='container_form' >
          <h4 className='text1'>Login</h4>
          <p className='text2'> Login menggunakan akun yang sudah anda miliki</p>

          <form className='form_group' onSubmit={handleLogin}>
            <label htmlFor='username' className='label_username'>Username</label>
            <input type='text' id='username' className='input_field' placeholder='Masukkan Username Anda!' value={username} onChange={(e) => setUsername(e.target.value)} required />

            <label htmlFor='password' className='label_username'>Password</label>
            <input type='password' id='password' className='input_field' placeholder='Masukkan Password Anda!' value={password} onChange={(e) => setPassword(e.target.value)} required />

            <button type="submit" className='btn_login'>Login</button>
          </form>

          <button className='forgot_pass'>lupa password?</button>

        </div>
      </div>

    </div>
  )
}

export default LoginPage