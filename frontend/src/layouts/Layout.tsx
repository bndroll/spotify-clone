import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Navbar } from '../components/Navbar';
import { Player } from '../components/Player';


export const Layout: React.FC = () => {
	return (
		<Wrapper>
			<NavbarContainer>
				<Navbar/>
			</NavbarContainer>

			<HeaderContainer>
				<Header/>
			</HeaderContainer>

			<MainContainer>
				<Outlet/>
			</MainContainer>

			<PlayerContainer>
				<Player/>
			</PlayerContainer>
		</Wrapper>
	);
};

const Wrapper = styled.div`
  height: 100%;
  width: 100%;

  display: grid;
  grid-template-rows: 70px 1fr 100px;
  grid-template-columns: 0.8fr 3.5fr;
  grid-template-areas:
		  "navbar header"
		  "navbar main"
		  "player player";
`;

const HeaderContainer = styled.header`
  grid-area: header;
  background-color: #131313;
`;

const NavbarContainer = styled.div`
  grid-area: navbar;
  background-color: #0e0e0e;
`;

const MainContainer = styled.div`
  grid-area: main;
  overflow-y: scroll;
`;

const PlayerContainer = styled.div`
  grid-area: player;
  background-color: #212121;
`;