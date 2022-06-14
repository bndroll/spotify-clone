import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectAlbum } from '../store/album/selectors';
import { Track } from '../components/Track';
import { selectAuthor } from '../store/author/selectors';
import { selectUserData } from '../store/user/selectors';
import { useAppDispatch } from '../store/store';
import { deleteAlbumById } from '../store/album/asyncActions';


const Album: React.FC = ({}) => {
	const {id} = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const currentUser = useSelector(selectUserData);
	const album = useSelector(selectAlbum(id!));
	const albumAuthor = useSelector(selectAuthor(album?.authorId ? album?.authorId : ''));

	const deleteAlbumHandler = () => {
		dispatch(deleteAlbumById(id!));
		navigate('/', {replace: true});
	};

	return (
		<Wrapper>
			<About>
				<Image photoUrl={album?.picture}/>
				<Info>
					<span>Альбом</span>
					<Title>{album?.title}</Title>
					<div>
						<Author to={`/musician/${albumAuthor?._id}`}>{albumAuthor?.name}</Author>
						<Listens>{album?.listens} прослушиваний</Listens>
						{
							currentUser?._id === albumAuthor?._id &&
                            <DeleteButton onClick={deleteAlbumHandler}>
                                <svg width="25" height="25" viewBox="0 0 25 25" fill="#ffffff"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M21.0938 6.25H17.9688V4.29688C17.9688 3.43506 17.2681 2.73438 16.4062 2.73438H8.59375C7.73193 2.73438 7.03125 3.43506 7.03125 4.29688V6.25H3.90625C3.47412 6.25 3.125 6.59912 3.125 7.03125V7.8125C3.125 7.91992 3.21289 8.00781 3.32031 8.00781H4.79492L5.39795 20.7764C5.43701 21.6089 6.12549 22.2656 6.95801 22.2656H18.042C18.877 22.2656 19.563 21.6113 19.6021 20.7764L20.2051 8.00781H21.6797C21.7871 8.00781 21.875 7.91992 21.875 7.8125V7.03125C21.875 6.59912 21.5259 6.25 21.0938 6.25ZM16.2109 6.25H8.78906V4.49219H16.2109V6.25Z"/>
                                </svg>
                            </DeleteButton>
						}
					</div>
				</Info>
			</About>

			{
				<>
					<ColumnsInfo>
						<div>#</div>
						<div>Название</div>
						<div>Альбом</div>
						<div>Дата добавления</div>
						<div></div>
						<div>
							<svg width="25" height="25" viewBox="0 0 25 25" fill="#ffffff"
								 xmlns="http://www.w3.org/2000/svg">
								<path
									d="M12.5 2.08334C6.75623 2.08334 2.08331 6.75625 2.08331 12.5C2.08331 18.2438 6.75623 22.9167 12.5 22.9167C18.2437 22.9167 22.9166 18.2438 22.9166 12.5C22.9166 6.75625 18.2437 2.08334 12.5 2.08334ZM12.5 20.8333C7.90519 20.8333 4.16665 17.0948 4.16665 12.5C4.16665 7.90521 7.90519 4.16667 12.5 4.16667C17.0948 4.16667 20.8333 7.90521 20.8333 12.5C20.8333 17.0948 17.0948 20.8333 12.5 20.8333Z"/>
								<path
									d="M13.5416 7.29166H11.4583V12.9312L14.8885 16.3615L16.3614 14.8885L13.5416 12.0687V7.29166Z"/>
							</svg>
						</div>
					</ColumnsInfo>
					{
						album?.songs.map((item, i) => (<Track key={item!._id} {...item!} orderNumber={i}/>))
					}
				</>
			}
		</Wrapper>
	);
};

export default Album;

const Wrapper = styled.div`
  width: 90%;
  margin: 40px auto 50px;
`;

const About = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 50px;
`;

const Info = styled.div`
  margin-bottom: 5px;

  span {
    font-size: 20px;
  }

  div {
    display: flex;
    align-items: center;
  }
`;

interface IImageProps {
	photoUrl: string | undefined;
}

const Image = styled.div`
  width: 400px;
  height: 400px;
  margin-right: 50px;

  ${(props: IImageProps) => (props.photoUrl ?
          `background: url('${props.photoUrl}') center / cover no-repeat;` :
          `background-color: transparent;`)}
`;

const Title = styled.div`
  margin: 10px 0 40px 0;
  font-size: 70px;
  color: #ffffff;
  font-weight: 700;
`;

const Author = styled(Link)`
  color: #bdbdbd;
  margin-right: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

const Listens = styled.div`
  margin: 0 20px;
`;

const DeleteButton = styled.div`
  cursor: pointer;
  transition: all .1s linear;

  &:hover {
    transform: scale(1.2);
  }
`;

const ColumnsInfo = styled.div`
  padding: 0 20px;
  display: grid;
  grid-template: 50px / 50px 1fr 1fr 1fr 50px 100px;
  margin-bottom: 5px;
  justify-items: center;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #333333;
  font-size: 16px;
`;