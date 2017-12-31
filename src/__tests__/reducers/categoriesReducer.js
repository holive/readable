import categoriesReducer from '../../reducers/categoriesReducer'
import { CATEGORIES } from '../../actions/types'

describe('Test categoriesReducer', () => {
   let state = []
   let categories = [{ "name": "react", "path": "react" }]

   it('checks if returns the default state when !state && when the action is different', () => {
      state = categoriesReducer(undefined, { type: 'some_action_type' })
      expect(state).toEqual([])
   })

   it('checks the reducer for CATEGORIES', () => {
      let expected = ['react']
      state = categoriesReducer(state, { type: CATEGORIES, payload: categories })
      expect(state).toEqual(expected)
   })
})