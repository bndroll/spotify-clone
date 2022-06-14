import { RootState } from '../store';


export const selectAuthors = (state: RootState) => state.author.authors;
export const selectAuthorStatus = (state: RootState) => state.author.status;
export const selectAuthorErrorMessage = (state: RootState) => state.author.errorMessage;
export const selectAuthor = (id: string) => (state: RootState) => state.author.authors.find(item => item._id === id) || null;
export const selectAuthorTracks = (id: string) => (state: RootState) => state.track.tracks.filter(item => item.authorId === id);
export const selectAuthorAlbums = (id: string) => (state: RootState) => state.album.albums.filter(item => item.authorId === id);