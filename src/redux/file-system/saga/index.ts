import { call, put, takeEvery, all, select } from 'redux-saga/effects';
import actions, { ActionType } from 'redux/actions';
import { Open, OpenTreeItem, SaveAs } from '../actions';
import { FileSystemInstance } from 'file-system';
import { RootState } from 'redux/reducers';

export function* getDirHandler() {
  yield call(FileSystemInstance.importFolder.bind(FileSystemInstance));
  yield put(actions.importFolder({
    searchTable: FileSystemInstance.getSearchTable()
  }));
}

function* watchDirHandler() {
  yield takeEvery(ActionType.GET_DIRECTORY_HANDLER, getDirHandler);
}

export function* openFile(action: Open) {
  const fileArray = yield call(FileSystemInstance.getFileInfo.bind(FileSystemInstance), action.payload.fileHandler);
  yield put(actions.newEditor(fileArray));
}

function* watchFileHandler() {
  yield takeEvery(ActionType.OPEN, openFile);
}

export function* openFileTreeView(action: OpenTreeItem) {
  const fileArray = yield call(FileSystemInstance.getFileInfo.bind(FileSystemInstance), action.payload.fileHandler, action.payload.id);
  console.log(fileArray);
  yield put(actions.newEditor(fileArray));
}


function* watchFileHandlerForTreeItem() {
  yield takeEvery(ActionType.OPEN_TREE_ITEM, openFileTreeView);
}

export function* saveAs(action: SaveAs) {
  const { id, editorState } = yield select((state: RootState) => { return { id: state.fileSystem.currentId, editorState: state.fileSystem.editorState } })
  const saveHandler = action.payload.handler;
  
}


function* watchSaveAs() {
  yield takeEvery(ActionType.SAVE_AS, saveAs);
}



export default function* rootSaga() {
  yield all([
    watchDirHandler(),
    watchFileHandler(),
    watchFileHandlerForTreeItem(),
    watchSaveAs(),
  ])
}