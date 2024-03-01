import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PostEmployee from './pages/employee/PostEmployee';
import NoMatch from './pages/NoMatch/NoMatch';
import Dashboard from './pages/dashboard/Dashboard';
import UpdateEmployee from './pages/employee/UpdateEmployee';

import Header from './pages/header/Header';
function App() {
  return (
    <>
    <Header />
        <Router>
          <Routes>
              <Route path="/" element={<Dashboard/>} />
              <Route path="/employee" element={<PostEmployee />} />
              <Route path="/employee/:id" element={<UpdateEmployee />} />
              <Route path="*" element={<NoMatch />} />
          </Routes>
        </Router>
    </>
  );
}

export default App;
