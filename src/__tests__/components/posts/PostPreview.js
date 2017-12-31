import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { MemoryRouter } from 'react-router-dom'
import PostPreview from '../../../components/posts/PostPreview'

const initialState = {
   posts: {
      'asdf': {
         postId: 'asdf',
         title: 'asdf',
         category: 'udacity',
         commentCount: 1
      }
   },
   currentCategory: 'all'
}

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('PostPreview | Shallow + passing the {store} directly', () => {
   let store = mockStore(initialState)
   let container = shallow(<PostPreview postId="asdf" store={store} />)

   it('render the connected(SMART) component', () => {
      expect(container.length).toEqual(1)
   })
})

describe('PostPreview | Mount + wrapping in <Provider>', () => {
   let store, wrapper
   const props = {
      postId: 'asdf'
   }

   beforeEach(() => {
      store = mockStore(initialState)
      wrapper = mount(
         <Provider store={store}>
            <MemoryRouter>
               <PostPreview {...props} />
            </MemoryRouter>
         </Provider>)
   })

   it('mount without crashing', () => {
      expect(wrapper.length).toEqual(1)
   })

   it('has the edit post section', () => {
      const editDiv = wrapper.find('.edit')
      expect(editDiv.length).toBe(1)
      expect(editDiv.find('a').length).toBe(2)
   })

   it('has thumbUp and thumbDown buttons', () => {
      expect(wrapper.find('ThumbUp').length).toBe(1)
      expect(wrapper.find('ThumbDown').length).toBe(1)
   })

   it('checks openModal action', () => {
      wrapper.find('PostPreview').props().openModal()
      let action = store.getActions()

      expect(action[0].type).toBe('open_modal')
   })

   it('checks upVote method', () => {
      expect(wrapper.find('ThumbUp').props().onClick()).toBe(true)
   })

   it('checks downVote method', () => {
      expect(wrapper.find('ThumbDown').props().onClick()).toBe(true)
   })

   it('checks editPost method', () => {
      expect(wrapper.find('.edit').find('a').first().props().onClick()).toBe(true)
   })

   it('checks deletePost method', () => {
      expect(wrapper.find('.edit').find('a').last().props().onClick()).toBe(true)
   })

   it('returns nothing if there is no posts', () => {
      let container = mount(
         <Provider store={store}>
            <MemoryRouter>
               <PostPreview postId="" />
            </MemoryRouter>
         </Provider>)

      expect(container.find('PostPreview').text()).toBe('')
   })

   it('returns <div class="post-box hidden"> currentCategory does not match', () => {
      initialState.currentCategory = 'react'
      initialState.posts['asdf'].commentCount = 2

      store = mockStore(initialState)
      wrapper = mount(
         <Provider store={store}>
            <MemoryRouter>
               <PostPreview {...props} />
            </MemoryRouter>
         </Provider>)

      expect(wrapper.find('PostPreview').html()).toBe('<div class="post-box hidden"></div>')
   })
})