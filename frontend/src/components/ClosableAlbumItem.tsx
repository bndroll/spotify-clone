import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthor } from '../store/author/selectors';


const month = ['янв.', 'фев.', 'мар.', 'апр.', 'май', 'июнь', 'июль', 'авг.', 'сен.', 'окт.', 'ноя.', 'дек.'];

interface IClosableAlbumItemProps {
	_id: string;
	title: string;
	date: Date;
	picture: string;
	authorId: string;
}

export const ClosableAlbumItem: React.FC<IClosableAlbumItemProps> = ({_id, title, date, picture, authorId}) => {
	const albumDate = new Date(date);
	const albumAuthor = useSelector(selectAuthor(authorId));

	return (
		<Wrapper to={`/update-album/${_id}`}>
			<Image photoUrl={picture}/>

			<Info>
				<Title>{title}</Title>
				<DateContainer>{albumDate.getDate() + ' ' + month[albumDate.getMonth()] + ' ' + albumDate.getFullYear() + ' г.'}</DateContainer>
				<Author>{albumAuthor?.name}</Author>
			</Info>
		</Wrapper>
	);
};


const Wrapper = styled(Link)`
  width: 300px;
  height: 380px;
  transition: all .2s linear;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.03);
  padding: 10px;
  cursor: pointer;

  &:hover {
    transform: scale(1.03);
  }
`;

interface IImageProps {
	photoUrl: string;
}

const Image = styled.div`
  width: 100%;
  height: 250px;
  border-radius: 10px;
  margin-bottom: 10px;

  ${(props: IImageProps) => (props.photoUrl ?
          `background: url('${props.photoUrl}') center / cover no-repeat;` :
          `background-color: transparent;`)}
`;

const Info = styled.div`
  padding: 10px;
`;

const Title = styled.div`
  color: #ffffff;
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const DateContainer = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
  color: #b9b9b9;
`;

const Author = styled.div`
  font-size: 14px;
  color: #b9b9b9;
`;