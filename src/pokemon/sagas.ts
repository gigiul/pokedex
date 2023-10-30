import { put, fork, takeLatest, call, select } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';
import { pokemonActions, pokemonSelectors } from '.';

//creo un azione per il fetch iniziale su index.tsx
export const fetchInitialData = createAction('fetchInitialData');


function* fetchInitialDataSaga(): any {
    console.log("Fetching initial data - saga effect")
    const pokemonList = []
    try {
        let response = yield call(fetch, 'https://pokeapi.co/api/v2/pokemon?limit=50')
        if (response.status === 200) {
            let data = yield response.json()
            yield put(pokemonActions.setNextUrl(data.next))
            let results = data.results;
            for (let i = 0; i < results.length; i++) {
                let pokemonResponse = yield call(fetch, results[i].url)
                let pokemonData = yield pokemonResponse.json()
                pokemonList.push(pokemonData)
            }
            yield put(pokemonActions.setInitialPokemon(pokemonList))
            yield put(pokemonActions.setIsLoadingPokemonList(false))

        }
    } catch (e) {
        console.log("FetchInitialDataSaga - Error", e)
        yield put(pokemonActions.setIsErrorPokemonList(e))
    }
}

function* fetchDescription(id: string): any {
    let response = yield call(fetch, `https://pokeapi.co/api/v2/pokemon-species/${id}`);
    if (response.status === 200) {
        let results = yield response.json();

        const description = results.flavor_text_entries.find((item: any) =>
            item.version.name === 'omega-ruby' && item.language.name === 'en'
        );
        if (description) {
            return description.flavor_text;
        }
    }
}

function* fetchWeakness(url: string): any {
    let response = yield call(fetch, url)
    if (response.status === 200) {
        let results = yield response.json();
        let weakness = results.damage_relations.double_damage_from;
        if (weakness) {
            return weakness;
        }
    }
}



function* fetchPokemonDetailSaga(action: { type: string, payload: string }): any {
    yield put(pokemonActions.setIsLoadingPokemonDetail(true))

    try {
        let response = yield call(fetch, `https://pokeapi.co/api/v2/pokemon/${action.payload}`)
        if (response.status === 200) {
            let description = yield call(fetchDescription, action.payload)
            let results = yield response.json();
            results.description = description;
            results = { ...results, moves: results.moves.splice(0, 3) }
            for (let i = 0; i < results.moves.length; i++) {
                let response = yield call(fetch, results.moves[i].move.url)
                let result = yield response.json()
                results.moves[i] = result
            }
            let weaknesses = yield call(fetchWeakness, results.types[0].type.url)
            results.weaknesses = weaknesses ? weaknesses : null
            yield put(pokemonActions.setPokemonDetail(results))
            yield put(pokemonActions.setIsLoadingPokemonDetail(false))
        }
    } catch (e) {
        console.log("FetchPokemonDetailSaga - Error", e)
        yield put(pokemonActions.setIsErrorPokemonDetail(e))

    }
}

function* fetchNextPokemons(): any {
    let pokemonList = []

    try {
        let url = yield select(pokemonSelectors.getNextUrl)
        let response = yield call(fetch, url)
        if (response.status === 200) {
            let data = yield response.json()
            yield put(pokemonActions.setNextUrl(data.next))
            let results = data.results;
            for (let i = 0; i < results.length; i++) {
                let pokemonResponse = yield call(fetch, results[i].url)
                let pokemonData = yield pokemonResponse.json()
                pokemonList.push(pokemonData)
            }
            yield put(pokemonActions.setNextPokemon(pokemonList))
        }
    } catch (e) {
        console.log(e)
    }
}


//=====================================
//  WATCHERS
//-------------------------------------


function* watchFetchInitialData() {
    yield takeLatest(fetchInitialData.type, fetchInitialDataSaga)
}

function* watchFetchPokemonDetail() {
    yield takeLatest(pokemonActions.fetchPokemonDetail.type, fetchPokemonDetailSaga)
}

function* watchFetchNextPokemons() {
    yield takeLatest(pokemonActions.fetchNextPokemons.type, fetchNextPokemons)
}


//=====================================
//  SAGAS
//-------------------------------------

export const pokemonSagas = [
    fork(watchFetchInitialData),
    fork(watchFetchPokemonDetail),
    fork(watchFetchNextPokemons),
]

//=====================================
//  FLOWS
//-------------------------------------

export const pokemonFlows = {
    pokemonSagas
}