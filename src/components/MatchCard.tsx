import React from 'react';
import TinderCard from 'react-tinder-card';

import "../css/MatchCard.css";
import { Animal } from '../interfaces/animales';

type CardProps = {
    animal: Animal,
    functions: Function[],
    index: number,
    currRef: any
}

const MatchCard = ({ animal , functions, index, currRef}: CardProps) => {

    const [swiped, outOfFrame] = functions;
    console.log(currRef);

    return (
        <TinderCard
            ref={currRef}
            className='swipe'
            key={animal.name}
            onSwipe={(dir) => swiped(dir, index)}
            onCardLeftScreen={() => outOfFrame(index)}
            preventSwipe={['up', 'down']}
        >
        <div 
            className="tinder_card " 
            style={{ backgroundImage: `url(${animal.image})` }}
        >
            <h2 className="tinder_card_name ">
                {animal.name}
            </h2>
        </div>
        </TinderCard>
    )
}

export default MatchCard
