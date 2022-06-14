import React, { useCallback, useState } from 'react';
import { useAppDispatch } from '../store/store';
import debounce from 'lodash.debounce';
import { search } from '../store/search/asyncActions';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectSearchAlbums, selectSearchTracks, selectSearchUsers } from '../store/search/selectors';
import { Track } from '../components/Track';
import { AlbumItem } from '../components/AlbumItem';
import { MusicianItem } from '../components/MusicianItem';


const Search: React.FC = ({}) => {
	const dispatch = useAppDispatch();
	const tracks = useSelector(selectSearchTracks);
	const albums = useSelector(selectSearchAlbums);
	const users = useSelector(selectSearchUsers);
	const [value, setValue] = useState<string>('');

	const clearSearchHandler = () => {
		setValue('');
		updateSearchHandler('');
	};

	const updateSearchHandler = useCallback(
		debounce((searchString: string) => {
			dispatch(search(searchString));
		}, 500),
		[]
	);

	const changeValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		updateSearchHandler(e.target.value);
	};

	return (
		<Wrapper>
			<InputContainer>
				<LeftSvg enableBackground="new 0 0 32 32"
						 id="EditableLine"
						 version="1.1"
						 viewBox="0 0 32 32"
						 xmlns="http://www.w3.org/2000/svg">
					<circle cx="14"
							cy="14"
							fill="none"
							id="XMLID_42_"
							r="9"
							stroke="#000000"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeMiterlimit="10"
							strokeWidth="2"
					/>
					<line fill="none"
						  id="XMLID_44_"
						  stroke="#000000"
						  strokeLinecap="round"
						  strokeLinejoin="round"
						  strokeMiterlimit="10"
						  strokeWidth="2"
						  x1="27"
						  x2="20.366"
						  y1="27"
						  y2="20.366"
					/>
				</LeftSvg>
				<Input value={value}
					   onChange={changeValueHandler}
					   placeholder="Поиск"
				/>
				{
					value && (
						<ClearIcon onClick={clearSearchHandler}
								   view-box="0 0 20 20"
								   xmlns="http://www.w3.org/2000/svg">
							<path
								d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/>
						</ClearIcon>
					)
				}
			</InputContainer>

			<MainContainer>
				<Title>Треки</Title>
				{
					tracks && tracks?.length !== 0 ?
						tracks?.map((item, i) => <Track key={item._id} {...item} orderNumber={i}/>)
						:
						'Нет треков'
				}

				<Title>Альбомы</Title>
				{
					albums && albums?.length !== 0 ?
						<AlbumsContainer>
							{
								albums?.map(item => <AlbumItem key={item._id} {...item}/>)
							}
						</AlbumsContainer>
						:
						'Нет альбомов'
				}

				<Title>Музыканты</Title>
				{
					users && users?.length !== 0 ?
						<UsersContainer>
							{
								users?.map(item => <MusicianItem key={item._id} {...item}/>)
							}
						</UsersContainer>
						:
						'Нет музыкантов'
				}
			</MainContainer>
		</Wrapper>
	);
};

export default Search;

const Wrapper = styled.div`
  width: 90%;
  margin: 50px auto;
  position: relative;
`;

const InputContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: -80px;
  z-index: 1;
`;

const LeftSvg = styled.svg`
  width: 22px;
  height: 22px;
  opacity: 0.3;
  position: absolute;
  left: 14px;
  top: 13px;
`;

const ClearIcon = styled.svg`
  width: 18px;
  height: 18px;
  opacity: 0.3;
  position: absolute;
  left: 467px;
  top: 14px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const Input = styled.input`
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 12px 20px 12px 42px;
  width: 500px;
  border-radius: 10px;
  font-size: 16px;

  &:focus {
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
`;

const MainContainer = styled.div`
  margin: 100px 0;
`;

const Title = styled.div`
  margin: 40px 0;
  font-size: 70px;
  color: #ffffff;
  font-weight: 700;
`;

const AlbumsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(1, 1fr);
  grid-column-gap: 10px;
`;

const UsersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(1, 1fr);
  grid-column-gap: 10px;
`;