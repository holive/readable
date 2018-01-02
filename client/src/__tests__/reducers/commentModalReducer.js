import commentModalReducer from '../../reducers/commentModalReducer'
import { OPEN_COMMENT_MODAL } from '../../actions/types'

describe('Test commentModalReducer', () => {
   let state = []
   const defaultState = {
      open: false,
      commentId: ''
   }

   it('checks if returns the default state when !state && when the action is different', () => {
      state = commentModalReducer(undefined, { type: 'some_action_type' })
      expect(state).toEqual(defaultState)
   })

   it('checks the reducer for OPEN_COMMENT_MODAL when !commentId', () => {
      state = commentModalReducer(state, { type: OPEN_COMMENT_MODAL, payload: 'asdf' })
      expect(state.commentId).toEqual('asdf')
   })

   it('checks the reducer for OPEN_COMMENT_MODAL when !commentId', () => {
      state = commentModalReducer(state, { type: OPEN_COMMENT_MODAL, payload: '' })
      expect(state.open).toEqual(false)
   })
})