import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import PostDialog from '../../../components/posts/PostDialog'

const initialState = {
   posts: {
      asdf: {
         title: '',
         author: '',
         body: '',
         category: 'react',
         postId: 'asdf'
      }
   },
   currentCategory: 'all',
   openModal: {
      open: true,
      postId: 'asdf'
   },
   categories: ['react', 'redux', 'udacity']
}

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('PostDialog | Shallow + passing the {store} directly', () => {
   let store = mockStore(initialState)
   let container = shallow(<PostDialog postId="asdf" store={store} />)

   it('render the connected(SMART) component', () => {
      expect(container.length).toEqual(1)
   })
})

describe('PostDialog | Mount + wrapping in <Provider>', () => {
   let store, wrapper
   const props = {
      postId: 'asdf'
   }

   beforeEach(() => {
      store = mockStore(initialState)
      wrapper = mount(
         <Provider store={store}>
            <PostDialog {...props} />
         </Provider>)
   })

   it('mount without crashing', () => {
      expect(wrapper.length).toEqual(1)
   })

   it('has the title, body, author and categories fields', () => {
      expect(wrapper.find('input[id="title"]').length).toBe(1)
      expect(wrapper.find('textarea[id="body"]').length).toBe(1)
      expect(wrapper.find('input[id="author"]').length).toBe(1)
      expect(wrapper.find('SelectInput[id="categories"]').length).toBe(1)
   })

   it('call handleChange method on input change', () => {
      let event = { target: { value: 'some value' } }

      wrapper.find('input[id="title"]').simulate('change', event)
      wrapper.find('textarea[id="body"]').simulate('change', event)
      wrapper.find('input[id="author"]').simulate('change', event)
      wrapper.find('SelectInput[id="categories"]').simulate('change', event)

      expect(wrapper.find('input[id="title"]').props().value).toBe('some value')
      expect(wrapper.find('textarea[id="body"]').props().value).toBe('some value')
      expect(wrapper.find('input[id="author"]').props().value).toBe('some value')
   })

   it('checks handleClose method', () => {
      expect(wrapper.find('Button').first().props().onClick()).toBe(true)
   })

   it('checks saveDialog method (update post)', () => {
      expect(wrapper.find('Button').last().props().onClick()).toBe('post updated')
   })

   it('creates a new post if !postId', () => {
      initialState.openModal.postId = ''
      store = mockStore(initialState)
      wrapper = mount(
         <Provider store={store}>
            <PostDialog {...props} />
         </Provider>)

      expect(wrapper.find('Button').last().props().onClick()).toBe('post created')
   })
})