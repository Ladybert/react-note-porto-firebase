// Dependency
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // useNavigate,
  // useParams,
  // Outlet
} from 'react-router-dom'
import { Provider } from 'react-redux'

// Modular behavior
import Dashboard from '../Dashboard';
import Login from '../Login';
import Register from '../Register';
import { store } from '../../../config/redux'

// CSS import
import './App.scss';

function App() {
  return (
    <Provider store={store}>
      <Router>
          <Routes>
            <Route path='/' exact element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
      </Router>
    </Provider>
  );
}

export default App;
