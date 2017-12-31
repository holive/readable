import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { MemoryRouter } from 'react-router-dom'
import Post from '../../../components/posts/Post'
import { fetchPost, updatePost } from '../../../actions'

const post = {
   postId: 'asdf',
   title: 'asdf',
   body: '',
   author: '',
   category: 'udacity',
   commentCount: 0
}

const initialState = {
   post: post,
   posts: { asdf: post },
   postId: 'asdf',
   commentModal: {
      open: false,
      commentId: ''
   }
}

const props = {
   postId: 'asdf',
   match: {
      params: {
         post_id: 'asdf'
      }
   }
}

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('Post | Shallow + passing the {store} directly', () => {
   let store = mockStore(initialState)
   let container = shallow(<Post {...props} store={store} />)

   it('render the connected(SMART) component', () => {
      expect(container.length).toEqual(1)
   })
})

describe('Post | Mount + wrapping in <Provider>', () => {
   let store, wrapper

   beforeEach(() => {
      store = mockStore(initialState)
      wrapper = mount(
         <Provider store={store}>
            <MemoryRouter>
               <Post {...props} />
            </MemoryRouter>
         </Provider>)
   })

   it('mount without crashing', () => {
      expect(wrapper.length).toEqual(1)
   })

   it('has a className post', () => {
      expect(wrapper.find('.post').length).toEqual(1)
   })

   it('checks openModal action', () => {
      wrapper.find('Post').props().openModal()
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

   it('returns an empty div if !posts', () => {
      initialState.posts = {}
      store = mockStore(initialState)
      wrapper = mount(
         <Provider store={store}>
            <MemoryRouter>
               <Post {...props} />
            </MemoryRouter>
         </Provider>)

      expect(wrapper.find('Post').html()).toBe('<div></div>')
   })

   it('checks fetchPost action', () => {
      const store = mockStore({})

      return store.dispatch(fetchPost())
         .then(() => {
            const actions = store.getActions()
            expect(actions[0].type).toBe('get_post')
         })
   })

   it('checks updatePost action', () => {
      const store = mockStore({})
      const id = 'asdf'
      const post = { id: 'asdf' }

      return store.dispatch(updatePost(id, post))
         .then(() => {
            const actions = store.getActions()
            expect(actions[0].type).toBe('update_post')
         })
   })
})