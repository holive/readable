import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { MemoryRouter } from 'react-router-dom'
import Comments from '../../../../components/posts/comments'

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
      commentId: ""
   }
}

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('Comments | Shallow + passing the {store} directly', () => {
   let store = mockStore(initialState)
   let container = shallow(<Comments postId="someId" store={store} />)

   it('render the connected(SMART) component', () => {
      expect(container.length).toEqual(1)
   })
})

describe('Comments | Mount + wrapping in <Provider>', () => {
   let store, wrapper

   beforeEach(() => {
      store = mockStore(initialState)
      wrapper = mount(
         <Provider store={store}>
            <MemoryRouter>
               <Comments postId="asdf" />
            </MemoryRouter>
         </Provider>)
   })

   it('mount without crashing', () => {
      expect(wrapper.length).toEqual(1)
   })

   it('has a .post-box.comment>.title', () => {
      expect(wrapper.find('.post-box.comment>.title').length).toEqual(1)
   })

   it('checks addComment method', () => {
      expect(wrapper.find('.add-comment').first().props().onClick()).toBe(true)
   })
})