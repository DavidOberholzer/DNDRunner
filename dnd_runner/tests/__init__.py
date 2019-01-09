
import hashlib

from flask_jwt import JWT
from flask_testing import TestCase

from project.app import App, DB
from project import settings

from dnd_runner import db_actions, models
from dnd_runner.controllers import User, Campaign, Player, Item, Enemy, \
    Battle, BattleEnemy, CampaignBattle, CampaignPlayer, PlayerItem, \
    Utilities


class DNDTestCase(TestCase):

    TOKEN = None

    def create_app(self):
        App.config["TESTING"] = True
        App.config["LIVESERVER_PORT"] = 8943
        App.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://testdnd:testdnd@localhost:5432/testdnd"
        JWT(App, Utilities.authenticate, Utilities.identity)
        App.register_blueprint(User.user_methods)
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
        return App

    def setUp(self):
        DB.create_all()
        password = hashlib.md5(f"password{settings.SALT}".encode("utf-8")).hexdigest()
        user_data = {"username": "test", "password": password}
        self.user, status = db_actions.crud(
            action="create",
            model=models.User,
            data=user_data,
            params=["id"]
        )
        response = self.client.post(
            "/auth",
            json={"username": "test", "password": "password"},
            content_type="application/json"
        )
        self.TOKEN = response.json["access_token"]

    def tearDown(self):
        DB.session.remove()
        DB.drop_all()
