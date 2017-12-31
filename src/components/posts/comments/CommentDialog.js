import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import TextField from 'material-ui/TextField'
import Dialog, { DialogContent } from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import { connect } from 'react-redux'
import { openCommentModal, updateComment, createComment } from '../../../actions/commentActions'

class CommentDialog extends Component {
   state = {
      dialogTitle: 'Create New Comment',
      body: '',
      author: '',
      blockSave: true,
      blockAuthor: false,
      parentId: ''
   }

   componentDidMount() {
      const { commentId } = this.props.commentModal

      if (commentId) {
         const { body, author } = this.props.comments[commentId]

         this.setState({
            dialogTitle: 'Edit Comment',
            body, author,
            blockSave: false,
            blockAuthor: true
         })
      }
   }

   handleChange = name => event => {
      this.setState({ [name]: event.target.value }, () => {
         this.blockSaveButton()
      })
      return true
   }

   handleClose = () => {
      this.props.openCommentModal()
      return true
   }

   blockSaveButton = () => {
      const { body, author } = this.state

      if (body === '' || author === '') {
         this.setState({ blockSave: true })
      } else {
         this.setState({ blockSave: false })
      }
   }

   saveDialog = () => {
      const { commentId } = this.props.commentModal
      const comment = _.omit(this.state, ['dialogTitle', 'blockSave', 'blockAuthor'])
      comment.parentId = this.props.parentId

      if (!commentId) {
         this.props.createComment(comment)
         this.handleClose()
         return 'create comment'
      } else {
         this.props.updateComment(commentId, comment)
         this.handleClose()
         return 'update comment'
      }
   }

   render() {
      const { commentModal } = this.props
      const { body, author, dialogTitle, blockSave, blockAuthor } = this.state

      return (
         <Dialog
            className="overlay comment"
            open={commentModal.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
         >
            <DialogContent className="modal">
               <h3>{dialogTitle}</h3>
               <hr />

               <TextField
                  value={body}
                  onChange={this.handleChange('body')}
                  id="body" label="Body"
                  margin="normal" rows="4"
                  multiline fullWidth required
               />

               <TextField
                  value={author}
                  onChange={this.handleChange('author')}
                  disabled={blockAuthor}
                  className="author" id="author" label="Author"
                  margin="normal" fullWidth required
               />

               <div className="actions">
                  <Button onClick={this.handleClose} color="primary">Cancel</Button>
                  <Button onClick={this.saveDialog} disabled={blockSave} color="primary">Save</Button>
               </div>
            </DialogContent>
         </Dialog>
      )
   }
}

function mapStateToProps({ commentModal, comments }) {
   return { commentModal, comments }
}

function mapDispatchToProps(dispatch) {
   return {
      openCommentModal: () => dispatch(openCommentModal()),
      updateComment: (id, comment) => dispatch(updateComment(id, comment)),
      createComment: (comment) => dispatch(createComment(comment))
   }
}

CommentDialog.propTypes = {
   parentId: PropTypes.string.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentDialog)
