import { createSlice } from '@reduxjs/toolkit';

interface PokemonState {
    pokemon: InitialState
}

interface InitialState {
    pokemonList: any;
    isLoadingPokemonList: boolean;
    isErrorPokemonList: {};
    pokemonDetail: {},
    isLoadingPokemonDetail: boolean;
    isErrorPokemonDetail: {},
    nextUrl: string;

    button: boolean;
}

const initialState: InitialState = {
    pokemonList: [],
    isLoadingPokemonList: true,
    isErrorPokemonList: {},

    pokemonDetail: {},
    isLoadingPokemonDetail: true,
    isErrorPokemonDetail: {},

    nextUrl: "",

    button: false,

}

const slice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        setInitialPokemon: (state, action) => {
            state.pokemonList = action.payload;
        },
        setPokemonDetail: (state, action) => {
            state.pokemonDetail = action.payload;
        },
        fetchPokemonDetail: (state, action) => {
            return
        },
        fetchMoveDetail: (state, action) => {
            return
        },
        setIsLoadingPokemonList: (state, action) => {
            state.isLoadingPokemonList = action.payload;
        },
        setIsErrorPokemonList: (state, action) => {
            state.isErrorPokemonList = action.payload;
        },
        setIsLoadingPokemonDetail: (state, action) => {
            state.isLoadingPokemonDetail = action.payload;
        },
        setIsErrorPokemonDetail: (state, action) => {
            state.isErrorPokemonDetail = action.payload;
        },
        setNextUrl: (state, action) => {
            state.nextUrl = action.payload;
        },
        fetchNextPokemons: (state) => {
            return
        },
        setNextPokemon: (state, action) => {
            state.pokemonList = state.pokemonList.concat(action.payload)
        },
        setButton: (state) => {
            state.button = !state.button
        }
    }
})

const getAllPokemon = (state: PokemonState) => state.pokemon.pokemonList;
const getisLoadingPokemonList = (state: PokemonState) => state.pokemon.isLoadingPokemonList;
const getIsLoadingPokemonDetail = (state: PokemonState) => state.pokemon.isLoadingPokemonDetail;

const getNextUrl = (state: PokemonState) => state.pokemon.nextUrl;

const getButton = (state: PokemonState) => state.pokemon.button

export const selectors = {
    getAllPokemon,
    getisLoadingPokemonList,
    getIsLoadingPokemonDetail,
    getNextUrl,
    getButton,
}


export const { actions, reducer } = slice;