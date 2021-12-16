import React from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route
} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import MatchList from './components/MatchList';
import UserInformation from './components/UserInformation';
import UserMatches from './components/UserMatches';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/match' element={<MatchList />}></Route>
        <Route path='/user' element={<UserInformation />}></Route>
        <Route path='/matches' element={<UserMatches />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
