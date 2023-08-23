import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import UserInfo from './pages/userInfo';
import Signup from './pages/signup';
import Login from './pages/login';
import NewAuction from './pages/newAuction.jsx';

function App() {
    return (
        <Router>
            <div className='App'>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/userInfo" element={<UserInfo />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/newAuction" element={<NewAuction />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
