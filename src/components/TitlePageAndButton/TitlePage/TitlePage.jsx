import React from 'react'
import '../TitlePageAndButton.css'

const TitlePage = (props) => {
  return (
    <h3 className='title_page'>
      {props.title}
    </h3>
  )
}

export default TitlePage