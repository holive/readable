import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import PostsHome from './posts/PostsHome'
import Post from './posts/Post'
import Header from './Header'
import PostDialog from './posts/PostDialog'
import Snackbar from 'material-ui/Snackbar'
import CloseIcon from 'material-ui-icons/Close'
import IconButton from 'material-ui/IconButton'
import { connect } from 'react-redux'
import { fetchCategories, closeSnackbar } from '../actions'

class App extends Component {
   componentDidMount() {
      this.props.fetchCategories()
   }

   render() {
      const { openModal, snackbar, closeSnackbar } = this.props

      return (
         <div>
            <BrowserRouter>
               <div>
                  <Header />

                  <Switch>
                     <Route exact path="/" component={PostsHome} />
                     <Route exact path="/:category" component={PostsHome} />
                     <Route exact path="/:category/:post_id" component={Post} />
                  </Switch>
               </div>
            </BrowserRouter>

            {openModal.open &&
               <PostDialog />
            }

            <Snackbar
               anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
               open={snackbar.open}
               autoHideDuration={3000}
               onClose={closeSnackbar}
               message={<span id="message-id">{snackbar.message}</span>}
               className="snackbar"
               action={
                  <IconButton
                     onClick={closeSnackbar}
                     key="close"
                     aria-label="Close"
                     color="inherit"
                     className="snackbar-close-icon"
                  >
                     <CloseIcon />
                  </IconButton>
               }
            />
         </div>
      )
   }
}

function mapStateToProps({ openModal, snackbar }) {
   return { openModal, snackbar }
}

function mapDispatchToProps(dispatch) {
   return {
      fetchCategories: () => dispatch(fetchCategories()),
      closeSnackbar: () => dispatch(closeSnackbar())
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)