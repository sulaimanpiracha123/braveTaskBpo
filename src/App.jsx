import { Route, Routes } from "react-router-dom";
import Listing from "./pages/Listing";
import Profile from "./pages/Profile";

function App() {

  return (
    <>
    <Routes>
    <Route path="/" element={<Listing/>}/>
    <Route path="/profile/:id" element={<Profile/>}/>

  </Routes>
  </>
  )
}

export default App
