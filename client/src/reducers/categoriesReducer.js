import { CATEGORIES } from '../actions/types'

export default function (state = [], action) {
   switch (action.type) {
      case CATEGORIES:
         return action.payload.map(c => c.name)

      default:
         return state
   }
}

export const asdf = []