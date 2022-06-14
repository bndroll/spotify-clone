import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentTrack } from '../store/track/selectors';
import { selectUserData } from '../store/user/selectors';


export const Navbar: React.FC = () => {
	const user = useSelector(selectUserData);
	const currentTrack = useSelector(selectCurrentTrack);
	const [activeNav, setActiveNav] = useState<'main' | 'search' | 'media' | 'studio'>('main');

	return (
		<Wrapper>
			<NavLinksContainer>
				<NavLink to={'/'} onClick={() => setActiveNav('main')} active={activeNav === 'main'}>
					<svg width="25" height="25" viewBox="0 0 19 21" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M8.25311 1.04948C8.60479 0.76141 9.04538 0.604 9.49998 0.604C9.95459 0.604 10.3952 0.76141 10.7469 1.04948L17.6088 6.64427C17.8423 6.8357 18.0303 7.07665 18.1592 7.34968C18.2881 7.62271 18.3547 7.92099 18.3541 8.22292V18.3714C18.3541 19.4896 17.4625 20.3958 16.362 20.3958H13.7057C12.6052 20.3958 11.7135 19.4896 11.7135 18.3714V13.4948C11.7135 13.1224 11.4167 12.8203 11.0495 12.8203H7.9505C7.58384 12.8203 7.28644 13.1224 7.28644 13.4948V18.3719C7.28644 19.4901 6.39477 20.3964 5.29425 20.3964H2.638C1.538 20.3958 0.645817 19.4896 0.645817 18.3714V8.22292C0.645252 7.92099 0.711831 7.62271 0.840735 7.34968C0.969638 7.07665 1.15764 6.8357 1.39113 6.64427L8.25311 1.04948Z"/>
					</svg>

					<span>Главная</span>
				</NavLink>

				<NavLink to={'/search'} onClick={() => setActiveNav('search')} active={activeNav === 'search'}>
					<svg width="25" height="25" viewBox="0 0 25 25" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M22.6562 21.5516L16.7562 15.6516C18.174 13.9495 18.8811 11.7663 18.7302 9.55618C18.5793 7.34607 17.5822 5.27921 15.9463 3.78556C14.3103 2.29191 12.1615 1.48647 9.94683 1.53679C7.73215 1.58711 5.62213 2.48932 4.05572 4.05574C2.4893 5.62215 1.58709 7.73217 1.53677 9.94684C1.48645 12.1615 2.29189 14.3103 3.78554 15.9463C5.27919 17.5822 7.34605 18.5793 9.55616 18.7302C11.7663 18.8811 13.9494 18.1741 15.6515 16.7563L21.5515 22.6563L22.6562 21.5516ZM3.12498 10.1563C3.12498 8.7656 3.53736 7.40618 4.30996 6.2499C5.08257 5.09361 6.1807 4.1924 7.46549 3.66022C8.75028 3.12804 10.164 2.9888 11.528 3.2601C12.8919 3.53141 14.1447 4.20107 15.1281 5.18441C16.1114 6.16774 16.7811 7.42059 17.0524 8.78452C17.3237 10.1485 17.1844 11.5622 16.6523 12.847C16.1201 14.1318 15.2189 15.2299 14.0626 16.0025C12.9063 16.7751 11.5469 17.1875 10.1562 17.1875C8.29206 17.1854 6.50484 16.444 5.18667 15.1258C3.86851 13.8076 3.12705 12.0204 3.12498 10.1563V10.1563Z"/>
					</svg>

					<span>Поиск</span>
				</NavLink>

				<NavLink to={'/media'} onClick={() => setActiveNav('media')} active={activeNav === 'media'}>
					<svg width="25" height="25" viewBox="0 0 20 20" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M1.875 0C0.8375 0 0 0.8375 0 1.8725V18.0988C0 19.1338 0.83875 19.9712 1.875 19.9712H3.125C4.15875 19.9712 4.99875 19.1338 4.99875 18.0988V1.8725C4.99875 0.8375 4.15875 0 3.12375 0H1.87375H1.875ZM8.1225 0C7.0875 0 6.2475 0.8375 6.2475 1.8725V18.0988C6.2475 19.1338 7.0875 19.9712 8.1225 19.9712H9.3725C10.4075 19.9712 11.2462 19.1338 11.2462 18.0988V1.8725C11.2462 0.83875 10.4075 0 9.37125 0H8.12125H8.1225ZM17.1475 5.19625C17.0904 4.9488 16.9836 4.71554 16.8336 4.5106C16.6837 4.30566 16.4936 4.13333 16.275 4.00405C16.0565 3.87477 15.8139 3.79124 15.562 3.75853C15.3102 3.72582 15.0544 3.7446 14.81 3.81375L13.8787 4.07625C13.4238 4.20488 13.0343 4.50085 12.7886 4.90475C12.5428 5.30865 12.4589 5.79057 12.5538 6.25375L15.0575 18.5025C15.1086 18.7508 15.2096 18.9861 15.3543 19.1942C15.4989 19.4024 15.6843 19.579 15.8992 19.7135C16.114 19.848 16.3539 19.9375 16.6044 19.9766C16.8548 20.0158 17.1106 20.0037 17.3563 19.9412L18.5875 19.6287C19.575 19.3787 20.18 18.3863 19.9525 17.395L17.1475 5.195V5.19625Z"/>
					</svg>

					<span>Библиотека</span>
				</NavLink>

				{
					user && user.role === 'musician' &&
					<NavLink to={'/studio'} onClick={() => setActiveNav('studio')} active={activeNav === 'studio'}>
						<svg width="25" height="25" viewBox="0 0 21 21" fill="#ffffff"
							 xmlns="http://www.w3.org/2000/svg">
							<path
								d="M18.8333 0.0833321H6.33331C5.18748 0.0833321 4.24998 1.02083 4.24998 2.16667V14.6667C4.24998 15.8125 5.18748 16.75 6.33331 16.75H18.8333C19.9791 16.75 20.9166 15.8125 20.9166 14.6667V2.16667C20.9166 1.02083 19.9791 0.0833321 18.8333 0.0833321ZM16.75 5.29167H13.625V11.0208C13.625 11.7115 13.3506 12.3739 12.8622 12.8623C12.3739 13.3506 11.7115 13.625 11.0208 13.625C10.3301 13.625 9.66776 13.3506 9.17939 12.8623C8.69101 12.3739 8.41665 11.7115 8.41665 11.0208C8.41665 10.3302 8.69101 9.66778 9.17939 9.17941C9.66776 8.69103 10.3301 8.41667 11.0208 8.41667C11.6146 8.41667 12.1458 8.61458 12.5833 8.94792V3.20833H16.75V5.29167ZM2.16665 4.25H0.083313V18.8333C0.083313 19.9792 1.02081 20.9167 2.16665 20.9167H16.75V18.8333H2.16665V4.25Z"/>
						</svg>

						<span>Студия</span>
					</NavLink>
				}
			</NavLinksContainer>

			<CurrentSongPhoto photoUrl={currentTrack?.picture}/>
		</Wrapper>
	);
};

const Wrapper = styled.div`
  padding: 80px 0 0 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const NavLinksContainer = styled.div`
  padding: 0 50px;
`;

interface INavLinkProps {
	active: boolean;
}

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  transition: all .15s linear;

  svg {
    fill: ${(props: INavLinkProps) => (props.active ? '#ffffff' : '#ababab')};
    transition: all .15s linear;
  }

  span {
    color: ${(props: INavLinkProps) => (props.active ? '#ffffff' : '#ababab')};
    font-size: 18px;
    margin-left: 16px;
    font-weight: 700;
    transition: all .15s linear;
  }

  &:hover {
    span {
      color: #ffffff;
    }

    svg {
      fill: #ffffff;
    }
  }
`;

interface ICurrentSongPhotoProps {
	photoUrl: string | undefined;
}

const CurrentSongPhoto = styled.div`
  width: 100%;
  height: 50.5%;

  ${(props: ICurrentSongPhotoProps) => (props.photoUrl ?
          `background: url('${props.photoUrl}') center / cover no-repeat;` :
          `background-color: transparent;`)}
`;