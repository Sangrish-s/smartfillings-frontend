import { legacy_createStore as createStore, combineReducers } from 'redux';
import { fileReducer } from './files.reducer';

export interface RootState {
    file: any;
}

const rootReducer = combineReducers<RootState>({
    file: fileReducer,
});

const store = createStore(rootReducer);

export default store;