import { OPEN_COMMENT_MODAL } from '../actions/types'

const defaultState = {
   open: false,
   commentId: ''
}

export default function (state = defaultState, action) {
   switch (action.type) {
      case OPEN_COMMENT_MODAL:
         const commentId = action.payload ? action.payload : ''
         return { open: !state.open, commentId }

      default:
         return state
   }
}