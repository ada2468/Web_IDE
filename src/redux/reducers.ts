import { combineReducers } from 'redux';
import fileSystemReducer from  './file-system/reducers';

export const reducers =combineReducers({
    fileSystem:fileSystemReducer
})

export default reducers;

export type RootState = ReturnType<typeof reducers>;