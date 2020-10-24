import produce from 'immer';

export default function ranking(state = [], action) {
    switch (action.type) {
        case 'STORE_RANKING':
            return produce(state, draft => {
                draft.push(action.dataRanking);
            });

        default:
            return state;
    }
};