import postsReducer from '../../reducers/postsReducer'
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
} from '../../actions/types'

describe('Test postsReducer', () => {
   let state = {}
   let posts = [
      { 'id': '8xf', 'timestamp': 1468, 'title': 'Udacity', 'body': '', 'author': 'me', 'category': 'react', 'voteScore': -6, 'commentCount': 2 },
      { 'id': '6ni', 'timestamp': 1467, 'title': 'Learn ', 'body': '', 'author': 'ypu', 'category': 'redux', 'voteScore': 5, 'commentCount': 0 }
   ]

   it('checks if returns the default state when !state && when the action is different', () => {
      state = postsReducer(undefined, { type: 'some_action_type' })
      expect(state).toEqual({})
   })

   it('checks the reducer for GET_POST', () => {
      state = postsReducer(state, { type: GET_POST, payload: posts[0] })
      expect(state['8xf']).toEqual(posts[0])
   })

   it('checks the reducer for GET_POSTS', () => {
      state = postsReducer(state, { type: GET_POSTS, payload: posts })
      expect(state['6ni']).toEqual(posts[1])
   })

   it('checks the reducer for UP_VOTE', () => {
      const upVoted = posts[0]
      upVoted.voteScore = 2

      state = postsReducer(state, { type: UP_VOTE, payload: upVoted })
      expect(state['8xf'].voteScore).toEqual(2)
   })

   it('checks the reducer for DOWN_VOTE', () => {
      const downVoted = posts[0]
      downVoted.voteScore = 1

      state = postsReducer(state, { type: DOWN_VOTE, payload: downVoted })
      expect(state['8xf'].voteScore).toEqual(1)
   })

   it('checks the reducer for CREATE_POST', () => {
      const newPost = Object.assign({}, posts[0])
      newPost.id = 'asdf'

      state = postsReducer(state, { type: CREATE_POST, payload: newPost })
      expect(state['asdf'].id).toEqual('asdf')
   })

   it('checks the reducer for UPDATE_POST', () => {
      const firstKey = Object.keys(state)[0]
      const updated = state[firstKey]

      updated.author = 'asdf'
      state = postsReducer(state, { type: UPDATE_POST, payload: updated })
      expect(state[firstKey].author).toEqual('asdf')
   })

   it('checks the reducer for DEconstE_POST', () => {
      state = postsReducer(state, { type: DELETE_POST, payload: 'asdf' })
      expect(state['asdf']).toEqual(undefined)
   })

   it('checks the reducer for SORT_BY_RATING', () => {
      expect(Object.keys(state)[0]).toEqual('8xf')
      state = postsReducer(state, { type: SORT_BY_RATING })
      expect(Object.keys(state)[0]).toEqual('6ni')
   })

   it('checks the reducer for SORT_BY_DATE', () => {
      expect(Object.keys(state)[0]).toEqual('6ni')
      state = postsReducer(state, { type: SORT_BY_DATE })
      expect(Object.keys(state)[0]).toEqual('8xf')
   })

   it('checks the reducer for SORT_BY_TITLE', () => {
      expect(Object.keys(state)[0]).toEqual('8xf')
      state = postsReducer(state, { type: SORT_BY_TITLE })
      expect(Object.keys(state)[0]).toEqual('6ni')
   })
})