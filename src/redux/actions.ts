import * as fileSystemActions from './file-system/action-creators';
import { ActionType as FileSystemActionType } from './file-system/actions';

export default fileSystemActions;
export * from './file-system/action-creators';
export const ActionType = FileSystemActionType;