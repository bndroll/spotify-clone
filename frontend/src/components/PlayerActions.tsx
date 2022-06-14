import React from 'react';
import styled from 'styled-components';
import { convertTrackTime } from '../utils/convertTrackTime';
import { useAppDispatch } from '../store/store';
import { setNextCurrentTrack, setPrevCurrentTrack } from '../store/track/slice';


interface IPlayerActionsProps {
	currentTime: number;
	maxTime: number;
	pause: boolean;
	changeCurrentTimeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
	changePauseHandler: (param: boolean) => void;
}

export const PlayerActions: React.FC<IPlayerActionsProps> = ({
																 currentTime,
																 maxTime,
																 pause,
																 changePauseHandler,
																 changeCurrentTimeHandler
															 }) => {
	const dispatch = useAppDispatch();

	const setNextTrack = () => {
		dispatch(setNextCurrentTrack());
	};

	const setPrevTrack = () => {
		dispatch(setPrevCurrentTrack());
	};

	return (
		<Wrapper>
			<ButtonsContainer>
				<PrevButton onClick={setPrevTrack}>
					<svg width="30" height="30" viewBox="0 0 25 25" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M7.29167 6.25C7.86458 6.25 8.33333 6.71875 8.33333 7.29167V17.7083C8.33333 18.2812 7.86458 18.75 7.29167 18.75C6.71875 18.75 6.25 18.2812 6.25 17.7083V7.29167C6.25 6.71875 6.71875 6.25 7.29167 6.25ZM11.1042 13.3542L17.1146 17.5937C17.8021 18.0833 18.7604 17.5833 18.7604 16.7396V8.26042C18.7604 7.41667 17.8125 6.92708 17.1146 7.40625L11.1042 11.6458C10.9666 11.7418 10.8543 11.8696 10.7768 12.0183C10.6992 12.167 10.6587 12.3323 10.6587 12.5C10.6587 12.6677 10.6992 12.833 10.7768 12.9817C10.8543 13.1304 10.9666 13.2582 11.1042 13.3542Z"/>
					</svg>
				</PrevButton>
				<PauseButton onClick={() => changePauseHandler(!pause)}>
					{
						pause ?
							<svg width="30" height="30" viewBox="0 0 25 25" fill="#000000"
								 xmlns="http://www.w3.org/2000/svg">
								<path
									d="M18.1187 13.5891L8.17656 19.3578C7.33281 19.8469 6.25 19.2547 6.25 18.2688V6.73125C6.25 5.74688 7.33125 5.15313 8.17656 5.64375L18.1187 11.4125C18.3107 11.5221 18.4702 11.6804 18.5812 11.8716C18.6922 12.0627 18.7506 12.2798 18.7506 12.5008C18.7506 12.7218 18.6922 12.9389 18.5812 13.13C18.4702 13.3211 18.3107 13.4795 18.1187 13.5891V13.5891Z"/>
							</svg>
							:
							<svg width="30" height="30" viewBox="0 0 25 25" fill="#000000"
								 xmlns="http://www.w3.org/2000/svg">
								<path
									d="M9.375 4.6875H7.8125C7.3981 4.6875 7.00067 4.85212 6.70765 5.14515C6.41462 5.43817 6.25 5.8356 6.25 6.25V18.75C6.25 19.1644 6.41462 19.5618 6.70765 19.8549C7.00067 20.1479 7.3981 20.3125 7.8125 20.3125H9.375C9.7894 20.3125 10.1868 20.1479 10.4799 19.8549C10.7729 19.5618 10.9375 19.1644 10.9375 18.75V6.25C10.9375 5.8356 10.7729 5.43817 10.4799 5.14515C10.1868 4.85212 9.7894 4.6875 9.375 4.6875V4.6875ZM17.1875 4.6875H15.625C15.2106 4.6875 14.8132 4.85212 14.5201 5.14515C14.2271 5.43817 14.0625 5.8356 14.0625 6.25V18.75C14.0625 19.1644 14.2271 19.5618 14.5201 19.8549C14.8132 20.1479 15.2106 20.3125 15.625 20.3125H17.1875C17.6019 20.3125 17.9993 20.1479 18.2924 19.8549C18.5854 19.5618 18.75 19.1644 18.75 18.75V6.25C18.75 5.8356 18.5854 5.43817 18.2924 5.14515C17.9993 4.85212 17.6019 4.6875 17.1875 4.6875V4.6875Z"/>
							</svg>
					}
				</PauseButton>
				<NextButton onClick={setNextTrack}>
					<svg width="30" height="30" viewBox="0 0 25 25" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M17.7083 18.75C17.1354 18.75 16.6667 18.2813 16.6667 17.7084V7.2917C16.6667 6.71878 17.1354 6.25003 17.7083 6.25003C18.2813 6.25003 18.75 6.71878 18.75 7.2917V17.7084C18.75 18.2813 18.2813 18.75 17.7083 18.75ZM13.8958 11.6459L7.88542 7.40628C7.19792 6.9167 6.23958 7.4167 6.23958 8.26045V16.7396C6.23958 17.5834 7.1875 18.0729 7.88542 17.5938L13.8958 13.3542C14.0334 13.2582 14.1457 13.1304 14.2232 12.9817C14.3008 12.833 14.3413 12.6678 14.3413 12.5C14.3413 12.3323 14.3008 12.1671 14.2232 12.0184C14.1457 11.8696 14.0334 11.7419 13.8958 11.6459Z"/>
					</svg>
				</NextButton>
			</ButtonsContainer>

			<RangeContainer>
				<div>{convertTrackTime(currentTime)}</div>
				<Range type={'range'}
					   min={0}
					   value={currentTime}
					   max={maxTime}
					   onChange={(e) => changeCurrentTimeHandler(e)}/>
				<div>{convertTrackTime(maxTime)}</div>
			</RangeContainer>
		</Wrapper>
	);
};

const Wrapper = styled.div`
  width: 33%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`;

const PauseButton = styled.button`
  background-color: #ffffff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  margin: 0 15px;
`;

const PrevNextButton = styled.button`
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

const PrevButton = styled(PrevNextButton)`
`;

const NextButton = styled(PrevNextButton)`
`;

const RangeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    margin: 0 15px;
  }
`;

const Range = styled.input`
  overflow: hidden;
  width: 400px;
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
    width: 2px;
    -webkit-appearance: none;
    height: 7px;
    cursor: pointer;
    background: #ffffff;
    box-shadow: -200px 0 0 200px #32be58;
  }
`;