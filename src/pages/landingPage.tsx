import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LandingPageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #e6ffe6, #ffffff);
`;

const LoginBox = styled.div`
  background: rgba(255, 255, 255, 0.7);
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-right: 100px;
`;

const LoginButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: #45a049;
  }
`;

const Title = styled.h1`
  color: #2f4f2f;
  font-family: 'Arial', sans-serif;
`;

const LandingPage = () => {
  const { loginWithRedirect, user, isAuthenticated } = useAuth0();
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      const userRole = user['https://your-domain.com/roles']?.[0];
      setRole(userRole);
      if (userRole === 'Property Manager') {
        navigate('/property-manager-dashboard');
      } else if (userRole === 'Tenant') {
        navigate('/tenant-dashboard');
      }
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <LandingPageContainer>
      <Title>Welcome to Property Management Portal</Title>
      <LoginBox>
        <h2>Login</h2>
        <LoginButton onClick={() => loginWithRedirect()}>Log In with Auth0</LoginButton>
      </LoginBox>
    </LandingPageContainer>
  );
};

export default LandingPage;
