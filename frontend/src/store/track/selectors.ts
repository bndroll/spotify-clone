import { RootState } from '../store';


export const selectTracks = (state: RootState) => state.track.tracks;
export const selectFilteredTracks = (state: RootState) => state.track.filteredTracks;
export const selectFavoritesTracks = (state: RootState) => [...state.track.favoritesTracks].reverse();
export const selectFilteredFavoritesTracks = (state: RootState) => state.track.filteredFavoritesTracks;
export const selectCurrentTrack = (state: RootState) => state.track.currentTrack;
export const selectStatus = (state: RootState) => state.track.status;
export const selectErrorMessage = (state: RootState) => state.track.errorMessage;
export const selectIsTrackLiked = (id: string) => (state: RootState) => !!(state.track.favoritesTracks.find(item => item._id === id));
export const selectTrack = (id: string) => (state: RootState) => state.track.tracks.find(item => item._id === id);