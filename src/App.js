import React, { useState ,useEffect} from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import {AuthContext }from './components/STORE/auth-content';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const userinfo = localStorage.getItem('islog');
    if (userinfo === '1') {
      setIsLoggedIn(true);
    }
  }, []);
  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("islog" ,'1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('islog');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{
      isLoggedIn:isLoggedIn,
      onLogout:logoutHandler
      }}
      >
      <MainHeader  />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
      </AuthContext.Provider>
   
  );
}


export default App;
