import { createAsyncThunk } from '@reduxjs/toolkit';
import { ISearchResponse } from './types';
import { searchAPI } from '../../services/api/searchAPI';


export const search = createAsyncThunk<ISearchResponse, string>(
	'search/searchThunk',
	async (text: string): Promise<ISearchResponse> => {
		return await searchAPI.search(text);
	}
);