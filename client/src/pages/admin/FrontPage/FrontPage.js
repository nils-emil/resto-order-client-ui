import React from 'react';

import './styles.scss'
import {GridList} from '@material-ui/core';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import GridListTile from '@material-ui/core/GridListTile';
import {Link} from 'react-router-dom';

function FrontPage() {

  const links = [
    {
      text: 'Tables that required service!',
      img: 'https://image.shutterstock.com/image-vector/people-waiting-long-queue-counter-600w-1065200126.jpg',
      linkTo: '/admin/service-calls'
    },
    {
      text: 'Menu',
      img: 'https://i1.wp.com/www.delephant.com.au/wp-content/uploads/2019/03/2018-DE-Street-Food-Take-Away-Menu_page-0001-3.jpg',
      linkTo: '/admin/menu-list'
    },
    {
      text: 'Settings',
      linkTo: '/admin'
    },
    {
      text: 'Statistics',
      img: 'https://static.vecteezy.com/system/resources/thumbnails/000/152/182/small/free-linear-web-statistics.jpg',
      linkTo: '/admin'
    }
  ];

  return (
    <GridList cellHeight={260} className="grid-list">
      {links.map(tile => (
        <GridListTile key={tile.text} className="grid-tile">
          <Link to={tile.linkTo}>
            <img src={tile.img} alt={tile.text}/>
            <GridListTileBar
              title={tile.text}
            />
          </Link>
        </GridListTile>
      ))}
    </GridList>
  );
}

export default FrontPage;
