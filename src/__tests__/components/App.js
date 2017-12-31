import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { MemoryRouter } from 'react-router-dom'
import App from '../../components/App'
import { fetchCategories, closeSnackbar, createPost } from '../../actions'

const initialState = {
   snackbar: { open: false, message: "" },
   openModal: { open: true, postId: "" },
   closeSnackbar: jest.fn(),
   posts: {},
   categories: ['all', 'react', 'redux', 'udacity']
}

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('App | Shallow + passing the {store} directly', () => {
   let store = mockStore(initialState)
   let container = shallow(<App store={store} />)

   it('render the connected(SMART) component', () => {
      expect(container.length).toEqual(1)
   })
})

describe('App | Mount + wrapping in <Provider>', () => {
   let store, wrapper

   beforeEach(() => {
      store = mockStore(initialState)
      wrapper = mount(
         <Provider store={store}>
            <MemoryRouter>
               <App />
            </MemoryRouter>
         </Provider>)
   })

   it('mount without crashing', () => {
      expect(wrapper.length).toEqual(1)
   })

   it('checks closeSnackbar action', () => {
      wrapper.find('App').props().closeSnackbar()

      let action = store.getActions()
      expect(action[1].type).toBe("close_snackbar")
   })

   it('checks fetchCategories action', () => {
      const store = mockStore({})

      return store.dispatch(fetchCategories())
         .then(() => {
            const actions = store.getActions()
            expect(actions[0].type).toBe('categories')
         })
   })

   it('checks createPost action', () => {
      const store = mockStore({})

      return store.dispatch(createPost())
         .then(() => {
            const actions = store.getActions()
            expect(actions[0].type).toBe('create_post')
         })
   })
})