import currentCategoryReducer from '../../reducers/currentCategoryReducer'
import { CURRENT_CATEGORY } from '../../actions/types'

describe('Test currentCategoryReducer', () => {
   let state = 'all'

   it('checks if returns the default state when !state && when the action is different', () => {
      state = currentCategoryReducer(undefined, { type: 'some_action_type' })
      expect(state).toEqual('all')
   })

   it('checks the reducer for CURRENT_CATEGORY', () => {
      state = currentCategoryReducer(state, { type: CURRENT_CATEGORY, payload: 'react' })
      expect(state).toEqual('react')
   })
})
