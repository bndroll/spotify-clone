import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import user from './user/slice';
import track from './track/slice';
import player from './player/slice';
import album from './album/slice';
import author from './author/slice';
import search from './search/slice';


export const store = configureStore({
	reducer: {
		user,
		track,
		player,
		album,
		author,
		search
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
