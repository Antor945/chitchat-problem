import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Registration from './Pages/Registration/Registration.jsx';
import Login from './Pages/Registration/Login.jsx';
import firebaseConfig from './Authentication/FirebaseConfig.jsx';
import 'react-toastify/dist/ReactToastify.css';
import Forgot from './Pages/Registration/ForgotPassword/Forgot.jsx';
import Store from './Store.jsx';
import { Provider } from 'react-redux';
import ImgUplod from './Pages/Registration/ImgUplod.jsx';
import Home from './Pages/Registration/Home.jsx';


const router = createBrowserRouter([
  {
    path: "/Registration",
    element: <Registration />,
  },
  {
    path: "/Home",
    element: <Home />,
  },
  {
    path: "/Forgot",
    element: <Forgot/>,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/ImgUplod",
    element: <ImgUplod />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={Store}>
      <RouterProvider router={router} />
    </Provider>

  </React.StrictMode>,
)
