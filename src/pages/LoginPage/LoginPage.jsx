import React from 'react'
import './LoginPage.css'
import Logo from '../../img/favicon-1 1.png'

const LoginPage = () => {
  return (
    <div className='containerLoginPage'>
      <div className='container_content'>
        <img src={Logo} alt='logo' />
        <h3 className='title_login'> SIAKAD <br />
          SISTEM INFORMASI AKADEMIK <br />
          SMK MUTU</h3>

        <div className='container_form'>
          <h4 className='text1'>Login</h4>
          <p className='text2'> Login menggunakan akun yang sudah anda miliki</p>

          <form className='form_group'>
            <label for='username' className='label_username'>Username</label><br />
            <input type='text' id='username' className='input_field'/><br />

            <label for='password' className='label_username'>Password</label><br />
            <input type='password' id='password' className='input_field' /><br />
          </form>

          <button className='forgot_pass'>lupa password?</button>
          <button className='btn_login'>Login</button>
        </div>
      </div>

    </div>
  )
}

export default LoginPage