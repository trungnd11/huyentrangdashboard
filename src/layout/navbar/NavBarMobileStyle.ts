import styled, { keyframes } from "styled-components";
import { fadeInLeft, zoomIn, rotateIn, flip } from "react-animations";
import { MainColor } from "../../assets/styled-components/Variables";

const showNavBar = keyframes`${zoomIn}`;

export const NavBarMobileStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 4rem;
  z-index: 1;
  background-image: radial-gradient(
    circle 610px at 5.2% 51.6%,
    rgba(5, 8, 114, 1) 0%,
    rgba(7, 3, 53, 1) 97.5%
  );
  animation: .6s ${showNavBar};

  .navbar-mobile {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.75rem;
    .btn-list-menu {
      flex-basis: 10%;
      i {
        color: ${MainColor};
        font-size: 1.5rem;
      }
    }
    .brand-name {
      flex-shrink: 1;
      h5 {
        font-family: Great Vibes, cursive;
        font-size: 1.8rem;
        color: ${MainColor};
        margin-bottom: 0;
      }
    }
    .auth-avatar {
      flex-basis: 10%;

      img {
        width: 100%;
        border-radius: 50%;
        border: 1px solid ${MainColor};
      }
    }
  }

  .overlay {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, .5);
  }
  .list-menu {
    width: 70%;
    height: 100vh;
    position: absolute;
    background-image: radial-gradient(
      circle 610px at 5.2% 51.6%,
      rgba(5, 8, 114, 1) 0%,
      rgba(7, 3, 53, 1) 97.5%
    );
    padding: 0 .7rem;
  }
`;

const showMenuUser = keyframes`${fadeInLeft}`;

export const DivListMenu = styled.div`
  animation: 0.6s ${showMenuUser};
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .author-code {
    margin-bottom: 5rem;
    a {
      color: ${MainColor};
    }
  }
`;

const showBtnMenu = keyframes`${rotateIn}`;

export const BtnIcon = styled.i`
  animation: .6s ${showBtnMenu};
`

export const DivAvatar = styled.img`
  animation: 0.6s ${showBtnMenu};
`;

const showBrandName = keyframes`${flip}`

export const BrandName = styled.h5`
  animation: 2s 1s ${showBrandName};
`;