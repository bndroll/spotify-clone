import React from 'react';
import styled from 'styled-components';


const NotFound: React.FC = ({}) => {
	return (
		<Container>
			<Text>Page not found</Text>
			<Icon></Icon>
		</Container>
	);
};

export default NotFound;

const Container = styled.div`
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`

`;

const Icon = styled.div`

`;