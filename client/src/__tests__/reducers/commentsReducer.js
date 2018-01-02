import commentsReducer from '../../reducers/commentsReducer'
import {
   GET_COMMENTS,
   UP_VOTE_COMMENT,
   DOWN_VOTE_COMMENT,
   UPDATE_COMMENT,
   CREATE_COMMENT,
   DELETE_COMMENT
} from '../../actions/types'

describe('Test commentsReducer', () => {
   let state = {}
   let comments = [{ 'id': '1234', 'timestamp': 1234, 'body': '', 'voteScore': 1, 'parentId': 'asdf' }]
   let expected = { 1234: comments[0] }

   it('checks if returns the default state when !state && when the action is different', () => {
      state = commentsReducer(undefined, { type: 'some_action_type' })
      expect(state).toEqual({})
   })

   it('checks the reducer for GET_COMMENTS', () => {
      state = commentsReducer(state, { type: GET_COMMENTS, payload: comments })
      expect(state).toEqual(expected)
   })

   it('checks the reducer for UP_VOTE_COMMENT', () => {
      const upVoted = comments[0]
      upVoted.voteScore = 2
      state = commentsReducer(state, { type: UP_VOTE_COMMENT, payload: upVoted })
      expect(state[1234].voteScore).toEqual(2)
   })

   it('checks the reducer for DOWN_VOTE_COMMENT', () => {
      const downVoted = comments[0]
      downVoted.voteScore = 1
      state = commentsReducer(state, { type: DOWN_VOTE_COMMENT, payload: downVoted })
      expect(state[1234].voteScore).toEqual(1)
   })

   it('checks the reducer for UPDATE_COMMENT', () => {
      const updated = comments[0]
      updated.body = 'some value'
      state = commentsReducer(state, { type: UPDATE_COMMENT, payload: updated })
      expect(state[1234].body).toEqual('some value')
   })

   it('checks the reducer for CREATE_COMMENT', () => {
      state = commentsReducer({}, { type: CREATE_COMMENT, payload: comments[0] })
      expect(state[1234].id).toEqual('1234')
   })

   it('checks the reducer for DELETE_COMMENT', () => {
      state = commentsReducer(state, { type: DELETE_COMMENT, payload: state[1234].id })
      expect(state).toEqual({})
   })
})