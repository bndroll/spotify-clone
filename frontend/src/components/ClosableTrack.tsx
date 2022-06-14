import React, { MouseEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../store/store';
import { useSelector } from 'react-redux';
import { selectCurrentTrack } from '../store/track/selectors';
import { deleteClosableTrackById, listenTrack } from '../store/track/asyncActions';
import { setCurrentTrack } from '../store/track/slice';
import { convertTrackTime } from '../utils/convertTrackTime';
import { selectClosableAlbum } from '../store/album/selectors';
import { useNavigate } from 'react-router-dom';
import { selectAuthor } from '../store/author/selectors';
import { selectUserData } from '../store/user/selectors';


const month = ['янв.', 'фев.', 'мар.', 'апр.', 'май', 'июнь', 'июль', 'авг.', 'сен.', 'окт.', 'ноя.', 'дек.'];

interface IClosableTrackProps {
	_id: string;
	title: string;
	date: Date;
	listens: number;
	picture: string;
	audio: string;
	albumId: string | null;
	authorId: string | null;
	orderNumber: number;
	type?: string;
	deletable?: boolean;
}

export const ClosableTrack: React.FC<IClosableTrackProps> = ({
																 _id,
																 title,
																 date,
																 listens,
																 picture,
																 audio,
																 albumId,
																 authorId,
																 orderNumber,
																 type,
																 deletable
															 }) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const currentTrack = useSelector(selectCurrentTrack);
	const trackDate = new Date(date);
	let trackAudio: HTMLAudioElement | null = null;
	const currentUser = useSelector(selectUserData);
	const [trackDuration, setTrackDuration] = useState<number>(0);
	const trackAlbum = useSelector(selectClosableAlbum(albumId ? albumId : ''));
	const trackAuthor = useSelector(selectAuthor(authorId ? authorId : ''));

	useEffect(() => {
		if (!trackAudio) {
			trackAudio = new Audio();
		} else {
			setupAudio();
		}
	}, []);

	const setupAudio = () => {
		if (trackAudio) {
			trackAudio.src = audio;
			trackAudio.onloadedmetadata = () => {
				setTrackDuration(Math.floor(trackAudio!.duration));
			};
		}
	};

	const setCurrentTrackHandler = () => {
		dispatch(listenTrack(_id));
		dispatch(setCurrentTrack(_id));
	};

	const goToAuthorHandler = (e: MouseEvent<HTMLDivElement>) => {
		if (trackAuthor) {
			e.stopPropagation();
			navigate(`/musician/${trackAuthor._id}`, {replace: false});
		}
	};

	const deleteClosableTrackHandler = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		dispatch(deleteClosableTrackById({
			trackId: _id,
			albumId: albumId || ''
		}));
	};

	return (
		<Wrapper onClick={setCurrentTrackHandler}
				 active={currentTrack?._id === _id}
				 deletable={currentUser?._id === authorId && deletable}>
			<Order>{orderNumber + 1}</Order>
			<MainInfoContainer>
				<Image src={picture} alt={`track ${title}`}/>
				<TitleAuthorContainer>
					<Title>{title}</Title>
					<Author
						onClick={(e) => goToAuthorHandler(e)}>{trackAuthor ? trackAuthor?.name : ''}</Author>
				</TitleAuthorContainer>
			</MainInfoContainer>
			<AlbumInfo>{trackAlbum ? trackAlbum?.title : ''}</AlbumInfo>

			<DeleteButton onClick={(e) => deleteClosableTrackHandler(e)}>
				<svg width="25" height="25" viewBox="0 0 25 25" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M21.0938 6.25H17.9688V4.29688C17.9688 3.43506 17.2681 2.73438 16.4062 2.73438H8.59375C7.73193 2.73438 7.03125 3.43506 7.03125 4.29688V6.25H3.90625C3.47412 6.25 3.125 6.59912 3.125 7.03125V7.8125C3.125 7.91992 3.21289 8.00781 3.32031 8.00781H4.79492L5.39795 20.7764C5.43701 21.6089 6.12549 22.2656 6.95801 22.2656H18.042C18.877 22.2656 19.563 21.6113 19.6021 20.7764L20.2051 8.00781H21.6797C21.7871 8.00781 21.875 7.91992 21.875 7.8125V7.03125C21.875 6.59912 21.5259 6.25 21.0938 6.25ZM16.2109 6.25H8.78906V4.49219H16.2109V6.25Z"/>
				</svg>
			</DeleteButton>
			<div>{convertTrackTime(trackDuration)}</div>
		</Wrapper>
	);
};

interface IWrapperProps {
	active: boolean;
	deletable?: boolean;
}

const Wrapper = styled.div`
  padding: 0 20px;
  display: grid;
  grid-template: 80px / 50px 1fr 1fr 1fr ${(props: IWrapperProps) => (props.deletable ? '80px' : '')} 100px;
  margin-bottom: 5px;
  justify-items: center;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  transition: all .1s linear;
  font-size: 14px;
  cursor: pointer;
  background-color: ${(props: IWrapperProps) => (props.active ? 'rgba(255, 255, 255, 0.1)' : 'transparent')};

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Order = styled.div`
`;

const Like = styled.div`
  cursor: pointer;
  z-index: 2;
`;

const MainInfoContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-left: 60px;
`;

const TitleAuthorContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 15px;
`;

const Title = styled.div`
  font-weight: 700;
  margin-bottom: 10px;
  font-size: 16px;
`;

const Author = styled.div`
  color: #b9b9b9;

  &:hover {
    text-decoration: underline;
  }
`;

const AlbumInfo = styled.div`
  &:hover {
    text-decoration: underline;
  }
`;

const DeleteButton = styled.div`
  cursor: pointer;
  transition: all .1s linear;

  &:hover {
    transform: scale(1.2);
  }
`;