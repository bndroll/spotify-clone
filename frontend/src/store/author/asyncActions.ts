import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAuthorResponse } from './types';
import { authorAPI } from '../../services/api/authorAPI';


export const findMusicians = createAsyncThunk<IAuthorResponse[]>(
	'author/findMusicians',
	async (): Promise<IAuthorResponse[]> => {
		return await authorAPI.findMusicians();
	}
);