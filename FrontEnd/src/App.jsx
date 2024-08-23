import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css'
import {MainPage} from "./MainPage/MainPage";
import { MainNotLoged } from "./NotLoged/MainNotLoged";





export function App() {
  return (
    <div>

<Router>
<Routes>
   <Route exact path="/" element={<MainNotLoged/>} /> 
</Routes>
</Router>
</div>
  );
}