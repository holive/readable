import snackbarReducer from '../../reducers/snackbarReducer'
import {
   CREATE_POST,
   UPDATE_POST,
   DELETE_POST,
   CLOSE_SNACKBAR,
   UPDATE_COMMENT,
   CREATE_COMMENT,
   DELETE_COMMENT
} from '../../actions/types'

const defaultState = {
   open: false,
   message: ''
}

describe('Test snackbarReducer', () => {
   let state = {}

   it('checks if returns the default state when !state && when the action is different', () => {
      state = snackbarReducer(undefined, { type: 'some_action_type' })
      expect(state).toEqual(defaultState)
   })

   it('checks the reducer for CREATE_POST', () => {
      state = snackbarReducer(state, { type: CREATE_POST})
      expect(state).toEqual({ open: true, message: 'Post created' })
   })

   it('checks the reducer for UPDATE_POST', () => {
      state = snackbarReducer(state, { type: UPDATE_POST})
      expect(state).toEqual({ open: true, message: 'Post updated' })
   })

   it('checks the reducer for DELETE_POST', () => {
      state = snackbarReducer(state, { type: DELETE_POST})
      expect(state).toEqual({ open: true, message: 'Post deleted' })
   })

   it('checks the reducer for CLOSE_SNACKBAR', () => {
      state = snackbarReducer(state, { type: CLOSE_SNACKBAR})
      expect(state).toEqual(defaultState)
   })

   it('checks the reducer for UPDATE_COMMENT', () => {
      state = snackbarReducer(state, { type: UPDATE_COMMENT})
      expect(state).toEqual({ open: true, message: 'Comment updated' })
   })

   it('checks the reducer for CREATE_COMMENT', () => {
      state = snackbarReducer(state, { type: CREATE_COMMENT})
      expect(state).toEqual({ open: true, message: 'Comment created' })
   })

   it('checks the reducer for DELETE_COMMENT', () => {
      state = snackbarReducer(state, { type: DELETE_COMMENT})
      expect(state).toEqual({ open: true, message: 'Comment deleted' })
   })
})