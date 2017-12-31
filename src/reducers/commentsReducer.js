import _ from 'lodash'
import {
   GET_COMMENTS,
   UP_VOTE_COMMENT,
   DOWN_VOTE_COMMENT,
   UPDATE_COMMENT,
   CREATE_COMMENT,
   DELETE_COMMENT
} from '../actions/types'

export default function (state = {}, action) {
   switch (action.type) {
      case GET_COMMENTS:
         const sort = _.sortBy(action.payload, 'voteScore').reverse()
         return { ...state, ..._.mapKeys(sort, 'id') }

      case UPDATE_COMMENT:
      case CREATE_COMMENT:
         return { ...state, [action.payload.id]: action.payload }

      case DOWN_VOTE_COMMENT:
      case UP_VOTE_COMMENT:
         const votes = { ...state, [action.payload.id]: action.payload }
         const sortVotes = _.sortBy(votes, ['voteScore', 'timestamp']).reverse()
         return { ..._.mapKeys(sortVotes, 'id') }

      case DELETE_COMMENT:
         return _.omit(state, action.payload)

      default:
         return state
   }
}