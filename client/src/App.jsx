import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import UserInfo from './pages/userInfo';
import OpenBid from './pages/open-bid';
import io from 'socket.io-client';
import { useState } from 'react';
import UserContext from './components/UserContext';
import Signup from './pages/signup';
import Login from './pages/login';
import NewAuction from './pages/newAuction.jsx';
import UserAgreement from './pages/userAgreement';
import Dashboard from './pages/dashboard.jsx';
import Product from './pages/product.jsx';

const socket = io.connect('http://localhost:3000');

function App() {
  const testUser = {
    userid: '401',
    firstname: 'Janet',
    lastname: 'Door'
  };
  const [currentUser, setCurrentUser] = useState(testUser); 

  return (
    <Router>
      <UserContext.Provider value={{ currentUser }}>
        <div className='App'>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/userInfo" element={<UserInfo />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/newAuction" element={<NewAuction />} />
            <Route path="/userAgreement" element={<UserAgreement />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/product/:auctionId" element={<Product />} />
            <Route path="/open-bid/:auctionID" element={
              <OpenBid 
                socket={socket}
              />
            } />
          </Routes>
        </div>
      </UserContext.Provider>
    </Router>
  )
}

export default App;
