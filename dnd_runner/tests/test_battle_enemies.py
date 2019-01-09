from dnd_runner import db_actions, models
from dnd_runner.tests import DNDTestCase


class TestBattleEnemies(DNDTestCase):

    def setUp(self):
        super().setUp()
        battle, status = db_actions.crud(
            action="create",
            model=models.Battle,
            data={"name": "Test Battle 1", "description": "Test Description 1", "user_id": 1},
            params=["id"]
        )
        enemy, status = db_actions.crud(
            action="create",
            model=models.Enemy,
            data={"name": "Orc 1", "level": 1, "health": 10, "current_health": 10, "user_id": 1},
            params=["id"]
        )
        db_actions.crud(
            action="create",
            model=models.BattleEnemy,
            data={"battle_id": battle["id"], "enemy_id": enemy["id"]},
            params=["battle_id", "enemy_id"]
        )
        db_actions.crud(
            action="create",
            model=models.Battle,
            data={"name": "Test Battle 2", "description": "Test Description 1", "user_id": 1},
            params=["id"]
        )
        db_actions.crud(
            action="create",
            model=models.Enemy,
            data={"name": "Orc 2", "level": 1, "health": 10, "current_health": 10, "user_id": 1},
            params=["id"]
        )

    def test_get_all(self):
        response = self.client.get("/battle-enemies", headers={"Authorization": f"JWT {self.TOKEN}"})
        relations = response.json
        self.assertEquals(len(relations), 1)

    def test_get(self):
        response = self.client.get("/battle-enemies/1/1", headers={"Authorization": f"JWT {self.TOKEN}"})
        _id = response.json["battle_id"]
        self.assertEquals(_id, 1)

    def test_add(self):
        response = self.client.post(
            "/battle-enemies",
            json={"battle_id": 2, "enemy_id": 2},
            headers={"Authorization": f"JWT {self.TOKEN}"},
            content_type="application/json"
        )
        response = self.client.get(
            f"/battle-enemies/{response.json['battle_id']}/{response.json['enemy_id']}",
            headers={"Authorization": f"JWT {self.TOKEN}"}
        )
        _id = response.json["battle_id"]
        self.assertEquals(_id, 2)

    def test_update(self):
        response = self.client.post(
            "/battle-enemies/1/1",
            json={"battle_id": 2},
            headers={"Authorization": f"JWT {self.TOKEN}"},
            content_type="application/json"
        )
        _id = response.json["battle_id"]
        self.assertEquals(_id, 2)

    def test_delete(self):
        response = self.client.delete("/battle-enemies/1/1", headers={"Authorization": f"JWT {self.TOKEN}"})
        self.assert200(response)
        response = self.client.get("/battle-enemies", headers={"Authorization": f"JWT {self.TOKEN}"})
        battles = response.json
        self.assertEquals(len(battles), 0)
