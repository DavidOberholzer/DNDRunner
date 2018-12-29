import { combineReducers } from 'redux';

import createMulitReducer from './createMultiReducer';
import createSingleReducer from './createSingleReducer';

export const runnerApp = combineReducers({
    campaigns: createMulitReducer('campaign'),
    campaign: createSingleReducer('campaign'),
	players: createMulitReducer('player'),
    battles: createMulitReducer('battle'),
    battle: createSingleReducer('battle'),
    enemies: createMulitReducer('enemy')
});
