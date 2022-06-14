import React, { MouseEvent, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectPlayerState } from '../store/player/selectors';
import { selectCurrentTrack, selectIsTrackLiked } from '../store/track/selectors';
import { resetPlayerState, setCurrentTime, setDuration, setPause, setVolume } from '../store/player/slice';
import { useAppDispatch } from '../store/store';
import { PlayerActions } from './PlayerActions';
import { likeTrack } from '../store/track/asyncActions';
import { resetCurrentTrack, setNextCurrentTrack } from '../store/track/slice';
import { selectAuthor } from '../store/author/selectors';
import { Link } from 'react-router-dom';


let audio: HTMLAudioElement | null = null;

export const Player: React.FC = () => {
	const dispatch = useAppDispatch();
	const {currentTime, duration, volume, pause} = useSelector(selectPlayerState);
	const currentTrack = useSelector(selectCurrentTrack);
	const isTrackLiked = useSelector(selectIsTrackLiked(currentTrack ? currentTrack._id : ''));
	const trackAuthor = useSelector(selectAuthor(currentTrack?.authorId ? currentTrack?.authorId : ''));

	useEffect(() => {
		return () => {
			dispatch(resetCurrentTrack());
			dispatch(resetPlayerState());
			audio?.pause();
			audio = null;
		};
	}, []);


	useEffect(() => {
		if (!audio) {
			audio = new Audio();
		} else if (audio && currentTrack) {
			setupAudio();
			dispatch(setPause(false));
			audio.play();
		}
	}, [currentTrack]);

	useEffect(() => {
		if (currentTrack && duration === currentTime && duration !== 0) {
			dispatch(setCurrentTime(0));
			dispatch(setDuration(0));
			dispatch(setNextCurrentTrack());
		}
	}, [currentTrack, currentTime, duration, audio]);


	const setupAudio = () => {
		if (currentTrack && audio) {
			audio.src = currentTrack.audio;
			audio.volume = volume / 100;
			audio.onloadedmetadata = () => {
				dispatch(setDuration(Math.ceil(audio!.duration)));
			};
			audio.ontimeupdate = () => {
				dispatch(setCurrentTime(Math.ceil(audio!.currentTime)));
			};
		}
	};

	const changeVolumeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (audio)
			audio.volume = Number(e.target.value) / 100;

		dispatch(setVolume(Number(e.target.value)));
	};

	const changeCurrentTimeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (audio)
			audio.currentTime = Number(e.target.value);

		dispatch(setCurrentTime(Number(e.target.value)));
	};

	const changePauseHandler = (value: boolean) => {
		if (value && audio) {
			audio.pause();
		} else if (!value && audio) {
			audio.play();
		}

		dispatch(setPause(value));
	};

	const likeTrackHandler = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		dispatch(likeTrack(currentTrack!._id));
	};

	return (
		<Wrapper>
			<TrackInfo>
				{
					currentTrack &&
                    <>
                        <Image src={currentTrack?.picture} alt={`track ${currentTrack?.title}`}/>
                        <InfoInnerContainer>
                            <Title>{currentTrack?.title}</Title>
                            <Author to={`/musician/${trackAuthor?._id}`}>{trackAuthor?.name}</Author>
                        </InfoInnerContainer>
                        <Like onClick={(e) => likeTrackHandler(e)}>{isTrackLiked ?
							<svg width="25" height="25" viewBox="0 0 25 25" fill="none"
								 xmlns="http://www.w3.org/2000/svg">
								<path
									d="M7.81248 4.16666C4.64835 4.16666 2.08331 6.73172 2.08331 9.89583C2.08331 15.625 8.85415 20.8333 12.5 22.0449C16.1458 20.8333 22.9166 15.625 22.9166 9.89583C22.9166 6.73172 20.3516 4.16666 17.1875 4.16666C15.2498 4.16666 13.5368 5.12859 12.5 6.60094C11.4632 5.12859 9.75014 4.16666 7.81248 4.16666Z"
									fill="#32be58" stroke="#32be58" strokeWidth="2.08333" strokeLinecap="round"
									strokeLinejoin="round"/>
							</svg>
							:
							<svg width="25" height="25" viewBox="0 0 25 25" fill="none"
								 xmlns="http://www.w3.org/2000/svg">
								<path
									d="M7.81248 4.16666C4.64835 4.16666 2.08331 6.73172 2.08331 9.89583C2.08331 15.625 8.85415 20.8333 12.5 22.0449C16.1458 20.8333 22.9166 15.625 22.9166 9.89583C22.9166 6.73172 20.3516 4.16666 17.1875 4.16666C15.2498 4.16666 13.5368 5.12859 12.5 6.60094C11.4632 5.12859 9.75014 4.16666 7.81248 4.16666Z"
									stroke="white" strokeWidth="2.08333" strokeLinecap="round" strokeLinejoin="round"/>
							</svg>
						}</Like>
                    </>
				}
			</TrackInfo>

			<PlayerActions changeCurrentTimeHandler={changeCurrentTimeHandler}
						   currentTime={currentTime}
						   maxTime={duration}
						   changePauseHandler={changePauseHandler}
						   pause={pause}/>

			<VolumeContainer>
				{
					volume <= 25 ?
						<svg width="25" height="25" viewBox="0 0 25 25" fill="#ffffff"
							 xmlns="http://www.w3.org/2000/svg">
							<path
								d="M16.7656 20.6432C16.5158 20.6431 16.2726 20.5628 16.0718 20.4142L16.0396 20.3893L11.5737 16.7272H8.17188C7.86107 16.7272 7.563 16.6038 7.34323 16.384C7.12346 16.1642 7 15.8662 7 15.5554V10.0871C7 9.77629 7.12346 9.47822 7.34323 9.25845C7.563 9.03868 7.86107 8.91522 8.17188 8.91522H11.5728L16.0386 5.25311L16.0708 5.22821C16.2454 5.09966 16.4522 5.02206 16.6683 5.00405C16.8843 4.98604 17.1012 5.02832 17.2946 5.12619C17.4881 5.22406 17.6506 5.37368 17.7641 5.55841C17.8776 5.74314 17.9376 5.95573 17.9375 6.17254V19.4704C17.9375 19.7812 17.814 20.0793 17.5943 20.299C17.3745 20.5188 17.0764 20.6432 16.7656 20.6432Z"/>
						</svg>
						:
						volume <= 75 ?
							<svg width="25" height="25" viewBox="0 0 25 25" fill="#ffffff"
								 xmlns="http://www.w3.org/2000/svg">
								<path
									d="M14.4531 20.3218C14.2033 20.3216 13.9601 20.2413 13.7593 20.0928L13.7271 20.0679L9.26123 16.4058H5.85938C5.54857 16.4058 5.2505 16.2823 5.03073 16.0625C4.81096 15.8428 4.6875 15.5447 4.6875 15.2339V9.76562C4.6875 9.45482 4.81096 9.15675 5.03073 8.93698C5.2505 8.71721 5.54857 8.59375 5.85938 8.59375H9.26025L13.7261 4.93164L13.7583 4.90673C13.9329 4.77819 14.1397 4.70059 14.3558 4.68258C14.5718 4.66457 14.7887 4.70685 14.9821 4.80472C15.1756 4.90259 15.3381 5.05221 15.4516 5.23694C15.5651 5.42167 15.6251 5.63426 15.625 5.85107V19.1489C15.625 19.4597 15.5015 19.7578 15.2818 19.9776C15.062 20.1973 14.7639 20.3208 14.4531 20.3208V20.3218ZM18.75 16.4062C18.6168 16.4062 18.4857 16.372 18.3694 16.307C18.2531 16.2421 18.1553 16.1484 18.0854 16.035C18.0155 15.9215 17.9757 15.7921 17.9699 15.659C17.9641 15.5259 17.9925 15.3935 18.0522 15.2744C18.5156 14.3516 18.7505 13.4189 18.7505 12.5C18.7505 11.5547 18.5229 10.6484 18.0547 9.72998C17.965 9.54594 17.9511 9.33404 18.016 9.13987C18.081 8.9457 18.2195 8.78478 18.4019 8.69173C18.5843 8.59869 18.7959 8.58095 18.9912 8.64235C19.1865 8.70374 19.3499 8.83936 19.4463 9.02002C20.0293 10.1641 20.3125 11.3022 20.3125 12.5C20.3125 13.6636 20.0195 14.833 19.4482 15.9756C19.3832 16.105 19.2835 16.2139 19.1602 16.2899C19.0369 16.366 18.8949 16.4063 18.75 16.4062Z"/>
							</svg>
							:
							<svg width="25" height="25" viewBox="0 0 25 25" fill="#ffffff"
								 xmlns="http://www.w3.org/2000/svg">
								<path
									d="M12.8906 20.3218C12.6408 20.3216 12.3976 20.2413 12.1968 20.0928L12.1646 20.0679L7.69873 16.4058H4.29688C3.98607 16.4058 3.688 16.2823 3.46823 16.0625C3.24846 15.8428 3.125 15.5447 3.125 15.2339V9.76562C3.125 9.45482 3.24846 9.15675 3.46823 8.93698C3.688 8.71721 3.98607 8.59375 4.29688 8.59375H7.69775L12.1636 4.93164L12.1958 4.90673C12.3704 4.77819 12.5772 4.70059 12.7933 4.68258C13.0093 4.66457 13.2262 4.70685 13.4196 4.80472C13.6131 4.90259 13.7756 5.05221 13.8891 5.23694C14.0026 5.42167 14.0626 5.63426 14.0625 5.85107V19.1489C14.0625 19.4597 13.939 19.7578 13.7193 19.9776C13.4995 20.1973 13.2014 20.3208 12.8906 20.3208V20.3218ZM17.1875 16.4062C17.0543 16.4062 16.9232 16.372 16.8069 16.307C16.6906 16.2421 16.5928 16.1484 16.5229 16.035C16.453 15.9215 16.4132 15.7921 16.4074 15.659C16.4016 15.5259 16.43 15.3935 16.4897 15.2744C16.9531 14.3516 17.188 13.4189 17.188 12.5C17.188 11.5547 16.9604 10.6484 16.4922 9.72998C16.4025 9.54594 16.3886 9.33404 16.4535 9.13987C16.5185 8.9457 16.657 8.78478 16.8394 8.69173C17.0218 8.59869 17.2334 8.58095 17.4287 8.64235C17.624 8.70374 17.7874 8.83936 17.8838 9.02002C18.4668 10.1641 18.75 11.3022 18.75 12.5C18.75 13.6636 18.457 14.833 17.8857 15.9756C17.8207 16.105 17.721 16.2139 17.5977 16.2899C17.4744 16.366 17.3324 16.4063 17.1875 16.4062Z"/>
								<path
									d="M19.5312 18.75C19.394 18.7501 19.2592 18.7141 19.1404 18.6456C19.0215 18.5771 18.9228 18.4784 18.8542 18.3597C18.7855 18.2409 18.7494 18.1061 18.7493 17.9689C18.7493 17.8317 18.7854 17.6969 18.854 17.5781C19.7754 15.9692 20.3125 14.6216 20.3125 12.5C20.3125 10.3457 19.7783 9.00781 18.856 7.42432C18.7608 7.24577 18.7385 7.03725 18.794 6.84266C18.8494 6.64806 18.9782 6.48257 19.1532 6.38102C19.3282 6.27947 19.5358 6.24978 19.7323 6.2982C19.9287 6.34662 20.0988 6.46938 20.2065 6.64063C21.2363 8.40625 21.875 10.0039 21.875 12.5C21.875 14.959 21.2373 16.5645 20.209 18.3594C20.1403 18.4783 20.0415 18.577 19.9225 18.6456C19.8035 18.7142 19.6686 18.7502 19.5312 18.75Z"/>
							</svg>

				}

				<Volume type={'range'} value={volume} onChange={(e) => changeVolumeHandler(e)}/>
			</VolumeContainer>
		</Wrapper>
	);
};

