import { RootState } from '../store';


export const selectSearchTracks = (state: RootState) => state.search.data?.tracks;
export const selectSearchAlbums = (state: RootState) => state.search.data?.albums;
export const selectSearchUsers = (state: RootState) => state.search.data?.users;
export const selectSearchStatus = (state: RootState) => state.search.status;
export const selectSearchErrorMessage = (state: RootState) => state.search.errorMessage;