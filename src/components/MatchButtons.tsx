import React from 'react';
import '../css/MatchButtons.css';


type ButtonProps = {
    swipee: Function,
}

export const MatchButtons = ({ swipee }: ButtonProps) => {

    return (
        <div className='match_buttons'>
            <div className='match_button_cross' onClick={() => swipee('left')} >
                <i className='bi bi-x-circle-fill bi-lg'></i>
            </div>
            <div className='match_button_check' onClick={() => swipee('right')}>
                <i className='bi bi-check-circle-fill bi-lg'></i>
            </div>
        </div>
    )
}
