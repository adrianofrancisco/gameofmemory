import React from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

const Cards = ({ ...props }) => {
	return (
		<Card
			border="info"
			bg={props.showCard ? 'light' : 'info'}
			style={{ width: '6rem', height: 100 }}
		>
			<Card.Header hidden={!props.showCard}>
				Carta
			</Card.Header>
			<Card.Body>
				<Card.Text hidden={!props.showCard}>
					{props.valueCard}
				</Card.Text>
			</Card.Body>
		</Card>
	);
}

export default Cards;