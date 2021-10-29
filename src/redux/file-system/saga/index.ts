import { call, put, takeEvery, all } from 'redux-saga/effects';
import actions, { ActionType } from 'redux/actions';
import { fileArrayType } from 'redux/file-system/actions';
import { Open, OpenTreeItem } from '../actions';
import { FileSystemInstance } from 'file-system';


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
  const idArray: Array<string> = yield call(FileSystemInstance.storeFileHandlers.bind(FileSystemInstance), action.payload.fileHandler);
  const contentArray: Array<{ name: string, content: string }> = yield call(FileSystemInstance.readFileContent.bind(FileSystemInstance), action.payload.fileHandler);
  let fileArray: fileArrayType=[];
  for (let i = 0; i < idArray.length; i++) {
    fileArray.push({
      id:idArray[i],
      name:contentArray[i].name,
      content:contentArray[i].content,
    })
  }
  yield put(actions.newEditor(fileArray));
}

function* watchFileHandler() {
  yield takeEvery(ActionType.OPEN, openFile);
}

export function* openFileTreeView(action:OpenTreeItem){
  const idArray = action.payload.id;
  const contentArray: Array<{ name: string, content: string }> = yield call(FileSystemInstance.readFileContent.bind(FileSystemInstance), action.payload.fileHandler);
  let fileArray: fileArrayType=[];
  for (let i = 0; i < idArray.length; i++) {
    fileArray.push({
      id:idArray[i],
      name:contentArray[i].name,
      content:contentArray[i].content,
    })
  }
  yield put(actions.newEditor(fileArray));
}


function* watchFileHandlerForTreeItem() {
  yield takeEvery(ActionType.OPEN_TREE_ITEM, openFileTreeView);
}

export default function* rootSaga() {
  yield all([
    watchDirHandler(),
    watchFileHandler(),
    watchFileHandlerForTreeItem(),
  ])
}