import {
   OPEN_MODAL,
   CLOSE_SNACKBAR,
   CURRENT_CATEGORY,
   CATEGORIES,
   GET_POST,
   GET_POSTS,
   UP_VOTE,
   DOWN_VOTE,
   CREATE_POST,
   UPDATE_POST,
   DELETE_POST,
   SORT_BY_RATING,
   SORT_BY_DATE,
   SORT_BY_TITLE
} from './types'

import * as CategoriesAPI from '../utils/api/categories'
import * as PostsAPI from '../utils/api/posts'

export function openModal(postId) {
   return {
      type: OPEN_MODAL,
      payload: postId
   }
}

export function closeSnackbar() {
   return { type: CLOSE_SNACKBAR }
}

export function sortByRating() {
   return { type: SORT_BY_RATING }
}

export function sortByDate() {
   return { type: SORT_BY_DATE }
}

export function sortByTitle() {
   return { type: SORT_BY_TITLE }
}

export function changeCurrentCategory(category) {
   return {
      type: CURRENT_CATEGORY,
      payload: category
   }
}

export const fetchCategories = () => dispatch => (
   CategoriesAPI.getCategories()
      .then(categories => dispatch({
         type: CATEGORIES,
         payload: categories
      }))
)

export const fetchPost = (id) => dispatch => (
   PostsAPI.getPost(id)
      .then(post => dispatch({
         type: GET_POST,
         payload: post
      }))
)

export const fetchPosts = () => dispatch => (
   PostsAPI.getPosts()
      .then(posts => dispatch({
         type: GET_POSTS,
         payload: posts
      }))
)

export const upVote = (id) => dispatch => (
   PostsAPI.votePost(id, 'upVote')
      .then(res => dispatch({
         type: UP_VOTE,
         payload: res
      }))
)

export const downVote = (id) => dispatch => (
   PostsAPI.votePost(id, 'downVote')
      .then(res => dispatch({
         type: DOWN_VOTE,
         payload: res
      }))
)

export const createPost = (post) => dispatch => (
   PostsAPI.createPost(post)
      .then(res => dispatch({
         type: CREATE_POST,
         payload: res
      }))
)

export const updatePost = (id, post) => dispatch => (
   PostsAPI.updatePost(id, post)
      .then((res) => dispatch({
         type: UPDATE_POST,
         payload: res
      }))
)

export const deletePost = (id) => dispatch => (
   PostsAPI.deletePost(id)
      .then(() => dispatch({
         type: DELETE_POST,
         payload: id
      }))
)
