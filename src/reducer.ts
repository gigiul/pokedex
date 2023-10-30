import { combineReducers } from "redux";
import { pokemonReducer } from './pokemon/index'

export default combineReducers({
    pokemon: pokemonReducer
})