import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectUserData } from '../store/user/selectors';
import { useNavigate } from 'react-router-dom';
import { CreateTrackForm } from '../components/CreateTrackForm';
import { CreateAlbumForm } from '../components/CreateAlbumForm';
import { findAllClosableAlbums } from '../store/album/asyncActions';
import { useAppDispatch } from '../store/store';
import { selectClosableAlbums } from '../store/album/selectors';
import { ClosableAlbumItem } from '../components/ClosableAlbumItem';
import { findAllClosableTracks } from '../store/track/asyncActions';


const Studio: React.FC = ({}) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const user = useSelector(selectUserData);
	const closableAlbums = useSelector(selectClosableAlbums);
	const [activeTab, setActiveTab] = useState<'track' | 'album' | null>(null);

	useEffect(() => {
		if (user && user.role !== 'musician') {
			navigate('/', {replace: false});
		}

		dispatch(findAllClosableAlbums());
		dispatch(findAllClosableTracks());
	}, []);

	return (
		<Wrapper>
			<ButtonsContainer>
				<Button active={activeTab === 'track'} onClick={() => setActiveTab('track')}>Создать трек</Button>
				<Button active={activeTab === 'album'} onClick={() => setActiveTab('album')}>Создать альбом</Button>
			</ButtonsContainer>

			<Title>
				{
					activeTab === 'track' ? 'Создать трек' : activeTab === 'album' ? 'Создать альбом' : null
				}
			</Title>

			{
				activeTab === 'track' &&
                <CreateTrackForm setFormType={setActiveTab}/>
			}

			{
				activeTab === 'album' && (
					<>
						<AlbumsContainer>
							{
								closableAlbums?.map(item => (<ClosableAlbumItem key={item._id} {...item}/>))
							}
						</AlbumsContainer>
						<Delimiter/>
						<CreateAlbumForm setFormType={setActiveTab}/>
					</>
				)
			}
		</Wrapper>
	);
};

export default Studio;

const Wrapper = styled.div`
  width: 90%;
  margin: 40px auto 0;
`;

const ButtonsContainer = styled.div`
  display: flex;
`;

interface IButtonProps {
	active: boolean;
}

const Button = styled.button`
  padding: 14px 36px;
  background-color: ${(props: IButtonProps) => (props.active ? 'transparent' : '#32be58')};
  color: ${(props: IButtonProps) => (props.active ? '#ffffff' : '#000000')};
  font-size: 14px;
  border-radius: 10px;
  font-weight: 700;
  margin-right: 20px;
  border: ${(props: IButtonProps) => (props.active ? '2px solid #25d253' : '2px solid transparent')};
  transition: all .15s linear;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    color: #ffffff;
    background-color: transparent;
    border: 2px solid #25d253;
  }
`;

const Title = styled.div`
  margin: 40px 0;
  font-size: 70px;
  color: #ffffff;
  font-weight: 700;
`;

const AlbumsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(1, 1fr);
  grid-column-gap: 10px;
`;

const Delimiter = styled.div`
  height: 1px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.11);
  margin: 50px 0;
`;