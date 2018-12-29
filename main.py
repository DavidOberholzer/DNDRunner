from dnd_runner.controllers import Campaign, Player, Item, Enemy, \
    Battle, BattleEnemy, CampaignBattle, CampaignPlayer, PlayerItem, \
    Utilities

from project.app import App

App.register_blueprint(Campaign.campaign_methods)
App.register_blueprint(Player.player_methods)
App.register_blueprint(Item.item_methods)
App.register_blueprint(Enemy.enemy_methods)
App.register_blueprint(Battle.battle_methods)
App.register_blueprint(BattleEnemy.battle_enemy_methods)
App.register_blueprint(CampaignBattle.campaign_battle_methods)
App.register_blueprint(CampaignPlayer.campaign_player_methods)
App.register_blueprint(PlayerItem.player_item_methods)
App.register_blueprint(Utilities.utility_methods)


App.run(debug=True, port=8080)
