import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css'
import {MainPage} from "./MainPage/MainPage";
import { MainNotLoged } from "./NotLoged/MainNotLoged";
import { Signup } from "./Auth/Routes/Signup";
import {SigninRoute} from './Auth/Routes/SigninRoute';
import { CreateAccRoute } from "./Auth/Routes/CreateAccRoute";
import { ConfirmSignin } from "./Auth/Routes/ConfirmSignin";





export function App() {



  return (
    <div>

<Router>
<Routes>
   <Route exact path="/" element={<MainNotLoged/>} /> 
    <Route exact path="/home" element={<MainPage/>} />
   <Route exact path="/signup" element={<Signup/>} />
    <Route exact path="/signin" element={<SigninRoute/>} />
    <Route exact path="/create-account" element={<CreateAccRoute/>} />
    <Route exact path="/confirm-signin" element={<ConfirmSignin/>} />

</Routes>
</Router>

</div>
  );
}