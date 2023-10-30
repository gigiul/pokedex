import { all } from 'redux-saga/effects';
import { _pokemonSagas } from './pokemon/index';

export default function* rootSaga() {
    yield all([
        ..._pokemonSagas,
    ]);
}