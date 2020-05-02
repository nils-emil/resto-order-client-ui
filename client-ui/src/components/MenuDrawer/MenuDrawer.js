import React, { useEffect, useState } from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import './styles.scss'
import { withRouter } from 'react-router-dom'
import { getCategories } from '../../services/adminService'

function MenuDrawer (props) {

  const [categories, setCategories] = useState([])

  const openMenu = (categoryId) => {
    props.history.push({
        pathname: '/menu',
        search: `categoryId=${categoryId}`
      }
    )
    props.closeDrawer()
  }

  useEffect(() => {
    getCategories(props.organizationId).subscribe(e => {
        setCategories(e.data)
      }
    )
  }, [props.organizationId])

  const sideList = () => (
    <div role="presentation">
      <List>
        {categories.map((text) => (
          <ListItem button key={text._id}
                    onClick={() => openMenu(text._id)}>
            <ListItemText primary={text.name}/>
          </ListItem>
        ))}
      </List>
    </div>
  )

  return (
    <div>
      <SwipeableDrawer open={props.isOpen}
                       onOpen={props.openDrawer}
                       onClose={props.closeDrawer}>
        {sideList()}
      </SwipeableDrawer>
    </div>
  )
}

export default withRouter(MenuDrawer)
