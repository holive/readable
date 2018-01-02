import modalReducer from '../../reducers/modalReducer'
import { OPEN_MODAL } from '../../actions/types'

describe('Test modalReducer', () => {
   const defaultState = {
      open: false,
      postId: ''
   }
   let state

   it('checks if returns the default state when !state && when the action is different', () => {
      state = modalReducer(undefined, { type: 'some_action_type' })
      expect(state).toEqual(defaultState)
   })

   it('checks the reducer for OPEN_MODAL', () => {
      state = modalReducer(state, { type: OPEN_MODAL, payload: 'asdf' })
      expect(state.postId).toEqual('asdf')
      expect(state.open).toEqual(true)
   })

   it('checks the reducer for OPEN_COMMENT_MODAL when !payload', () => {
      state = modalReducer(state, { type: OPEN_MODAL })
      expect(state.postId).toEqual('')
      expect(state.open).toEqual(false)
   })
})