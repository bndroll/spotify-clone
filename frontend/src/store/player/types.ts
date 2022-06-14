import { ITrack } from '../track/types';


export interface IPlayerSliceState {
	currentTime: number;
	duration: number;
	volume: number;
	pause: boolean;
}