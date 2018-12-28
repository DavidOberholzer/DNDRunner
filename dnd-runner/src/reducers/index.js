import { combineReducers } from 'redux';

import createReducer from './createReducers';

export const runnerApp = combineReducers({
    campaigns: createReducer('campaigns'),
    players: createReducer('players'),
    items: createReducer('items'),
    battles: createReducer('battles'),
    enemies: createReducer('enemies'),
    battleEnemies: createReducer('battleEnemies'),
    campaignBattles: createReducer('campaignBattle'),
    campaignPlayers: createReducer('campaignPlayer'),
    playerItems: createReducer('playerItems')
});
