import React from 'react'

import './styles.scss'
import TablePlan from '../../components/TablePlan/TablePlan'
import ActivityFeed from '../../components/ActivityFeed/ActivityFeed'
import Navigation, { pages } from '../../components/Navigation/Navigation'

function FrontPage() {
  return (
    <div className="home">
      <div className="home__activity-feed">
        <ActivityFeed/>
      </div>
      <div className="home__table-plan">
        <TablePlan/>
      </div>
      <div className="home__navigation">
        <Navigation currentPage={pages.HOME}/>
      </div>
    </div>
  )
}

export default FrontPage
