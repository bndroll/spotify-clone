import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../store/store';
import { useSelector } from 'react-redux';
import { selectUserData } from '../store/user/selectors';
import { singOut } from '../store/auth/asyncActions';
import { UpdateUserForm } from '../components/UpdateUserForm';
import { UpdateUserPhotoForm } from '../components/UpdateUserPhotoForm';


const Profile: React.FC = ({}) => {
	const dispatch = useAppDispatch();
	const user = useSelector(selectUserData);
	const [formType, setFormType] = useState<'update' | 'updatePhoto' | null>(null);

	const logoutHandler = () => {
		dispatch(singOut());
	};

	const setUpdateFormTypeHandler = (type: 'update' | 'updatePhoto') => {
		if (formType === type) {
			setFormType(null);
		} else {
			setFormType(type);
		}
	};

	return (
		<Wrapper>
			<ImageContainer>
				<Image src={user?.photo}/>
			</ImageContainer>

			<Info>
				<Title>{user?.name}</Title>
				<Email><span>Почта:</span> {user?.email}</Email>
				{
					user?.role === 'musician' &&
                    <Role><span>Роль:</span> Музыкант</Role>
				}
				<About><span>Обо мне:</span> {user?.about}</About>
			</Info>

			<ButtonsContainer>
				<Button onClick={logoutHandler}>Выйти</Button>
				<Button onClick={() => setUpdateFormTypeHandler('update')}
						isActive={formType === 'update'}>Изменить</Button>
				<Button onClick={() => setUpdateFormTypeHandler('updatePhoto')} isActive={formType === 'updatePhoto'}>Изменить
					фото</Button>
			</ButtonsContainer>

			{
				formType === 'update' &&
                <UpdateUserForm id={user!._id} setFormType={setFormType}/>
			}

			{
				formType === 'updatePhoto' &&
                <UpdateUserPhotoForm id={user!._id} setFormType={setFormType}/>
			}
		</Wrapper>
	);
};

export default Profile;

const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 50%;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.55);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 405px;
  object-fit: cover;
`;

const Info = styled.div`
  width: 90%;
  margin: 60px auto;
  position: relative;
  font-size: 20px;

  span {
    font-weight: 700;
    margin-right: 10px;
  }
`;

const Title = styled.div`
  position: absolute;
  font-size: 90px;
  font-weight: 700;
  top: -180px;
  left: -20px;
  padding: 10px 20px;
`;

const Email = styled.div`
  margin-top: 10px;
`;

const Role = styled.div`
  margin-top: 10px;
`;

const About = styled.div`
  margin-top: 10px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  width: 90%;
  margin: 0 auto 50px;
`;

interface IButtonProps {
	isActive?: boolean;
}

const Button = styled.button`
  padding: 14px 38px;
  background-color: ${(props: IButtonProps) => (props.isActive ? 'transparent' : '#32be58')};
  color: ${(props: IButtonProps) => (props.isActive ? '#ffffff' : '#000000')};
  font-size: 16px;
  font-weight: 700;
  border-radius: 10px;
  margin-right: 15px;
  border: 2px solid ${(props: IButtonProps) => (props.isActive ? '#32be58' : 'transparent')};
  transition: all .15s linear;

  &:hover {
    color: #ffffff;
    background-color: transparent;
    border: 2px solid #32be58;
  }

  &:last-child {
    margin-right: 0;
  }

  &:active {
    transform: translateY(2px);
  }
`;