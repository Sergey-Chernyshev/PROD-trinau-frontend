import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

import 'react-toastify/dist/ReactToastify.css';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom';
import PostsPage from './pages/PostsPage/PostsPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Contact from './pages/PostsPage/PostsPagePublic';
import PostsPagePlanned from './pages/PostsPage/PostsPagePlanned';
import PostsPageDrafts from './pages/PostsPage/PostsPageDrafts';
import PostsPagePublic from './pages/PostsPage/PostsPagePublic';
import RegisterPage from './pages/RegisterPage/RegisterPage';




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
          element:  <ProfilePage/>
        },
        {
          path: 'statistic',
          element:  <ProfilePage/>
        },
        {
          path: 'register',
          element:  <RegisterPage/>
        }
      ]
  }
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
      <RouterProvider router={router}> 
        <App />
      </RouterProvider>

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
