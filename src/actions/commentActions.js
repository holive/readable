import {
   GET_COMMENTS,
   UP_VOTE_COMMENT,
   DOWN_VOTE_COMMENT,
   UPDATE_COMMENT,
   OPEN_COMMENT_MODAL,
   CREATE_COMMENT,
   DELETE_COMMENT
} from './types'

import * as CommentsAPI from '../utils/api/comments'

export const getComments = (postId) => dispatch => (
   CommentsAPI.getComments(postId)
      .then((comments) => dispatch({
         type: GET_COMMENTS,
         payload: comments
      }))
)

export const upVoteComment = (id) => dispatch => (
   CommentsAPI.voteComment(id, 'upVote')
      .then(res => dispatch({
         type: UP_VOTE_COMMENT,
         payload: res
      }))
)

export const downVoteComment = (id) => dispatch => (
   CommentsAPI.voteComment(id, 'downVote')
      .then(res => dispatch({
         type: DOWN_VOTE_COMMENT,
         payload: res
      }))
)

export const updateComment = (id, comment) => dispatch => (
   CommentsAPI.updateComment(id, comment)
      .then((res) => dispatch({
         type: UPDATE_COMMENT,
         payload: res
      }))
)

export function openCommentModal(commentId) {
   return {
      type: OPEN_COMMENT_MODAL,
      payload: commentId
   }
}

export const createComment = (comment) => dispatch => (
   CommentsAPI.createComment(comment)
      .then(res => dispatch({
         type: CREATE_COMMENT,
         payload: res
      }))
)

export const deleteComment = (id) => dispatch => (
   CommentsAPI.deleteComment(id)
      .then(() => dispatch({
         type: DELETE_COMMENT,
         payload: id
      }))
)