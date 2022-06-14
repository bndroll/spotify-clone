import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteAlbumById, openAlbumById } from '../store/album/asyncActions';
import { useAppDispatch } from '../store/store';
import { useSelector } from 'react-redux';
import { selectUserData } from '../store/user/selectors';
import { selectClosableAlbum } from '../store/album/selectors';
import { selectAuthor } from '../store/author/selectors';
import { CreateAlbumTrackForm } from '../components/CreateAlbumTrackForm';
import { ClosableTrack } from '../components/ClosableTrack';


const UpdateAlbum: React.FC = () => {
	const {id} = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const currentUser = useSelector(selectUserData);
	const album = useSelector(selectClosableAlbum(id!));
	const albumAuthor = useSelector(selectAuthor(album?.authorId ? album?.authorId : ''));
	const [showForm, setShowForm] = useState<boolean>(false);

	const deleteAlbumHandler = () => {
		dispatch(deleteAlbumById(id!));
		navigate('/', {replace: true});
	};

	const openAlbumHandler = () => {
		dispatch(openAlbumById(id!));
		navigate(-1);
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
						{
							currentUser?._id === albumAuthor?._id &&
                            <UpdateButton onClick={openAlbumHandler}>
                                <svg width="25" height="25" viewBox="0 0 25 25" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M17.7084 8.33333V7.29167C17.7084 4.41979 15.3719 2.08333 12.5 2.08333C9.62815 2.08333 7.29169 4.41979 7.29169 7.29167V10.4167H6.25002C5.10106 10.4167 4.16669 11.351 4.16669 12.5V20.8333C4.16669 21.9823 5.10106 22.9167 6.25002 22.9167H18.75C19.899 22.9167 20.8334 21.9823 20.8334 20.8333V12.5C20.8334 11.351 19.899 10.4167 18.75 10.4167H9.37502V7.29167C9.37502 5.56875 10.7771 4.16667 12.5 4.16667C14.2229 4.16667 15.625 5.56875 15.625 7.29167V8.33333H17.7084Z"
                                        fill="white"/>
                                </svg>
                            </UpdateButton>
						}
						{
							currentUser?._id === albumAuthor?._id &&
                            <UpdateButton onClick={() => setShowForm(!showForm)}>
                                <svg width="25" height="25" viewBox="0 0 25 25" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12.5 23.4375C18.5406 23.4375 23.4375 18.5406 23.4375 12.5C23.4375 6.45938 18.5406 1.5625 12.5 1.5625C6.45938 1.5625 1.5625 6.45938 1.5625 12.5C1.5625 18.5406 6.45938 23.4375 12.5 23.4375ZM11.7188 8.59375C11.7188 8.38655 11.8011 8.18784 11.9476 8.04132C12.0941 7.89481 12.2928 7.8125 12.5 7.8125C12.7072 7.8125 12.9059 7.89481 13.0524 8.04132C13.1989 8.18784 13.2812 8.38655 13.2812 8.59375V11.7188H16.4062C16.6135 11.7188 16.8122 11.8011 16.9587 11.9476C17.1052 12.0941 17.1875 12.2928 17.1875 12.5C17.1875 12.7072 17.1052 12.9059 16.9587 13.0524C16.8122 13.1989 16.6135 13.2812 16.4062 13.2812H13.2812V16.4062C13.2812 16.6135 13.1989 16.8122 13.0524 16.9587C12.9059 17.1052 12.7072 17.1875 12.5 17.1875C12.2928 17.1875 12.0941 17.1052 11.9476 16.9587C11.8011 16.8122 11.7188 16.6135 11.7188 16.4062V13.2812H8.59375C8.38655 13.2812 8.18784 13.1989 8.04132 13.0524C7.89481 12.9059 7.8125 12.7072 7.8125 12.5C7.8125 12.2928 7.89481 12.0941 8.04132 11.9476C8.18784 11.8011 8.38655 11.7188 8.59375 11.7188H11.7188V8.59375Z"
                                        fill="white"/>
                                </svg>
                            </UpdateButton>
						}
					</div>
				</Info>
			</About>

			<Delimiter/>

			{
				album?.songs.map((item, i) => (<ClosableTrack key={item!._id} {...item!} orderNumber={i}/>))
			}

			{
				showForm &&
                <CreateAlbumTrackForm setShowForm={setShowForm} id={id!}/>
			}
		</Wrapper>
	);
};

export default UpdateAlbum;

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
  margin-right: 20px;

  &:hover {
    transform: scale(1.2);
  }
`;

const UpdateButton = styled(DeleteButton)`
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

const Delimiter = styled.div`
  height: 1px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 40px 0;
`;