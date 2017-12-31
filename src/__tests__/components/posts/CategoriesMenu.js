import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { MemoryRouter } from 'react-router-dom'
import CategoriesMenu from '../../../components/posts/CategoriesMenu'

const initialState = {
   currentCategory: 'all',
   categories: ['react', 'redux', 'udacity']
}

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('CategoriesMenu | Shallow + passing the {store} directly', () => {
   let store = mockStore(initialState)
   let container = shallow(<CategoriesMenu store={store} />)

   it('render the connected(SMART) component', () => {
      expect(container.length).toEqual(1)
   })
})

describe('CategoriesMenu | Mount + wrapping in <Provider>', () => {
   let store, wrapper

   beforeEach(() => {
      store = mockStore(initialState)
      wrapper = mount(
         <Provider store={store}>
            <MemoryRouter>
               <CategoriesMenu />
            </MemoryRouter>
         </Provider>)
   })

   it('mount without crashing', () => {
      expect(wrapper.length).toEqual(1)
   })

   it('checks Button onClick', () => {
      const event = { target: { value: 'react' } }
      expect(wrapper.find('Button').first().props().onClick(event)).toBe(true)
   })
})