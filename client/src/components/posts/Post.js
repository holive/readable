import React, { Component } from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import ThumbUp from 'material-ui-icons/ThumbUp'
import ThumbDown from 'material-ui-icons/ThumbDown'
import { connect } from 'react-redux'
import { dateBeauty, voteBeauty } from '../../utils/helpers'
import { fetchPost, upVote, downVote, openModal, deletePost } from '../../actions'
import Comments from './comments'

class Post extends Component {

   componentDidMount() {
      const { fetchPost, post, postId } = this.props

      if (!post) {
         fetchPost(postId)
      }
   }

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
      const { posts, postId } = this.props

      if (!posts[postId])
         return <div />

      const { title, author, timestamp, voteScore, body } = posts[postId]

      return (
         <CSSTransitionGroup
            transitionName="fade"
            transitionAppear={true}
            transitionAppearTimeout={300}
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
         >
            <div className="post">
               <div className="container">
                  <div className="post-box">
                     <h2>{title}</h2>

                     <p>{body}</p>
                     <hr />
                     <div className="details">
                        by <span className="name">{author}</span>,  {dateBeauty(timestamp)}
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
                  </div>

                  <Comments postId={postId} />
               </div>
            </div>
         </CSSTransitionGroup>
      )
   }
}

function mapStateToProps({ posts }, ownProps) {
   const postId = ownProps.match.params.post_id
   const post = posts[postId]
   return { posts, postId, post }
}

function mapDispatchToProps(dispatch) {
   return {
      fetchPost: (postId) => dispatch(fetchPost(postId)),
      upVote: (postId) => dispatch(upVote(postId)),
      downVote: (postId) => dispatch(downVote(postId)),
      openModal: (postId) => dispatch(openModal(postId)),
      deletePost: (postId) => dispatch(deletePost(postId))
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)