import { call, put, takeEvery, all, select } from 'redux-saga/effects';
import actions, { ActionType } from 'redux/actions';
import { Open, OpenTreeItem, SaveAs, Save } from '../actions';
import { FileSystemInstance } from 'file-system';
import { RootState } from 'redux/reducers';
import { fileState } from '../states/states';
import { v4 as uuidv4 } from 'uuid';

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
  console.log(0,action.payload.fileHandler, action.payload.id)
  const fileArray = yield call(FileSystemInstance.getFileInfo.bind(FileSystemInstance), action.payload.fileHandler, action.payload.id);
  console.log(fileArray);
  yield put(actions.newEditor(fileArray));
}


function* watchFileHandlerForTreeItem() {
  yield takeEvery(ActionType.OPEN_TREE_ITEM, openFileTreeView);
}

function* watchSave() {
  yield takeEvery(ActionType.SAVE, save);
}

export function* save(action: Save) {
  const { srcIndex, editorState } = yield select((state: RootState) => { return { srcIndex: state.fileSystem.currentIndex, editorState: state.fileSystem.editorState } });
  const srcId : string = editorState[srcIndex].id;
  const srcHandler = FileSystemInstance.idToFileHandler(srcId) as FileSystemFileHandle;
  yield put(actions.saveAs(srcHandler));
}

export function* saveAs(action: SaveAs) {
  const { srcIndex, editorState } = yield select((state: RootState) => { return { srcIndex: state.fileSystem.currentIndex, editorState: state.fileSystem.editorState } });
  const srcId : string = editorState[srcIndex].id;
  const fileState = editorState.find((state: fileState) => state.id === srcId) as fileState;
  const desHandler = action.payload.destinationHandler;

  try {
    yield call(FileSystemInstance.writeToFile.bind(FileSystemInstance), desHandler, fileState.content)
  }
  catch (error) {
    console.log("write error: " + error.name);
    return
  }
  //update FileSystemInstance
  let desId: string | null = yield call(FileSystemInstance.addFileInfo.bind(FileSystemInstance), desHandler);
  let desType: "infolder" | "standalone" = "infolder";
  let ancestorId = undefined;
  if (desId === null) {
    desId = uuidv4();
    desType = "standalone";
  }else{
    ancestorId = FileSystemInstance.findIdFromSearchTable(desId)["ancestor"]?.id
  }
  yield call(FileSystemInstance.updateFileTable.bind(FileSystemInstance), [srcId], [desId], [desHandler]);

  //call state update action
  
  yield put(actions.saveAsStateUpdate(desId, desHandler.name, desType, ancestorId));
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
    watchSave(),
  ])
}