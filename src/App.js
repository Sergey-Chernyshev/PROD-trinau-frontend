import './App.css';
import Navbar from './components/navBar/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Outlet, useNavigate } from 'react-router-dom';




function App() {
  const navigate = useNavigate()
  const loginToken = localStorage.getItem("accessToken");
  if (loginToken === undefined) {
    navigate("/login")
  }


  return (
    <div className="container-fluid overflow-hidden">
      <div className='row vh-100 overflow-auto'>

        <Navbar />
        <div className='col-sm-9 p-3 min-vh-100' id='content'>
          <Outlet />
        </div>
      </div>


    </div>
  );
}

export default App;
