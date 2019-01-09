from dnd_runner import db_actions, models
from dnd_runner.tests import DNDTestCase


class TestPlayerItems(DNDTestCase):

    def setUp(self):
        super().setUp()
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
            model=models.Player,
            data={
                "name": "Test Player 2",
                "experience": 0,
                "level": 1,
                "health": 10,
                "current_health": 10,
                "carry_capacity": 10,
                "user_id": 1
            },
            params=["id"]
        )
        db_actions.crud(
            action="create",
            model=models.Item,
            data={
                "name": "Test Item 2",
                "weight": 10,
                "user_id": 1
            },
            params=["id"]
        )

    def test_get_all(self):
        response = self.client.get("/player-items", headers={"Authorization": f"JWT {self.TOKEN}"})
        relations = response.json
        self.assertEquals(len(relations), 1)

    def test_get(self):
        response = self.client.get("/player-items/1/1", headers={"Authorization": f"JWT {self.TOKEN}"})
        _id = response.json["player_id"]
        amount = response.json["amount"]
        self.assertEquals(_id, 1)
        self.assertEquals(amount, 2)

    def test_add(self):
        response = self.client.post(
            "/player-items",
            json={"player_id": 2, "item_id": 2},
            headers={"Authorization": f"JWT {self.TOKEN}"},
            content_type="application/json"
        )
        response = self.client.get(
            f"/player-items/{response.json['player_id']}/{response.json['item_id']}",
            headers={"Authorization": f"JWT {self.TOKEN}"}
        )
        _id = response.json["player_id"]
        self.assertEquals(_id, 2)

    def test_update(self):
        response = self.client.post(
            "/player-items/1/1",
            json={"amount": 4},
            headers={"Authorization": f"JWT {self.TOKEN}"},
            content_type="application/json"
        )
        amount = response.json["amount"]
        self.assertEquals(amount, 4)

    def test_delete(self):
        response = self.client.delete("/player-items/1/1", headers={"Authorization": f"JWT {self.TOKEN}"})
        self.assert200(response)
        response = self.client.get("/player-items", headers={"Authorization": f"JWT {self.TOKEN}"})
        players = response.json
        self.assertEquals(len(players), 0)
