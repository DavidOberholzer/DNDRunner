import { combineReducers } from 'redux';

import createMulitReducer from './createMultiReducer';
import createSingleReducer from './createSingleReducer';

export const runnerApp = combineReducers({
    campaigns: createMulitReducer('campaign'),
    campaign: createSingleReducer('campaign'),
    players: createMulitReducer('player'),
    allPlayers: createMulitReducer('all_player'),
    battles: createMulitReducer('battle'),
    allBattles: createMulitReducer('all_battle'),
    battle: createSingleReducer('battle'),
    enemies: createMulitReducer('enemy')
});
