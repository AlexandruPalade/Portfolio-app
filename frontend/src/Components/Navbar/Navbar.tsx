import styled from "styled-components";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <NavbarContainer>
      <Name>
        <span>Alex.dev</span>
      </Name>
      <NavLinks>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/about">About</StyledLink>
      </NavLinks>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.nav`
  padding: 0.25rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 40rem;
  @media (min-width: 1480px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const Name = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (min-width: 1480px) {
    justify-content: flex-start;
  }
`;

const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 20px;
  @media (min-width: 1480px) {
    flex-direction: row;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: bold;
  color: #edf4e1;
`;

export default Navbar;
