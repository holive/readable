import fetch from 'cross-fetch'
import uuid from 'uuid'
const api = "http://localhost:3001"

const token = "1234"

const headers = {
   'Accept': 'application/json',
   'Authorization': token
}

export const getComments = (postId) =>
   fetch(`${api}/posts/${postId}/comments`, { headers })
      .then(res => res.json())

export const voteComment = (id, option) =>
   fetch(`${api}/comments/${id}`, {
      method: 'POST',
      headers: {
         ...headers,
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({ option })
   }).then(res => res.json())

export const updateComment = (id, comment) =>
   fetch(`${api}/comments/${id}`, {
      method: 'PUT',
      headers: {
         ...headers,
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(comment)
   }).then(res => res.json())

export const createComment = (newComment) =>
   fetch(`${api}/comments`, {
      method: 'POST',
      headers: {
         ...headers,
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         id: uuid(),
         timestamp: Date.now(),
         ...newComment
      })
   }).then(res => res.json())

export const deleteComment = (id) =>
   fetch(`${api}/comments/${id}`, {
      method: 'DELETE',
      headers
   })