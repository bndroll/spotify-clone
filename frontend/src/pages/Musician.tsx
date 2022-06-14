import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthor, selectAuthorAlbums, selectAuthorTracks } from '../store/author/selectors';
import { Track } from '../components/Track';
import { AlbumItem } from '../components/AlbumItem';


const Musician: React.FC = () => {
	const {id} = useParams();
	const author = useSelector(selectAuthor(id!));
	const authorTracks = useSelector(selectAuthorTracks(id!));
	const authorAlbums = useSelector(selectAuthorAlbums(id!));

	return (
		<Wrapper>
			<ImageContainer>
				<Image src={author?.photo}/>
			</ImageContainer>

			<Info>
				<Title>{author?.name}</Title>
				<About><span>Обо мне:</span> {author?.about}</About>
				<About><span>Прослушиваний:</span> {authorTracks.reduce((res, item) => res + item.listens, 0)}</About>
			</Info>

			<Info>
				<SmallTitle>Популярные треки</SmallTitle>

				{
					[...authorTracks]
						.sort((a, b) => b.listens - a.listens)
						.slice(0, 5)
						.map((item, i) => (<Track key={item._id} {...item} orderNumber={i} type={'listens'}/>))
				}
			</Info>

			<Delimiter/>

			<Info>
				<SmallTitle>Альбомы</SmallTitle>

				{
					<AlbumsContainer>
						{
							authorAlbums.map((item, i) => (<AlbumItem key={item._id} {...item} />))
						}
					</AlbumsContainer>
				}
			</Info>

			<Delimiter/>

			<Info>
				<SmallTitle>Все треки</SmallTitle>

				{
					authorTracks.map((item, i) => (<Track key={item._id} {...item} orderNumber={i} type={'listens'} deletable/>))
				}
			</Info>
		</Wrapper>
	);
};

export default Musician;

const Wrapper = styled.div`
  width: 100%;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 50%;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.55);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 405px;
  object-fit: cover;
`;

const Info = styled.div`
  width: 90%;
  margin: 60px auto;
  position: relative;
  font-size: 20px;

  span {
    font-weight: 700;
    margin-right: 10px;
  }
`;

const Title = styled.div`
  position: absolute;
  font-size: 90px;
  font-weight: 700;
  top: -170px;
  left: -20px;
  padding: 10px 20px;
`;

const SmallTitle = styled.div`
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const Email = styled.div`
  margin-top: 10px;
`;

const Role = styled.div`
  margin-top: 10px;
`;

const About = styled.div`
  margin-top: 10px;
`;

const Delimiter = styled.div`
  width: 90%;
  margin: 20px auto;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.11);
`;

const AlbumsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(1, 1fr);
  grid-column-gap: 10px;
`;