import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Layout } from './layouts/Layout';
import { withSuspense } from './hocs/withSuspense';
import Auth from './pages/Auth';
import { useAppDispatch } from './store/store';
import { useSelector } from 'react-redux';
import { selectIsAuth, selectUserStatus } from './store/user/selectors';
import { Status } from './store/types';
import { findUserData } from './store/user/asyncActions';


const NotFound = React.lazy(() => import('./pages/NotFound'));
const Search = React.lazy(() => import('./pages/Search'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Studio = React.lazy(() => import('./pages/Studio'));
const MediaLibrary = React.lazy(() => import('./pages/MediaLibrary'));
const Musician = React.lazy(() => import('./pages/Musician'));
const Album = React.lazy(() => import('./pages/Album'));
const UpdateAlbum = React.lazy(() => import('./pages/UpdateAlbum'));

const SuspendedNotFound = withSuspense(NotFound);
const SuspendedSearch = withSuspense(Search);
const SuspendedProfile = withSuspense(Profile);
const SuspendedStudio = withSuspense(Studio);
const SuspendedMediaLibrary = withSuspense(MediaLibrary);
const SuspendedAlbum = withSuspense(Album);
const SuspendedUpdateAlbum = withSuspense(UpdateAlbum);
const SuspendedMusician = withSuspense(Musician);

const App = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useAppDispatch();
	const isAuth = useSelector(selectIsAuth);
	const userStatus = useSelector(selectUserStatus);
	const isReady = userStatus !== Status.LOADING && userStatus !== Status.NEVER;

	useEffect(() => {
		dispatch(findUserData());
	}, [userStatus]);

	useEffect(() => {
		if (!isAuth && !isReady) {
			navigate('/auth', {replace: true});
		} else if (location.pathname === '/') {
			navigate('/', {replace: true});
		}
	}, [isAuth, isReady]);

	return (
		<Routes>
			<Route path={'/auth'} element={<Auth/>}/>

			<Route path={'/'} element={<Layout/>}>
				<Route path={''} element={<Home/>}/>
				<Route path={'search'} element={<SuspendedSearch/>}/>
				<Route path={'profile'} element={<SuspendedProfile/>}/>
				<Route path={'media'} element={<SuspendedMediaLibrary/>}/>
				<Route path={'studio'} element={<SuspendedStudio/>}/>
				<Route path={'album/:id'} element={<SuspendedAlbum/>}/>
				<Route path={'update-album/:id'} element={<SuspendedUpdateAlbum/>}/>
				<Route path={'musician/:id'} element={<SuspendedMusician/>}/>
				<Route path={'*'} element={<SuspendedNotFound/>}/>
			</Route>
		</Routes>
	);
};

export default App;
