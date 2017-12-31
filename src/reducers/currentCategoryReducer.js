import { CURRENT_CATEGORY } from '../actions/types'

export default function (state = 'all', action) {
   switch (action.type) {
      case CURRENT_CATEGORY:
         return action.payload

      default:
         return state
   }
}
