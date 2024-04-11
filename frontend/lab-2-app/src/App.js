import './App.css';
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import MessageList from "./components/MessageList";
import SendMessageForm from "./components/SendMessageForm";
import {AuthProvider} from "./components/AuthContext";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginForm/>}/>
                    <Route path="/register" element={<RegisterForm/>}/>
                    <Route path="/messages/:type" element={<MessageList/>}/>
                    <Route path="/send-message" element={<SendMessageForm/>}/>
                    <Route path="*" element={<Navigate to={"/login"} replace/> }/>
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
