import { call, put, takeEvery, all } from 'redux-saga/effects';
import actions, { ActionType } from 'redux/actions';
import { FileSystemInstance } from 'file-system';

export function* getDirHandler() {
  yield call(FileSystemInstance.importFolder.bind(FileSystemInstance));
  yield put(actions.importFolder({
    searchTable: FileSystemInstance.getSearchTable()
  }));
}

function* watchDirHandler() {
  yield takeEvery(ActionType.GET_DIRECTORY_HANDLER, getDirHandler)
}

export default function* rootSaga() {
  yield all([
    watchDirHandler(),
  ])
}