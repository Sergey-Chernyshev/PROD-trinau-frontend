import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

import 'react-toastify/dist/ReactToastify.css';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import PostsPage from './pages/PostsPage/PostsPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Contact from './pages/PostsPage/PostsPagePublic';
import PostsPagePlanned from './pages/PostsPage/PostsPagePlanned';
import PostsPageDrafts from './pages/PostsPage/PostsPageDrafts';
import PostsPagePublic from './pages/PostsPage/PostsPagePublic';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import CreationPostPage from './pages/CreationPostPage/CreationPostPage';
import { ToastContainer } from 'react-toastify';
import Page404 from './pages/Page404/Page404';
import StatisticPage from './pages/StatisticPage/StatisticPage';
import CalendarPage from './pages/CalendarPage/CalendarPage';




// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", function() {
//     navigator.serviceWorker.register("./sw.js")
//       .then(function(registration) {
//         console.log("ServiceWorker registration successful with scope: ", registration.scope)
        
//       })
//       .catch(function(err) {
//         console.log("ServiceWorker registration failed: ", err)
//       })
//   })
// }

const router = createBrowserRouter([
  {
      path: '/',
      element:  <App/>,
      children: [
        {
          path: 'profile',
          element:  <ProfilePage/>
        },
        {
          path: 'posts',
          element:  <PostsPage/>,
          children: [
            {         
              index: true,
              element: <Navigate to="/posts/public" replace />,
            },
            {
              path: '/posts/public',
              element:  <PostsPagePublic/>,
            },
            {
              path: '/posts/planned',
              element:  <PostsPagePlanned/>,
            },
            {
              path: '/posts/drafts',
              element:  <PostsPageDrafts/>,
            }
          ]
        },
        {
          path: 'calendar',
          element:  <CalendarPage/>
        },
        {
          path: 'statistic',
          element:  <StatisticPage/>
        },
        {
          path: 'createpost',
          element:  <CreationPostPage/>
        },
        
      ]
  },
  {
    path: 'login',
    element:  <LoginPage/>
  },
  {
    path: 'register',
    element:  <RegisterPage/>
  },
  {
    path: '*',
    element:  <Page404 />
  },
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
      <RouterProvider router={router}> 
        <App />
      </RouterProvider>


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
    {/* </BrowserRouter> */}
  </React.StrictMode>
  
)
// root.render(
//       {/* <BrowserRouter> */}
//         <App />
//       {/* </BrowserRouter> */}
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
