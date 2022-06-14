import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserData } from '../store/user/selectors';
import styled from 'styled-components';
import profileEmptyPhoto from '../assets/icons/profile-empty-photo.svg';


export const Header: React.FC = () => {
	const navigate = useNavigate();
	const user = useSelector(selectUserData);

	const goBackHandler = () => {
		navigate(-1);
	};

	const goForwardHandler = () => {
		navigate(1);
	};

	const goProfileHandler = () => {
		navigate('/profile', {replace: false});
	};

	return (
		<Wrapper>
			<NavigationContainer>
				<NavigationButton onClick={goBackHandler}>
					<svg width="25" height="25" viewBox="0 0 20 36" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M20 5.5L7.5 18L20 30.5L17.5 35.5L0 18L17.5 0.5L20 5.5Z" fill="#000"/>
					</svg>
				</NavigationButton>

				<NavigationButton onClick={goForwardHandler}>
					<svg width="25" height="25" viewBox="0 0 20 36" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M6.10352e-05 30.5L12.5001 18L6.10352e-05 5.5L2.50006 0.5L20.0001 18L2.50006 35.5L6.10352e-05 30.5Z"
							fill="#000"/>
					</svg>
				</NavigationButton>
			</NavigationContainer>

			<ProfileContainer onClick={goProfileHandler}>
				<ProfileImageContainer>
					<ProfileImage src={user?.photo ? user?.photo : profileEmptyPhoto} width="35" height="35"/>
				</ProfileImageContainer>

				<ProfileName>{user?.name}</ProfileName>
			</ProfileContainer>
		</Wrapper>
	);
};

const Wrapper = styled.div`
  width: 90%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavigationContainer = styled.div`
  display: flex;
`;

const NavigationButton = styled.button`
  width: 40px;
  height: 40px;
  background-color: #32be58;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 25px;
  transition: background-color .15s linear;

  &:hover {
    background-color: #29e55b;
  }

  &:last-child {
    margin-right: 0;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 12px 5px 8px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.08);
  cursor: pointer;
  transition: background-color .15s linear;

  &:hover {
    background-color: rgba(255, 255, 255, 0.14);
  }
`;

const ProfileImageContainer = styled.div`
  margin-right: 10px;
`;

const ProfileImage = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 2px solid #32be58;
`;

const ProfileName = styled.div`
  font-weight: 700;
  font-size: 15px;
`;