import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'material-ui/Button'
import { connect } from 'react-redux'
import { changeCurrentCategory } from '../../actions'

const Categories = ({ currentCategory, changeCurrentCategory, categories }) => {

   const handleClick = (e) => {
      changeCurrentCategory(e.target.value)
      return true
   }

   const newCategories = ['all', ...categories]

   return (
      <div className="categories">
         <div className="container">
            {newCategories.map(c =>
               (<Link
                  to={`/${c === 'all' ? '' : c}`}
                  key={c}
               >
                  <Button
                     raised
                     disabled={c === currentCategory ? true : false}
                     onClick={(e) => handleClick(e)}
                     value={c}
                  >
                     {c}
                  </Button>
               </Link>))
            }
         </div>
      </div>
   )
}

function mapStateToProps({ currentCategory, categories }) {
   return { currentCategory, categories }
}

function mapDispatchToProps(dispatch) {
   return { changeCurrentCategory: (category) => dispatch(changeCurrentCategory(category)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)
