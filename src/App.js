import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import MainContainer from './components/MainContainer';
import Welcome from './components/Welcome';
import ChatArea from './components/ChatArea';
import Groups from './components/Groups';
import CreateGroups from './components/CreateGroups';
import Users from './components/Users';
import { useSelector } from 'react-redux';
import Signup from './components/Signup';

function App() {
  const lightTheme = useSelector((state)=>state.themeKey);
  return (
    <div className={"App"+((lightTheme)?"":" dark")}>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="app" element={<MainContainer />}>
        <Route path="welcome" element={<Welcome/>} />
        <Route path="chat/:id" element={<ChatArea/>} />
        <Route path="users" element={<Users/>} />
        <Route path="groups" element={<Groups/>} />
        <Route path="create-groups" element={<CreateGroups/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
