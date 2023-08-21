import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import UserInfo from './pages/userInfo';

function App() {

  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/userInfo" element={<UserInfo />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
