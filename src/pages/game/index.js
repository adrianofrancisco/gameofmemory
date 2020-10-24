import React, { Component } from 'react';
import Cards from '../../components/card';
import Button from 'react-bootstrap/Button';
import { DivContainer, TextTitle } from '../../globais/styles'
import { Input, Text } from './styles';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import { saveRanking } from '../../store/modules/ranking/ranking-store';
import { Link } from 'react-router-dom';

let firstCardChoose = 0;
const totalPossiblePlays = 10;
const pairsCards = 10;

class Game extends Component {
	state = {
		cards: [],
		move: 1,
		reload: false,
		countPlays: 0,
		numberPlaysOk: 0
	}

	startGame = async () => {
		var namePlayer = document.getElementById("name").value;

		if (namePlayer === "" || namePlayer === null || typeof namePlayer === 'undefined') {
			Swal.fire({
				icon: 'warning',
				text: 'Favor preencher o campo nome.',
				timer: 5000
			})
		} else {

			await this.restartGame();

			var dataCard = [];

			var cards = [];
			for (var row = 0; row < pairsCards; row++) {
				var numberCard = Math.floor(Math.random() * 99);

				if (!cards.includes(numberCard)) {
					dataCard = {
						numberCard,
						showCard: false,
						find: false
					}
					cards.push(dataCard);

					dataCard = {
						numberCard,
						showCard: false,
						selected: false,
						find: false
					}
					cards.push(dataCard);
				}
			}

			this.shuffleCards(cards);

			await this.setState({ cards });
		}
	}

	shuffleCards = (listCards) => {

		for (var indice = listCards.length; indice; indice--) {
			const indiceAleatorio = Math.floor(Math.random() * indice);

			const elemento = listCards[indice - 1];

			listCards[indice - 1] = listCards[indiceAleatorio];
			listCards[indiceAleatorio] = elemento;
		}
	}

	handleOnClickChooseCard = async (data) => {
		var countPlays = 0;
		var countCardsSelected = 0;
		var dataCard = [];
		var limitCardsSelected = false;
		var numberPlaysOk = parseInt(this.state.numberPlaysOk);

		dataCard = this.state.cards;
		for (var row = 0; row < dataCard.length; row++) {
			if (dataCard[row].selected && !dataCard[row].find) {
				countCardsSelected = parseInt(countCardsSelected) + 1;
			}
		}

		if (countCardsSelected > 1) {
			limitCardsSelected = true;
		}

		if (!data.selected && !limitCardsSelected) {
			data.showCard = !data.showCard;
			data.selected = !data.selected;

			await this.setState({ reload: true });

			//-- verifica se foi a primeira ou segunda escolha de carta
			switch (this.state.move) {
				case 1:
					firstCardChoose = data.numberCard;
					await this.setState({ move: 2 });
					break;

				default:
					if (data.numberCard === firstCardChoose) {
						this.markCardFind(data.numberCard);

						numberPlaysOk = parseInt(this.state.numberPlaysOk) + 1;
					} else {
						await new Promise(r => setTimeout(r, 350));
						this.reverseCards();
					}

					countPlays = parseInt(this.state.countPlays) + 1;

					await this.setState({
						move: 1,
						countPlays,
						numberPlaysOk
					});
			}

			if (totalPossiblePlays === numberPlaysOk) {
				Swal.fire({
					icon: 'success',
					text: 'Parabéns! Você concluiu o jogo em ' + this.state.countPlays + ' rodadas.',
					confirmButtonText: 'Reiniciar o jogo'
				}).then((result) => {
					this.saveDataRanking();
					this.restartGame();
					this.startGame();
				});
			}
		}
	}

	saveDataRanking = async () => {
		var namePlayer = document.getElementById("name").value;
		var dataRanking = {
			name: namePlayer,
			count: this.state.countPlays
		}

		await saveRanking(dataRanking, this.props);
	}

	restartGame = async () => {
		firstCardChoose = 0;

		await this.setState({
			cards: [],
			move: 1,
			reload: false,
			countPlays: 0,
			numberPlaysOk: 0
		})
	}

	markCardFind = (numberCard) => {
		var dataCard = [];

		dataCard = this.state.cards;
		for (var row = 0; row < dataCard.length; row++) {
			if (dataCard[row].numberCard === numberCard) {
				dataCard[row].find = true;
			}
		}
	}

	reverseCards = () => {
		var dataCard = [];

		dataCard = this.state.cards;
		for (var row = 0; row < dataCard.length; row++) {
			if (!dataCard[row].find) {
				dataCard[row].showCard = false;
				dataCard[row].selected = false;
			}
		}
	}

	render() {
		return (
			<DivContainer>
				<Container>
					<Row>
						<Col align="center">
							<TextTitle>Jogo da memória - encontre os pares de cartas</TextTitle>
						</Col>
					</Row>

					<br />

					<Row>
						<Col>
							<Input id="name" name="name" placeholder="Nome" />
						</Col>
					</Row>

					<Row>
						<Col>
							<Button variant="primary" onClick={() => this.startGame()}>Iniciar o jogo</Button>
						</Col>

						<Col>
							<Link to="/ranking" style={{ textDecoration: 'none' }}>
								<Button variant="primary">Ranking do jogo</Button>
							</Link>
						</Col>
					</Row>

					{this.state.cards.length > 0 &&
						<Row>
							<Col>
								<Text>Número de jogadas: {this.state.countPlays}</Text>
							</Col>
						</Row>
					}

					<Row xs={3} md={3} lg={5}>
						{this.state.cards.map((data, key) => (
							<Col key={key} onClick={() => this.handleOnClickChooseCard(data)} style={{ padding: 5 }}>
								<Cards key={key} valueCard={data.numberCard} showCard={data.showCard} />
							</Col>
						))}
					</Row>
				</Container>
			</DivContainer>
		);
	}
}

export default connect()(Game);