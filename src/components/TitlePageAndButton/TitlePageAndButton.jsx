import React from 'react'
import './TitlePageAndButton.css'
import TitlePage from './TitlePage/TitlePage'
import ButtonDefault from './ButtonDefault/ButtonDefault'

const TitlePageAndButton = (props) => {
    return (
        <div className='container_title_and_button_default'>
            <TitlePage title={props.title} />
            <ButtonDefault handleFunction={props.handleFunction} titleButton={props.titleButton}/>
        </div>

    )
}

export default TitlePageAndButton