import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthPage from "./Pages/AuthPage"
import FeedPage from "./Pages/FeedPage"
import ProtectedRoute from "./Pages/ProtectedRoute"

const App =()=>{
  return (
    <BrowserRouter> 
    <Routes>
    <Route path="/" element={<AuthPage />}/>
    <Route path="/" element={<ProtectedRoute/>}>
      <Route path="/home" element={<FeedPage />}/>
      <Route path="/1" element={<h1>özel sayfa</h1>}/>
      <Route path="/2" element={<h1>ayar sayfası</h1>}/>
    </Route>
    </Routes>
    </BrowserRouter>
  )
  
}
export default App