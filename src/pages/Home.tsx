import React, { useEffect } from 'react'
import PokemonCard from '../components/PokemonCard'
import { useDispatch, useSelector } from 'react-redux';
import { pokemonSelectors, pokemonActions } from '../pokemon/index'
import { Spin } from 'antd';

interface Props {
  pokemon: any
}

const Home: React.FC<Props> = ({pokemon}) => {

  const isLoading = useSelector(pokemonSelectors.getisLoadingPokemonList)
  const dispatch = useDispatch();

  const isActive = useSelector(pokemonSelectors.getButton)


  const handleScroll = () => {
    if (isLoading || Math.round(window.innerHeight + document.documentElement.scrollTop) !== (document.documentElement.offsetHeight)) {
      return;
    }
    console.log("fetchNextPokemons")
    dispatch(pokemonActions.fetchNextPokemons())
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading])



  return (
    <div className='home'>
      <h1 className='home__title'>Pokedex</h1>
      {
        !isLoading ? (
          <>
{/*            <button onClick={() => dispatch(pokemonActions.setButton())} style={isActive ? {backgroundColor: 'blue'} : {backgroundColor: 'red'}}>I'm persistent!</button>
 */}            <div className='home__grid'>
              {pokemon?.map((item: any, k: any) => {
                return (
                  <div key={k}>
                    <PokemonCard info={item} />
                  </div>
                )
              })}
            </div>
            <Spin style={{display: 'flex', justifyContent: 'center', marginTop: '1rem'}}/>
          </>) : (
          <div style={{display: 'flex', flexDirection:'column', justifyContent:'center'}}>
            <p>Loading. . .</p>
            <Spin />
          </div>
        )
      }
    </div>
  )
}

export default Home