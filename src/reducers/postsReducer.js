import _ from 'lodash'
import {
   GET_POST,
   GET_POSTS,
   UP_VOTE,
   DOWN_VOTE,
   CREATE_POST,
   UPDATE_POST,
   DELETE_POST,
   SORT_BY_RATING,
   SORT_BY_DATE,
   SORT_BY_TITLE
} from '../actions/types'

export default function (state = {}, action) {
   switch (action.type) {
      case GET_POSTS:
         const sort = _.sortBy(action.payload, 'voteScore').reverse()
         const posts = _.mapKeys(sort, 'id')
         return { ...state, ...posts }

      case GET_POST:
      case CREATE_POST:
      case UPDATE_POST:
      case UP_VOTE:
      case DOWN_VOTE:
         return { ...state, [action.payload.id]: action.payload }

      case DELETE_POST:
         return _.omit(state, action.payload)

      case SORT_BY_RATING:
         const sortVotescore = _.sortBy(state, ['voteScore', 'timestamp']).reverse()
         return _.mapKeys(sortVotescore, 'id')

      case SORT_BY_DATE:
         const sortTimestamp = _.sortBy(state, 'timestamp').reverse()
         return _.mapKeys(sortTimestamp, 'id')

      case SORT_BY_TITLE:
         const sortByTitle = _.sortBy(state, [post => post.title.toLowerCase()], ['desc'])
         return _.mapKeys(sortByTitle, 'id')

      default:
         return state
   }
}