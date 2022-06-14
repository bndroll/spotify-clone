import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectTracks } from '../store/track/selectors';
import { findAllTracks, findFavoritesTracks } from '../store/track/asyncActions';
import { Track } from '../components/Track';
import { useAppDispatch } from '../store/store';
import { findAllAlbums } from '../store/album/asyncActions';
import { selectAlbums } from '../store/album/selectors';
import { AlbumItem } from '../components/AlbumItem';
import { findMusicians } from '../store/author/asyncActions';


export const Home: React.FC = () => {
	const dispatch = useAppDispatch();
	const tracks = useSelector(selectTracks);
	const albums = useSelector(selectAlbums);
	const [activeTab, setActiveTab] = useState<'tracks' | 'albums'>('tracks');

	useEffect(() => {
		dispatch(findAllTracks());
		dispatch(findFavoritesTracks());
		dispatch(findAllAlbums());
		dispatch(findMusicians());
	}, []);

	return (
		<Wrapper>
			<ButtonsContainer>
				<Button active={activeTab === 'tracks'} onClick={() => setActiveTab('tracks')}>Треки</Button>
				<Button active={activeTab === 'albums'} onClick={() => setActiveTab('albums')}>Альбомы</Button>
			</ButtonsContainer>

			<Title>
				{
					activeTab === 'tracks' ? 'Треки' : 'Альбомы'
				}
			</Title>

			{
				activeTab === 'tracks' && (
					<>
						<ColumnsInfo>
							<div>#</div>
							<div>Название</div>
							<div>Альбом</div>
							<div>Дата добавления</div>
							<div></div>
							<div>
								<svg width="25" height="25" viewBox="0 0 25 25" fill="#ffffff"
									 xmlns="http://www.w3.org/2000/svg">
									<path
										d="M12.5 2.08334C6.75623 2.08334 2.08331 6.75625 2.08331 12.5C2.08331 18.2438 6.75623 22.9167 12.5 22.9167C18.2437 22.9167 22.9166 18.2438 22.9166 12.5C22.9166 6.75625 18.2437 2.08334 12.5 2.08334ZM12.5 20.8333C7.90519 20.8333 4.16665 17.0948 4.16665 12.5C4.16665 7.90521 7.90519 4.16667 12.5 4.16667C17.0948 4.16667 20.8333 7.90521 20.8333 12.5C20.8333 17.0948 17.0948 20.8333 12.5 20.8333Z"/>
									<path
										d="M13.5416 7.29166H11.4583V12.9312L14.8885 16.3615L16.3614 14.8885L13.5416 12.0687V7.29166Z"/>
								</svg>
							</div>
						</ColumnsInfo>
						{
							tracks.map((item, i) => (<Track key={item._id} {...item} orderNumber={i}/>))
						}
					</>
				)
			}

			{
				activeTab === 'albums' && (
					<AlbumsContainer>
						{
							albums.map(item => (<AlbumItem key={item._id} {...item}/>))
						}
					</AlbumsContainer>
				)
			}
		</Wrapper>
	);
};

const Wrapper = styled.div`
  width: 90%;
  margin: 40px auto 0;
`;

const ColumnsInfo = styled.div`
  padding: 0 20px;
  display: grid;
  grid-template: 50px / 50px 1fr 1fr 1fr 50px 100px;
  margin-bottom: 5px;
  justify-items: center;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #333333;
  font-size: 16px;
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