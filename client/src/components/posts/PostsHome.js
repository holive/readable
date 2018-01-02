import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton'
import SortIcon from 'material-ui-icons/Sort'
import Menu, { MenuItem } from 'material-ui/Menu'
import PostPreview from './PostPreview'
import CategoriesMenu from './CategoriesMenu'
import { connect } from 'react-redux'
import { fetchPosts, sortByRating, sortByDate, sortByTitle, changeCurrentCategory } from '../../actions'

class PostsHome extends Component {
   state = {
      anchorEl: null,
      openSortMenu: false,
      sortBy: 'rating',
      filters: ['rating', 'date', 'title']
   }

   componentWillMount() {
      const { category = 'all' } = this.props.match.params
      this.props.changeCurrentCategory(category)
   }

   componentDidMount() {
      this.props.getPosts()
   }

   handleClick = event => {
      this.setState({ openSortMenu: true, anchorEl: event.currentTarget })
      return true
   }

   handleRequestClose = (e) => {
      let sortBy
      if (e.target.attributes.value) {
         sortBy = e.target.attributes.value.value

         this.sortPosts(e)
      } else {
         sortBy = this.state.sortBy
      }

      this.setState({ openSortMenu: false, sortBy })
      return true
   }

   sortPosts = (e) => {
      const { sortByDate, sortByRating, sortByTitle } = this.props
      const { filters } = this.state

      switch (e.target.attributes.value.value) {
         case filters[0]:
            sortByRating(); break
         case filters[1]:
            sortByDate(); break
         case filters[2]:
            sortByTitle(); break
         default:
            return false
      }
   }

   render() {
      if (!Object.keys(this.props.posts)[0]) {
         return <div />
      }

      const { sortBy, openSortMenu, anchorEl } = this.state
      const { filters } = this.state

      return (
         <div>
            <CategoriesMenu />

            <div className="posts">
               <div className="container">
                  <div className="sort-button">
                     <IconButton
                        aria-label="Sort by"
                        aria-haspopup="true"
                        onClick={this.handleClick}
                     >
                        <SortIcon />
                     </IconButton>

                     <Menu
                        id="sort-by"
                        anchorEl={anchorEl}
                        open={openSortMenu}
                        onClose={this.handleRequestClose}
                     >
                        <MenuItem className="title" disabled>
                           order by
                        </MenuItem>

                        {filters.map(filter => (
                           <MenuItem
                              onClick={this.handleRequestClose}
                              selected={sortBy === filter ? true : false}
                              value={filter}
                              key={filter}
                           >
                              {filter}
                           </MenuItem>
                        ))}
                     </Menu>
                  </div>
               </div>

               <div className="container">
                  <div className="content">
                     {Object.keys(this.props.posts).map(post => (
                        <PostPreview key={post} postId={post} />
                     ))}
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

function mapStateToProps({ posts }) {
   return { posts }
}

function mapDispatchToProps(dispatch) {
   return {
      getPosts: () => dispatch(fetchPosts()),
      sortByRating: () => dispatch(sortByRating()),
      sortByDate: () => dispatch(sortByDate()),
      sortByTitle: () => dispatch(sortByTitle()),
      changeCurrentCategory: (category) => dispatch(changeCurrentCategory(category))
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsHome)