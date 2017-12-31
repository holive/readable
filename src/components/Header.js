import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import { openModal, changeCurrentCategory } from '../actions'
import { connect } from 'react-redux'

const Header = ({ openDialog, changeCurrentCategory }) => {
   return (
      <header>
         <div className="container">
            <Link to="/" onClick={() => changeCurrentCategory('all')}>
               <img src={logo} alt="Readable logo" />
            </Link>

            <Button
               fab color="accent"
               aria-label="add"
               onClick={() => openDialog()}
            >
               <AddIcon />
            </Button>
         </div>
      </header>
   )
}

function mapDispatchToProps(dispatch) {
   return {
      openDialog: () => dispatch(openModal()),
      changeCurrentCategory: (category) => dispatch(changeCurrentCategory(category))
   }
}

export default connect(null, mapDispatchToProps)(Header)