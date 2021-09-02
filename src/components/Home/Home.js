import React, {useContext} from 'react';
import AuthContext from '../../store/AuthContext';
import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import classes from './Home.module.css';

const Home = (props) => {
  const ctxt = useContext(AuthContext)
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button onClick={ctxt.onLogout}>Logout</Button>
    </Card>
  );
};

export default Home;