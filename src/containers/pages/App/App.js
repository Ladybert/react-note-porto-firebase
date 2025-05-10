import {
  BrowserRouter as Router,
  Routes,
  Route,
  // useNavigate,
  // useParams,
  // Outlet
} from 'react-router-dom'
import './App.scss';
import Dashboard from '../Dashboard';
import Login from '../Login';
import Register from '../Register';

function App() {
  return (
    <Router>
        <Routes>
          <Route path='/' exact element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
    </Router>
  );
}

export default App;
