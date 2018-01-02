import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { MemoryRouter } from 'react-router-dom'
import PostsHome from '../../../components/posts/PostsHome'
import { sortByRating, sortByDate, sortByTitle, changeCurrentCategory } from '../../../actions'

const initialState = {
   posts: { 0: {} },
   categories: ['react', 'redux', 'udacity'],
   openSortMenu: false,
   sortBy: 'rating',
   filters: ['rating', 'date', 'title']
}

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('PostsHome | Shallow + passing the {store} directly', () => {
   let store = mockStore(initialState)
   let container = shallow(<PostsHome store={store} />)

   it('render the connected(SMART) component', () => {
      expect(container.length).toEqual(1)
   })
})

describe('PostsHome | Mount + wrapping in <Provider>', () => {
   let store, wrapper
   const props = {
      match: { params: {} }
   }

   beforeEach(() => {
      store = mockStore(initialState)
      wrapper = mount(
         <Provider store={store}>
            <MemoryRouter>
               <PostsHome {...props} />
            </MemoryRouter>
         </Provider>)
   })

   it('mount without crashing', () => {
      expect(wrapper.length).toEqual(1)
   })

   it('has a CategoriesMenu', () => {
      expect(wrapper.find('.categories').length).toEqual(1)
   })

   it('checks sortByRating action', () => {
      wrapper.find('PostsHome').props().sortByRating()
      wrapper.find('PostsHome').props().sortByDate()
      wrapper.find('PostsHome').props().sortByTitle()

      let action = store.getActions()
      expect(action[1].type).toBe("sort_by_rating")
      expect(action[2].type).toBe("sort_by_date")
      expect(action[3].type).toBe("sort_by_title")
   })

   it('calls handleClick on IconButton click', () => {
      const postHome = wrapper.find('PostsHome')
      const icon = postHome.find('IconButton')

      expect(icon.props().onClick({})).toBe(true)
   })

   it('calls handleRequestClose on Menu click and checks the statements of it', () => {
      const menu = wrapper.find('Menu')
      const event1 = { target: { attributes: { value: { value: initialState.filters[0] } } } }
      const event2 = { target: { attributes: { value: { value: initialState.filters[1] } } } }
      const event3 = { target: { attributes: { value: { value: initialState.filters[2] } } } }
      const event4 = { target: { attributes: { value: { value: 'none' } } } }
      expect(menu.props().onClose(event1)).toBe(true)
      expect(menu.props().onClose(event2)).toBe(true)
      expect(menu.props().onClose(event3)).toBe(true)
      expect(menu.props().onClose(event4)).toBe(true)
      expect(menu.props().onClose({ target: { attributes: {} } })).toBe(true)
   })
})