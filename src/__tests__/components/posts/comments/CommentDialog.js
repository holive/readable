import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { MemoryRouter } from 'react-router-dom'
import CommentDialog from '../../../../components/posts/comments/CommentDialog'

const initialState = {
   comments: {
      1234: {
         id: '1234',
         parentId: 'asdf',
         timestamp: '1468166872634',
         body: 'Hi there! I am a COMMENT.',
         author: 'thingtwo',
         voteScore: 6,
         deleted: false,
         parentDeleted: false
      }
   },
   commentModal: {
      open: true,
      commentId: "1234"
   }
}

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('CommentDialog | Shallow + passing the {store} directly', () => {
   let store = mockStore(initialState)
   let container = shallow(<CommentDialog parentId="someId" store={store} />)

   it('render the connected(SMART) component', () => {
      expect(container.length).toEqual(1)
   })
})

describe('CommentDialog | Mount + wrapping in <Provider>', () => {
   let store, wrapper

   beforeEach(() => {
      store = mockStore(initialState)
      wrapper = mount(
         <Provider store={store}>
            <MemoryRouter>
               <CommentDialog parentId="asdf" />
            </MemoryRouter>
         </Provider>)
   })

   it('mount without crashing', () => {
      expect(wrapper.length).toEqual(1)
   })

   it('call handleChange method on input change', () => {
      let event = { target: { value: '' } }

      wrapper.find('input[id="author"]').simulate('change', event)
      expect(wrapper.find('input[id="author"]').props().value).toBe('')

      event.target.value = 'some value'
      wrapper.find('input[id="author"]').simulate('change', event)
      expect(wrapper.find('input[id="author"]').props().value).toBe('some value')
   })

   it('checks handleClose method', () => {
      expect(wrapper.find('Button').first().props().onClick()).toBe(true)
   })

   it('checks saveDialog method (updateComment)', () => {
      expect(wrapper.find('Button').last().props().onClick()).toBe('update comment')
   })

   it('checks saveDialog method (createComment)', () => {
      initialState.commentModal.commentId = ''

      store = mockStore(initialState)
      wrapper = mount(
         <Provider store={store}>
            <MemoryRouter>
               <CommentDialog parentId="asdf" />
            </MemoryRouter>
         </Provider>)

      expect(wrapper.find('Button').last().props().onClick()).toBe('create comment')
   })
})