import { Routes, Route,useNavigate, } from 'react-router-dom';
import { UseContext } from './Context/ContextProvider';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

function App() {
  const [state,dispatch] = UseContext();
  const navigate = useNavigate();

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {!state.loggedIn && <Route path="/auth" element={<AuthPage />} />}
       {state.loggedIn && <Route path="/profile" element={<UserProfile />} />}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
  