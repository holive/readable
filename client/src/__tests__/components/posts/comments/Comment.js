import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { MemoryRouter } from 'react-router-dom'
import Comment from '../../../../components/posts/comments/Comment'
import {
   updateComment,
   upVoteComment,
   downVoteComment,
   createComment,
   deleteComment
} from '../../../../actions/commentActions'

const props = {
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
}

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('Comment | Shallow + passing the {store} directly', () => {
   let store = mockStore()
   let container = shallow(<Comment comment={props} store={store} />)

   it('render the connected(SMART) component', () => {
      expect(container.length).toEqual(1)
   })
})

describe('Comment | Mount + wrapping in <Provider>', () => {
   let store, wrapper
   store = mockStore({})
   beforeEach(() => {
      wrapper = mount(
         <Provider store={store}>
            <MemoryRouter>
               <Comment comment={props} />
            </MemoryRouter>
         </Provider>)
   })

   it('mount without crashing', () => {
      expect(wrapper.length).toEqual(1)
   })

   it('checks editComment method', () => {
      wrapper.find('Comment').props().openCommentModal()
      let action = store.getActions()

      expect(action[0].type).toBe('open_comment_modal')
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

   it('checks updateComment action', () => {
      const store = mockStore({})
      const id = 'asdf'
      const comment = { id: 'asdf' }

      return store.dispatch(updateComment(id, comment))
         .then(() => {
            const actions = store.getActions()
            expect(actions[0].type).toBe('update_comment')
         })
   })

   it('checks upVoteComment action', () => {
      const store = mockStore({})
      return store.dispatch(upVoteComment())
         .then(() => {
            const actions = store.getActions()
            expect(actions[0].type).toBe('up_vote_comment')
         })
   })

   it('checks downVoteComment action', () => {
      const store = mockStore({})
      return store.dispatch(downVoteComment())
         .then(() => {
            const actions = store.getActions()
            expect(actions[0].type).toBe('down_vote_comment')
         })
   })

   it('checks createComment action', () => {
      const store = mockStore({})
      return store.dispatch(createComment())
         .then(() => {
            const actions = store.getActions()
            expect(actions[0].type).toBe('create_comment')
         })
   })

   it('checks deleteComment action', () => {
      const store = mockStore({})
      return store.dispatch(deleteComment())
         .then(() => {
            const actions = store.getActions()
            expect(actions[0].type).toBe('delete_comment')
         })
   })
})