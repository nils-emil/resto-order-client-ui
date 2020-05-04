import React from 'react';
import {Link} from 'react-router-dom';
import './styles.scss'
import Button from '@material-ui/core/Button';

function ErrorPage() {
  return (
    <div className="error-page">
      <p>I think you are lost.</p>

      <Link to="/">
        <Button color="primary" variant="extended" size={'large'}>Go back</Button>
      </Link>
    </div>);
}

export default ErrorPage;
