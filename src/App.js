
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
