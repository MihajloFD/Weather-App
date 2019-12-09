import { ERROR_MESSAGE } from '../../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
  case ERROR_MESSAGE:
    return { ...state, errorMessage: action.payload };
  default:
    return state;
  }
}