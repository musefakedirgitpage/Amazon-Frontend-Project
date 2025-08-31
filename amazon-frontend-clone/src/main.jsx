import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import  { DataProvider } from './Components/DataProvider/Dataprovider.jsx'
import { reducer,intialState } from './Utility/reducer.js'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataProvider reducer={reducer} intialState={intialState}>
      <App />
    </DataProvider>
  </StrictMode>
);
