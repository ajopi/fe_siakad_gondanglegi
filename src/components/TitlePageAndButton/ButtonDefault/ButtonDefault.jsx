import React from 'react'
import '../TitlePageAndButton.css'

const ButtonDefault = (props) => {
  return (
    <button className='btn_default' onClick={props.handleFunction}>{props.titleButton}</button>

  )
}

export default ButtonDefault