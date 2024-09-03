import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css'
import {HomePage} from "./MainPage/HomePage";
import { MainNotLoged } from "./NotLoged/MainNotLoged";
import { Signup } from "./Auth/Routes/Signup";
import {SigninRoute} from './Auth/Routes/SigninRoute';
import { CreateAccRoute } from "./Auth/Routes/CreateAccRoute";
import { ConfirmSignin } from "./Auth/Routes/ConfirmSignin";
import { DietPage } from "./MainPage/DietPage";
import { LikesPage } from "./MainPage/LikesPage";
import { SleepPage } from "./MainPage/SleepPage";
import { ExercisePage } from "./MainPage/ExercisePage";
import { ChangesPage } from "./MainPage/ChangesPage";
import { ProfilePage } from "./Profile/ProfilePage";
import { Verification } from "./Auth/Routes/Verification";
import { SetupStep1 } from "./Setup/SetupStep1";
import { SetupStep2 } from "./Setup/SetupStep2";
import { SetupStep3 } from "./Setup/SetupStep3";
import { ProfileChange } from "./Profile/ProfileChange";
import { ProfileSleep } from "./Profile/ProfileSleep";
import {ProfileExercise} from "./Profile/ProfileExercise";
import {ProfileDiet} from "./Profile/ProfileDiet";
import {ProfileChangePage} from "./Profile/ProfileChangePage";







export function App() {



  return (
    <div>

<Router>
<Routes>
   <Route exact path="/" element={<MainNotLoged/>} /> 
    <Route exact path="/feed/home" element={<HomePage/>} />
    <Route exact path="/feed/diet" element={<DietPage/>} />
    <Route exact path="/feed/likes" element={<LikesPage/>} />
    <Route exact path="/feed/sleep" element={<SleepPage/>} />
    <Route exact path="/feed/exercise" element={<ExercisePage/>} />
    <Route exact path="/feed/changes" element={<ChangesPage/>} />
   <Route exact path="/signup" element={<Signup/>} />
    <Route exact path="/signin" element={<SigninRoute/>} />
    <Route exact path="/create-account" element={<CreateAccRoute/>} />
    <Route exact path="/confirm-signin" element={<ConfirmSignin/>} />
    <Route exact path="/profile/diet" element={<ProfileDiet/>} />
    <Route exact path="/profile/sleep" element={<ProfileSleep/>} />
    <Route exact path="/profile/exercise" element={<ProfileExercise/>} />
    <Route exact path="/profile/changing" element={<ProfileChangePage/>} />
    <Route exact path="/verification" element={<Verification/>} />
    <Route exact path="/setup/food" element={<SetupStep1/>} />
    <Route exact path="/setup/exercise" element={<SetupStep2/>} />
    <Route exact path="/setup/sleep" element={<SetupStep3/>} />
    <Route path="/profile/change" element={<ProfileChange />} />
    <Route path="/profile/change/:category" element={<ProfileChange />} />
    <Route path="/profile/change/:category/:option" element={<ProfileChange />} />


    




</Routes>
</Router>

</div>
  );
}