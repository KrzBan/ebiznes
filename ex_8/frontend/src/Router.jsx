import {  Routes, Route, BrowserRouter } from "react-router-dom";
 
//history
import { history } from './utils/History';
 
//pages
import App from './App.jsx'
import Login from './components/Login'
import Register from './components/Register'
 
function AppRouter() {
   return (
       <BrowserRouter history={history}>
            <Routes>
                <Route path="/"             Component={App} />
                <Route path="/login"        Component={Login} />
                <Route path="/register"     Component={Register} />
            </Routes>
       </BrowserRouter>
   );
}
 
export default AppRouter