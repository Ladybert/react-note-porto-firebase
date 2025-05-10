// src/utils/withNavigation.js
import { useNavigate } from 'react-router-dom';

const withNavigation = (Component) => {
  return function Wrapper(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
};

export default withNavigation;
