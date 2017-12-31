import {
   CREATE_POST,
   UPDATE_POST,
   DELETE_POST,
   CLOSE_SNACKBAR,
   UPDATE_COMMENT,
   CREATE_COMMENT,
   DELETE_COMMENT
} from '../actions/types'

const defaultState = {
   open: false,
   message: ''
}

export default function (state = defaultState, action) {
   switch (action.type) {
      case CLOSE_SNACKBAR:
         return { open: false, message: '' }

      case DELETE_POST:
         return { open: true, message: 'Post deleted' }

      case UPDATE_POST:
         return { open: true, message: 'Post updated' }

      case CREATE_POST:
         return { open: true, message: 'Post created' }

      case UPDATE_COMMENT:
         return { open: true, message: 'Comment updated' }
      
      case CREATE_COMMENT:
         return { open: true, message: 'Comment created' }

      case DELETE_COMMENT:
         return { open: true, message: 'Comment deleted' }

      default:
         return state
   }
}