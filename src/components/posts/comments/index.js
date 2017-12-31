import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { connect } from 'react-redux'
import Comment from './Comment'
import { getComments, openCommentModal } from '../../../actions/commentActions'
import CommentDialog from './CommentDialog'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'

class Comments extends Component {

   componentDidMount() {
      this.props.getComments(this.props.postId)
   }

   addComment = () => {
      this.props.openCommentModal()
      return true
   }

   render() {
      const commentCount = this.props.comments.length
      const { comments, commentModal, postId } = this.props

      return (
         <div>
            <div className="post-box comment">
               <div className="title">
                  {commentCount} Comment
                     {commentCount === 1 ? "" : "s"}
               </div>
            </div>

            {comments.map((comment, i) =>
               <Comment comment={comment} key={i} />
            )}

            <Button onClick={() => this.addComment()}
               color="primary" className="add-comment"
            >
               <AddIcon /> Add Comment
            </Button>

            {commentModal.open &&
               <CommentDialog parentId={postId} />
            }
         </div>
      )
   }
}

function mapStateToProps(state, ownProps) {
   let comments = []

   _.forOwn(state.comments, (value, key, object) => {
      if (value.parentId === ownProps.postId)
         comments.push(object[key])
   })

   return {
      comments,
      commentModal: state.commentModal
   }
}

function mapDispatchToProps(dispatch) {
   return {
      getComments: (postId) => dispatch(getComments(postId)),
      openCommentModal: () => dispatch(openCommentModal())
   }
}

Comments.propTypes = {
   postId: PropTypes.string.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)