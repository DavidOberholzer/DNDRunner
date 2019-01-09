from dnd_runner import db_actions, models
from dnd_runner.tests import DNDTestCase


class TestPlayers(DNDTestCase):

    def setUp(self):
        super().setUp()
        db_actions.crud(
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

    def test_get_all(self):
        response = self.client.get("/players", headers={"Authorization": f"JWT {self.TOKEN}"})
        players = response.json
        self.assertEquals(len(players), 2)

    def test_get(self):
        response = self.client.get("/players/1", headers={"Authorization": f"JWT {self.TOKEN}"})
        name = response.json["name"]
        self.assertEquals(name, "Test Player 1")

    def test_add(self):
        response = self.client.post(
            "/players",
            json={
                "name": "Test Player 3",
                "experience": 0,
                "level": 1,
                "health": 10,
                "current_health": 10,
                "carry_capacity": 10,
                "user_id": 1
            },
            headers={"Authorization": f"JWT {self.TOKEN}"},
            content_type="application/json"
        )
        response = self.client.get(
            f"/players/{response.json['id']}",
            headers={"Authorization": f"JWT {self.TOKEN}"}
        )
        name = response.json["name"]
        self.assertEquals(name, "Test Player 3")

    def test_update(self):
        response = self.client.post(
            "/players/1",
            json={"name": "changed_name"},
            headers={"Authorization": f"JWT {self.TOKEN}"},
            content_type="application/json"
        )
        name = response.json["name"]
        self.assertEquals(name, "changed_name")

    def test_delete(self):
        response = self.client.delete("/players/1", headers={"Authorization": f"JWT {self.TOKEN}"})
        self.assert200(response)
        response = self.client.get("/players", headers={"Authorization": f"JWT {self.TOKEN}"})
        players = response.json
        self.assertEquals(len(players), 1)
