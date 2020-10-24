export const saveRanking = async (dataRanking, props) => {

	const { dispatch } = props;

	dispatch({
		type: 'STORE_RANKING',
		dataRanking
	});

	return;
};