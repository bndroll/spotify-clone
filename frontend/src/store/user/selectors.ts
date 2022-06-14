import { RootState } from '../store';


export const selectIsAuth = (state: RootState) => state.user.isAuthorized;
export const selectUserData = (state: RootState) => state.user.data;
export const selectUserStatus = (state: RootState) => state.user.status;
export const selectUserErrorMessage = (state: RootState) => state.user.errorMessage;