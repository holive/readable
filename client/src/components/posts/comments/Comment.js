import React from 'react'
import PropTypes from 'prop-types'
import ThumbUp from 'material-ui-icons/ThumbUp'
import ThumbDown from 'material-ui-icons/ThumbDown'
import { connect } from 'react-redux'
import { dateBeauty, voteBeauty } from '../../../utils/helpers'
import {
   upVoteComment,
   downVoteComment,
   openCommentModal,
   deleteComment
} from '../../../actions/commentActions'

const Comment = ({
   openCommentModal,
   comment,
   upVoteComment,
   downVoteComment,
   deleteComment
}) => {

   const { timestamp, body, author, voteScore, id } = comment

   const editComment = () => {
      openCommentModal(id, comment)
      return true
   }

   const delComment = () => {
      deleteComment(id)
      return true
   }

   const upVote = () => {
      upVoteComment(id)
      return true
   }

   const downVote = () => {
      downVoteComment(id)
      return true
   }

   return (
      <div className="post-box comment">
         <p>{body}</p>

         <div className="details">
            by <span className="name">{author}</span>,  {dateBeauty(timestamp)}
         </div>

         <div className="bottom">
            <div className="edit">
               <a onClick={() => editComment()}>Edit</a>
               <span className="spacer"></span>
               <a onClick={() => delComment()}>Delete</a>
            </div>

            <div className="like">
               <ThumbUp onClick={() => upVote()} className="thumb" />
               <span className="number">{voteBeauty(voteScore)}</span>
               <ThumbDown onClick={() => downVote()} className="thumb down" />
            </div>
         </div>
      </div>
   )
}

function mapDispatchToProps(dispatch) {
   return {
      upVoteComment: (id) => dispatch(upVoteComment(id)),
      downVoteComment: (id) => dispatch(downVoteComment(id)),
      openCommentModal: (id, comment) => dispatch(openCommentModal(id, comment)),
      deleteComment: (id) => dispatch(deleteComment(id))
   }
}

Comment.propTypes = {
   comment: PropTypes.object.isRequired
}

export default connect(null, mapDispatchToProps)(Comment)