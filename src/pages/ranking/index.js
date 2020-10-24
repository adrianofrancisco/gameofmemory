import React, { Component } from 'react';
import { DivContainer, TextTitle } from '../../globais/styles';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

class Ranking extends Component {
	state = {
		ranking: []
	}

	async componentDidMount() {
		await this.loadRanking();
	}

	loadRanking = async () => {
		const { ranking } = this.props;
		var dataRanking = ranking;

		dataRanking = dataRanking.slice().sort((a, b) => (a.count > b.count) ? 1 : -1);
		await this.setState({ ranking: dataRanking });
	}

	render() {
		return (
			<DivContainer>
				<Link to="/" style={{ textDecoration: 'none' }}>
					<Button variant="primary">Ir para o jogo</Button>
				</Link>

				<br />

				<center>
					<TextTitle>Ranking</TextTitle>
				</center>

				<Table striped bordered hover width="100%">
					<thead>
						<tr>
							<th>Jogador</th>
							<th>Rodadas</th>
						</tr>
					</thead>

					<tbody>
						{this.state.ranking.map((data, key) => (
							<tr key={key}>
								<td>{data.name}</td>
								<td>{data.count}</td>
							</tr>
						))}
					</tbody>
				</Table>
			</DivContainer>
		);
	}
}

const mapStateToProps = state => ({
	ranking: state.ranking
});

export default connect(mapStateToProps)(Ranking);