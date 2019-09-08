import React from 'react';
import './styles.scss'
import Card from '@material-ui/core/Card';

export default function ImageAdd() {
  return (
    <div>
      <Card className="card">
        <img
          src="https://static.thenounproject.com/png/187803-200.png"
          alt=""
        />
      </Card>
    </div>
  );
}
