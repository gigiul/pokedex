
import { Card } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface PokemonInterface {
  name: string;
  id: number;
  image: string;
  abilities: any;
  sprites: any
}

const PokemonCard: React.FC<{ info: PokemonInterface }> = ({ info }) => {

  const navigate = useNavigate();

  return (
    <>
      <Link to={`/pokemon/${info?.id}`}>
        <div className='card'>
          <h2 className="card__title">{info?.name}</h2>
          <img className='card__image' src={info?.sprites?.front_default} alt={info?.sprites?.front_default} />
          <div className='card__abilityContainer'>
            <p>Main ability:</p>
            <p className='card__abilityContainer__ability'>{info?.abilities[0]?.ability?.name}</p>
          </div>
        </div>
      </Link>
    </>
  );
}

export default PokemonCard;
