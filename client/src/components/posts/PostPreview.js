import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { CSSTransitionGroup } from 'react-transition-group'
import ThumbUp from 'material-ui-icons/ThumbUp'
import ThumbDown from 'material-ui-icons/ThumbDown'
import { connect } from 'react-redux'
import { dateBeauty, voteBeauty } from '../../utils/helpers'
import { upVote, downVote, openModal, deletePost } from '../../actions'

class PostPreview extends Component {

   editPost = (postId) => {
      this.props.openModal(postId)
      return true
   }

   deletePost = (postId) => {
      this.props.deletePost(postId)
      return true
   }

   upVote = (postId) => {
      this.props.upVote(postId)
      return true
   }

   downVote = (postId) => {
      this.props.downVote(postId)
      return true
   }

   render() {
      const { posts, postId, currentCategory } = this.props

      if (!posts[postId])
         return <div />

      const { title, author, timestamp, commentCount, voteScore, category } = posts[postId]

      if (currentCategory !== 'all' && currentCategory !== category)
         return <div className="post-box hidden" />

      return (
         <CSSTransitionGroup
            className="post-box"
            transitionName="fade"
            transitionAppear={true}
            transitionAppearTimeout={300}
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
         >
            <Link to={`/${category}/${postId}`}>
               <h3>{title}</h3>
            </Link>

            <div className="details">
               by <span className="name">{author}</span>, {dateBeauty(timestamp)}
               <span className="spacer"></span>
               <span className="comments-counter">{commentCount} comment
                  {commentCount === 1 ? "" : "s"}
               </span>
            </div>

            <div className="bottom">
               <div className="edit">
                  <a onClick={() => this.editPost(postId)}>Edit</a>
                  <span className="spacer"></span>
                  <a onClick={() => this.deletePost(postId)}>Delete</a>
               </div>

               <div className="like">
                  <ThumbUp onClick={() => this.upVote(postId)} className="thumb" />
                  <span className="number">{voteBeauty(voteScore)}</span>
                  <ThumbDown onClick={() => this.downVote(postId)} className="thumb down" />
               </div>
            </div>
         </CSSTransitionGroup>
      )
   }
}

function mapStateToProps({ posts, currentCategory }) {
   return { posts, currentCategory }
}

function mapDispatchToProps(dispatch) {
   return {
      upVote: (postId) => dispatch(upVote(postId)),
      downVote: (postId) => dispatch(downVote(postId)),
      openModal: (postId) => dispatch(openModal(postId)),
      deletePost: (postId) => dispatch(deletePost(postId))
   }
}

PostPreview.propTypes = {
   postId: PropTypes.string.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPreview)