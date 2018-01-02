import { combineReducers } from 'redux'
import openModal from './modalReducer'
import categories from './categoriesReducer'
import currentCategory from './currentCategoryReducer'
import posts from './postsReducer'
import snackbar from './snackbarReducer'
import comments from './commentsReducer'
import commentModal from './commentModalReducer'

export default combineReducers({
   openModal,
   categories,
   currentCategory,
   posts,
   snackbar,
   comments,
   commentModal
})
