import { Link,useNavigate } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import { UseContext } from '../../Context/ContextProvider';

const MainNavigation = () => {
  const [state,dispatch] = UseContext();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    dispatch({type:"LOGOUT"});
    navigate("/auth");


  };


  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!state.loggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {state.loggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {state.loggedIn && (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
