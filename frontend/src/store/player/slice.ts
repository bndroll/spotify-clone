import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPlayerSliceState } from './types';


const initialState: IPlayerSliceState = {
	currentTime: 0,
	duration: 0,
	volume: 50,
	pause: true
};

const playerSlice = createSlice({
	name: 'player',
	initialState,
	reducers: {
		setPause(state, action: PayloadAction<boolean>) {
			state.pause = action.payload;
		},

		setCurrentTime(state, action: PayloadAction<number>) {
			state.currentTime = action.payload;
		},

		setVolume(state, action: PayloadAction<number>) {
			state.volume = action.payload;
		},

		setDuration(state, action: PayloadAction<number>) {
			state.duration = action.payload;
		},

		resetPlayerState(state) {
			state.currentTime = 0;
			state.duration = 0;
			state.volume = 50;
			state.pause = true;
		}
	}
});

export const {setPause, setCurrentTime, setVolume, setDuration, resetPlayerState} = playerSlice.actions;
export default playerSlice.reducer;