import React, { Component } from 'react'
import _ from 'lodash'
import TextField from 'material-ui/TextField'
import Dialog, { DialogContent } from 'material-ui/Dialog'
import MenuItem from 'material-ui/Menu/MenuItem'
import Button from 'material-ui/Button'
import { connect } from 'react-redux'
import { openModal, createPost, updatePost } from '../../actions'

class PostDialog extends Component {
   state = {
      dialogTitle: 'Create New Post',
      title: '',
      body: '',
      author: '',
      category: '',
      blockSave: true
   }

   componentDidMount() {
      const { postId } = this.props.openModal

      if (postId) {
         const { title, body, author, category } = this.props.posts[postId]

         this.setState({
            dialogTitle: 'Edit Post',
            title, body, author, category,
            blockSave: false
         })
      }
   }

   handleChange = name => event => {
      this.setState({ [name]: event.target.value }, () => {
         this.blockSaveButton()
      })
   }

   handleClose = () => {
      this.props.openDialog()
      return true
   }

   blockSaveButton = () => {
      const { title, body, author, category } = this.state

      if (title === '' || body === '' || author === '' || category === '') {
         this.setState({ blockSave: true })
      } else {
         this.setState({ blockSave: false })
      }
   }

   saveDialog = () => {
      const { postId } = this.props.openModal
      const post = _.omit(this.state, ['dialogTitle', 'blockSave'])

      if (!postId) {
         this.props.createPost(post)
         this.handleClose()
         return 'post created' //return for tests pourposes
      } else {
         this.props.updateThisPost(postId, post)
         this.handleClose()
         return 'post updated'
      }
   }

   render() {
      const { categories, openModal } = this.props
      const { dialogTitle, title, body, author, category, blockSave } = this.state

      return (
         <Dialog
            className="overlay"
            open={openModal.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
         >
            <DialogContent className="modal">
               <h3>{dialogTitle}</h3>
               <hr />

               <TextField
                  value={title}
                  onChange={this.handleChange('title')}
                  id="title" label="Title"
                  margin="normal" fullWidth required
               />

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
                  className="author" id="author" label="Author"
                  margin="normal" required
               />

               <TextField
                  value={category}
                  onChange={this.handleChange('category')}
                  id="categories" className="categories"
                  label="Category" margin="normal"
                  helperText="Please select a category"
                  required select
               >
                  {categories.map(categorie => (
                     <MenuItem
                        key={categorie}
                        value={categorie}
                        className="capitalize"
                     >
                        {categorie}
                     </MenuItem>
                  ))}
               </TextField>

               <div className="actions">
                  <Button onClick={this.handleClose} color="primary">Cancel</Button>
                  <Button onClick={this.saveDialog} disabled={blockSave} color="primary">Save</Button>
               </div>
            </DialogContent>
         </Dialog>
      )
   }
}

function mapStateToProps({ openModal, posts, categories }) {
   return { openModal, posts, categories }
}

function mapDispatchToProps(dispatch) {
   return {
      openDialog: () => dispatch(openModal()),
      createPost: (post) => dispatch(createPost(post)),
      updateThisPost: (id, post) => dispatch(updatePost(id, post))
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDialog)
