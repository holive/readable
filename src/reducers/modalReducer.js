import { OPEN_MODAL } from '../actions/types'

const defaultState = {
   open: false,
   postId: ''
}

export default function (state = defaultState, action) {
   switch (action.type) {
      case OPEN_MODAL:
         const postId = action.payload ? action.payload : ''
         return { ...state, open: !state.open, postId: postId }

      default:
         return state
   }
}