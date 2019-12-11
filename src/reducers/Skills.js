import { types } from '../core/constants';

const initialState = {
  skills: []
};
export default function skills(state = initialState, action) {
  switch (action.type) {
    case types.SET_SKILLS: {
      return {
        skills: action.skills
      };
    }
    default:
      return state;
  }
}
