from dnd_runner import db_actions, models
from dnd_runner.tests import DNDTestCase


class TestUsers(DNDTestCase):

    def setUp(self):
        super().setUp()
        campaign, status = db_actions.crud(
            action="create",
            model=models.Campaign,
            data={
                "name": "Test Campaign 1",
                "description": "Test Description 1",
                "time_of_day": "07:30",
                "day": 1,
                "user_id": 1
            },
            params=["id"]
        )
        battle, status = db_actions.crud(
            action="create",
            model=models.Battle,
            data={"name": "Test Battle 1", "description": "Test Description 1", "user_id": 1},
            params=["id"]
        )
        player, status = db_actions.crud(
            action="create",
            model=models.Player,
            data={
                "name": "Test Player 1",
                "experience": 0,
                "level": 1,
                "health": 10,
                "current_health": 10,
                "carry_capacity": 10,
                "user_id": 1
            },
            params=["id"]
        )
        enemy, status = db_actions.crud(
            action="create",
            model=models.Enemy,
            data={"name": "Orc 1", "level": 1, "health": 10, "current_health": 10, "user_id": 1},
            params=["id"]
        )
        item, status = db_actions.crud(
            action="create",
            model=models.Item,
            data={
                "name": "Test Item 1",
                "weight": 10,
                "user_id": 1
            },
            params=["id"]
        )
        db_actions.crud(
            action="create",
            model=models.PlayerItem,
            data={"player_id": player["id"], "item_id": item["id"], "amount": 2},
            params=["player_id", "item_id"]
        )
        db_actions.crud(
            action="create",
            model=models.BattleEnemy,
            data={"battle_id": battle["id"], "enemy_id": enemy["id"]},
            params=["battle_id", "enemy_id"]
        )
        db_actions.crud(
            action="create",
            model=models.CampaignPlayer,
            data={"player_id": player["id"], "campaign_id": campaign["id"]},
            params=["player_id", "campaign_id"]
        )
        db_actions.crud(
            action="create",
            model=models.CampaignBattle,
            data={"battle_id": battle["id"], "campaign_id": campaign["id"]},
            params=["battle_id", "campaign_id"]
        )

    def test_get(self):
        response = self.client.get("/user", headers={"Authorization": f"JWT {self.TOKEN}"})
        username = response.json["username"]
        self.assertEquals(username, "test")

    def test_add(self):
        self.client.post(
            "/users",
            json={"username": "Test User 2", "password": "password"},
            content_type="application/json"
        )
        response = self.client.post(
            "/auth",
            json={"username": "Test User 2", "password": "password"},
            content_type="application/json"
        )
        token = response.json["access_token"]
        response = self.client.get(
            f"/user",
            headers={"Authorization": f"JWT {token}"}
        )
        username = response.json["username"]
        self.assertEquals(username, "Test User 2")

    def test_update(self):
        response = self.client.post(
            "/users/1",
            json={"username": "changed_name"},
            headers={"Authorization": f"JWT {self.TOKEN}"},
            content_type="application/json"
        )
        username = response.json["username"]
        self.assertEquals(username, "changed_name")

    def test_delete(self):
        self.client.post(
            "/users",
            json={"username": "Test User 2", "password": "password"},
            content_type="application/json"
        )
        response = self.client.post(
            "/auth",
            json={"username": "Test User 2", "password": "password"},
            content_type="application/json"
        )
        token = response.json["access_token"]
        response = self.client.delete("/users/2", headers={"Authorization": f"JWT {token}"})
        self.assert200(response)
