import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import MainBody from './components/MainBody/MainBody'
import Carousel from './components/Carousel/Carousel'
import Search from './components/Autocomplete/Search'
import TicTacToe from './components/TicTacToe/TicTacToe.jsx'


const appRoute = createBrowserRouter([
  {
    path:"/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <MainBody/>
      },
      {
        path:"/carousel",
        element: <Carousel/>
      },
      {
        path: "/autocomplete",
        element: <Search/>
      },
      {
        path: "/ticTacToe",
        element: <TicTacToe boardDimension={3}/>
      }
    ]
  }
]);

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  // <React.StrictMode>
    <RouterProvider router={appRoute}/>
  // </React.StrictMode>
);

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )
