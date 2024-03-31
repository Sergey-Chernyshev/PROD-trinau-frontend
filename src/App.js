import './App.css';
import { ToastContainer } from 'react-toastify';
// import Router from './pages/Router';
import Navbar from './components/navBar/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {  Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import PostsPage from './pages/PostsPage/PostsPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import { createRoot } from 'react-dom/client';
// import { showNotification } from './service-worker';





function App() {


  
  return (
      <div className="container-fluid">
        <div className='row'>
        
        <Navbar />
        <div className='col-sm-9 p-3 min-vh-100' id='content'>
          <Outlet /> 
        </div>
      </div>

      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnHover={false}
        draggable={true}
        theme="dark"
      />
    </div>
  );
}

export default App;
