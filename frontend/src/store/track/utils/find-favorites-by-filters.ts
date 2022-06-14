import { ISetFavoritesTracksByFilters, ITrack } from '../types';


export const findFavoritesByFilters = (items: ITrack[], filters: ISetFavoritesTracksByFilters): ITrack[] => {
	const findExpressions = new RegExp(`${filters.searchText}`, 'i');
	return items.filter(item => findExpressions.test(item.title))
}