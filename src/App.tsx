
import { Auth0Provider } from '@auth0/auth0-react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PropertyManagerDashboard from './pages/PropertyManagerDashboard';
import TenantDashboard from './pages/TenantDashboard';
import '@mantine/core/styles.css';
import './App.css';


const App = () => {
  return (
    <Auth0Provider
      domain="dev-hoempxots7snf8ar.us.auth0.com"
      clientId="5k0OLC5Q7s5MHthaDYVFx7GynDOZl8nn"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: 'https://dev-hoempxots7snf8ar.us.auth0.com/api/v2/',
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/property-manager-dashboard" element={<PropertyManagerDashboard />} />
          <Route path="/tenant-dashboard" element={<TenantDashboard />} />
        </Routes>
      </Router>
    </Auth0Provider>
  );
};

export default App;
