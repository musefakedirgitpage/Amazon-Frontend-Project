import './App.css'
import Routing from './Routing'
import { Type } from './Utility/reducer'
import { auth } from './Utility/firbas'
import { useContext, useEffect } from 'react'
import { DataContext } from './Components/DataProvider/Dataprovider'


function App() {
  const[{user},dispatch]=useContext(DataContext)
  useEffect(()=>{
auth.onAuthStateChanged((authUser)=>{
  if(authUser){
    dispatch({
      type:Type.SET_USER,
      user:authUser
    })
  }else{
    dispatch({
      type:Type.SET_USER,
      user:null
    })
  }
})
  },[])
  return (
    <>
      <Routing/>
    </>
  )
}

export default App
