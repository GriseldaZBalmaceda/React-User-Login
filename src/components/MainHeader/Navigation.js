import React ,{useContext} from 'react';
import AuthContext from '../../store/AuthContext';
import classes from './Navigation.module.css';

const Navigation = (props) => {
  const ctxt = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      <ul>
        {ctxt.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {ctxt.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {ctxt.isLoggedIn && (
          <li>
            <button onClick={ctxt.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
    // <AuthContext.Consumer> 
    //   {(ctxt) => {
    //     return (
    //       <nav className={classes.nav}>
    //         <ul>
    //           {ctxt.isLoggedIn && (
    //             <li>
    //               <a href="/">Users</a>
    //             </li>
    //           )}
    //           {ctxt.isLoggedIn && (
    //             <li>
    //               <a href="/">Admin</a>
    //             </li>
    //           )}
    //           {ctxt.isLoggedIn && (
    //             <li>
    //               <button onClick={props.onLogout}>Logout</button>
    //             </li>
    //           )}
    //         </ul>
    //        </nav>
    //     )}}
    // </AuthContext.Consumer>
  );
};

export default Navigation;
