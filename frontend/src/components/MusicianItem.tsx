import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


export interface IMusicianItemProps {
	_id: string;
	email: string;
	name: string;
	role: string;
	photo: string;
	about: string;
}

export const MusicianItem: React.FC<IMusicianItemProps> = ({_id, name, photo}) => {
	return (
		<Wrapper to={`/musician/${_id}`}>
			<Image photoUrl={photo}/>

			<Info>
				<Title>{name}</Title>
				<Author>Исполнитель</Author>
			</Info>
		</Wrapper>
	);
};

const Wrapper = styled(Link)`
  width: 200px;
  height: 250px;
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
  height: 160px;
  border-radius: 10px;
  margin-bottom: 5px;

  ${(props: IImageProps) => (props.photoUrl ?
          `background: url('${props.photoUrl}') center / cover no-repeat;` :
          `background-color: transparent;`)}
`;

const Info = styled.div`
  padding: 10px;
`;

const Title = styled.div`
  color: #ffffff;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 10px;
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