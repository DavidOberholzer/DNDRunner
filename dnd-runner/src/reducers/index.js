import { combineReducers } from 'redux';

import createMulitReducer from './createMultiReducer';
import createMulitListReducer from './createMultiListReducer';
import createSingleReducer from './createSingleReducer';
import mode from './mode';
import order from './order';

export const runnerApp = combineReducers({
    campaigns: createMulitReducer('campaign'),
    campaign: createSingleReducer('campaign', {}),
    players: createMulitReducer('player'),
    allPlayers: createMulitReducer('all_player'),
    battles: createMulitReducer('battle'),
    allBattles: createMulitReducer('all_battle'),
    battle: createSingleReducer('battle', {}),
    enemies: createMulitReducer('enemy'),
    allEnemies: createMulitReducer('all_enemy'),
    delete: createSingleReducer('delete', {}),
    edit: createSingleReducer('edit', {}),
    allItems: createMulitReducer('all_item'),
    manage: createSingleReducer('manage', null),
    images: createMulitListReducer('image'),
    token: createSingleReducer('token', null),
    logout: createSingleReducer('logout', false),
    user: createSingleReducer('user', {}),
    mode,
    order
});
