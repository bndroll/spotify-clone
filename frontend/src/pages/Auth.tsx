import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth, selectUserErrorMessage, selectUserStatus } from '../store/user/selectors';
import { Status } from '../store/types';
import styled from 'styled-components';
import { LoginForm } from '../components/LoginForm';
import { RegisterForm } from '../components/RegisterForm';
import logo from '../assets/img/logo.png';


const Auth: React.FC = () => {
	const navigate = useNavigate();
	const isAuth = useSelector(selectIsAuth);
	const userStatus = useSelector(selectUserStatus);
	const userErrorMessage = useSelector(selectUserErrorMessage);
	const isReady = userStatus !== Status.LOADING && userStatus !== Status.NEVER;
	const [authType, setAuthType] = useState<'login' | 'register'>('login');
	const [showErrorMessage, setShowErrorMessage] = useState<boolean>(!!userErrorMessage);

	useEffect(() => {
		if (isAuth && isReady)
			navigate('/', {replace: true});
	}, [isAuth, isReady]);

	useEffect(() => {
		setShowErrorMessage(!!userErrorMessage);
	}, [userErrorMessage]);

	const setAuthTypeHandler = (type: 'register' | 'login') => {
		setAuthType(type);
	};

	const closeErrorMessageModal = () => {
		setShowErrorMessage(false);
	};

	return (
		<Wrapper>
			<AuthWrapper>
				<AuthHeader>
					<ButtonsContainer>
						<Button onClick={() => setAuthTypeHandler('login')}
								active={authType === 'login'}>
							Войти
						</Button>
						<Button onClick={() => setAuthTypeHandler('register')}
								active={authType === 'register'}>
							Зарегистрироваться
						</Button>
					</ButtonsContainer>

					{
						showErrorMessage &&
                        <ErrorMessageContainer onClick={closeErrorMessageModal}>
							{userErrorMessage}
                        </ErrorMessageContainer>
					}
				</AuthHeader>
				<AuthTitle>{authType === 'register' ? `Регистрация` : `Аутентификация`}</AuthTitle>

				<FormContainer>
					{
						authType === 'login' ?
							<LoginForm setShowErrorMessage={setShowErrorMessage}/> :
							<RegisterForm setShowErrorMessage={setShowErrorMessage} setAuthType={setAuthType}/>
					}

					<ImageContainer>
						<Image src={logo} alt={'logo'} width="200" height="200"/>
					</ImageContainer>
				</FormContainer>
			</AuthWrapper>
		</Wrapper>
	);
};

export default Auth;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AuthWrapper = styled.div`
  width: 100%;
  padding: 100px 50px;
  max-width: 1200px;
  background-color: #000000;
  border-radius: 10px;
`;

const AuthHeader = styled.div`
  margin: 0 auto 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 50px;
  border-bottom: 1px solid #0c0c0c;
`;

const ButtonsContainer = styled.div`
`;

interface IButtonProps {
	active: boolean;
}

const Button = styled.button`
  display: inline-block;
  background-color: ${(props: IButtonProps) => (props.active ? '#32be58' : '#ffffff')};
  padding: 12px 30px;
  color: ${(props: IButtonProps) => (props.active ? '#ffffff' : '#000000')};
  font-weight: 500;
  font-size: 16px;
  border-radius: 6px;
  margin-right: 25px;
  transition: all .1s linear;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    background-color: #32be58;
    color: #ffffff;
  }

  &:active {
    background-color: #259845;
    transform: translateY(2px);
  }
`;

const ErrorMessageContainer = styled.button`
  border-radius: 6px;
  border: 1px dashed #32be58;
  padding: 10px 30px;
  background-color: transparent;
  color: #ffffff;
  font-size: 14px;
  transition: background-color .1s linear;

  &:hover {
    background-color: #32be58;
  }
`;

const AuthTitle = styled.div`
  font-weight: 700;
  font-size: 60px;
  margin-bottom: 70px;
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImageContainer = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
	width: 200px;
`;