const Wrapper = styled.div`
  width: 95%;
  margin: 0 auto 0 15px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TrackInfo = styled.div`
  width: 33%;
  display: flex;
  align-items: center;
  font-size: 14px;
`;

const InfoInnerContainer = styled.div`
  margin: 0 20px;
`;

const Image = styled.img`
  grid-area: image;
  width: 70px;
  height: 70px;
`;

const Title = styled.div`
  font-weight: 700;
  grid-area: title;
  margin-bottom: 10px;
`;

const Author = styled(Link)`
  color: #c4c4c4;
  grid-area: author;

  &:hover {
    text-decoration: underline;
  }
`;

const Like = styled.div`
  grid-area: like;
  cursor: pointer;
  z-index: 2;
  margin-left: 20px;
`;

const VolumeContainer = styled.div`
  width: 33%;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  svg {
    margin-right: 10px;
  }
`;

const Volume = styled.input`
  overflow: hidden;
  width: 165px;
  -webkit-appearance: none;
  background-color: #8f8f8f;
  border-radius: 5px;

  &::-webkit-slider-runnable-track {
    height: 7px;
    -webkit-appearance: none;
    color: #ffffff;
    margin-top: -1px;
  }

  &::-webkit-slider-thumb {
    width: 1px;
    -webkit-appearance: none;
    height: 7px;
    cursor: pointer;
    background: #ffffff;
    box-shadow: -80px 0 0 80px #ffffff;
  }
`;