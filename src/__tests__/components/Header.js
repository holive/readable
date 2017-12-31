import React from 'react'
import { shallow, mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import Header from '../../components/Header'
import { changeCurrentCategory, openModal } from '../../actions'

const initialState = {
   openDialog: jest.fn(),
   changeCurrentCategory: jest.fn()
}

describe('Header | Shallow + passing the {store} directly', () => {
   const mockStore = configureStore()
   const store = mockStore(initialState)
   const container = shallow(<Header store={store} />)

   it('render the connected(SMART) component', () => {
      expect(container.length).toEqual(1)
   })
})

describe('Header | Mount + wrapping in <Provider>', () => {
   const mockStore = configureStore()
   let store, wrapper

   beforeEach(() => {
      store = mockStore(initialState)
      wrapper = mount(
         <Provider store={store}>
            <MemoryRouter>
               <Header />
            </MemoryRouter>
         </Provider>)
   })

   it('mount without crashing', () => {
      expect(wrapper.length).toEqual(1)
   })

   it('has a <Link>', () => {
      expect(wrapper.find('Link').length).toEqual(1)
   })

   it('has a <Button>', () => {
      expect(wrapper.find('Button').length).toEqual(1)
   })

   it('check actions on dispatching', () => {
      wrapper.find('Link').simulate('click')
      wrapper.find('Button').simulate('click')

      let action = store.getActions()
      expect(action[0].type).toBe("current_category")
      expect(action[1].type).toBe("open_modal")
   })
})
