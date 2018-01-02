import fetch from 'cross-fetch'
import uuid from 'uuid'
const api = "http://localhost:3001"

const token = "1234"

const headers = {
   'Accept': 'application/json',
   'Authorization': token
}

export const getPost = (id) =>
   fetch(`${api}/posts/${id}`, { headers })
      .then(res => res.json())

export const getPosts = () =>
   fetch(`${api}/posts`, { headers })
      .then(res => res.json())

export const votePost = (id, option) =>
   fetch(`${api}/posts/${id}`, {
      method: 'POST',
      headers: {
         ...headers,
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({ option })
   }).then(res => res.json())

export const createPost = (newPost) =>
   fetch(`${api}/posts`, {
      method: 'POST',
      headers: {
         ...headers,
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         id: uuid(),
         timestamp: Date.now(),
         ...newPost
      })
   }).then(res => res.json())

export const updatePost = (id, post) =>
   fetch(`${api}/posts/${id}`, {
      method: 'PUT',
      headers: {
         ...headers,
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
   }).then(res => res.json())

export const deletePost = (id) =>
   fetch(`${api}/posts/${id}`, {
      method: 'DELETE',
      headers
   })
