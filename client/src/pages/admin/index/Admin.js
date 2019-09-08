import React from 'react';

import './styles.scss'
import Card from './components/Card/Card';

function Admin(props) {

  return (
    <div className="admin">


      <Card
        text="Welcome to the Vapiano admin panel!"
      />

      <Card
        linkTo="admin/menu-list"
        imageUrl="https://www.weightwatchers.com/us/sites/default/files/styles/wwvs_default_image/public/article_masthead/allaboutzeropointfoods_yk_ww_080218_0spvfoods_190_1250x600.jpg?itok=Fo_ThSVk"
        text="Menu"
      />

      <Card
        text="Settings"
      />


      <Card
        text="Statistics"
        imageUrl="https://static.vecteezy.com/system/resources/thumbnails/000/152/182/small/free-linear-web-statistics.jpg"
      />
    </div>
  );
}

export default Admin;
