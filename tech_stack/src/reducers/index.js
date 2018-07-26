import { combineReducers } from 'redux';
import LibraryReducers from './LibraryReducers';
import SelectionReducer from './SelectionReducer';

export default combineReducers({
  libraries: LibraryReducers,
  selectedLibraryId: SelectionReducer
});
