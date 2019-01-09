from dnd_runner import db_actions, models
from dnd_runner.tests import DNDTestCase


class TestBattles(DNDTestCase):

    def setUp(self):
        super().setUp()
        db_actions.crud(
            action="create",
            model=models.Battle,
            data={"name": "Test Battle 1", "description": "Test Description 1", "user_id": 1},
            params=["id"]
        )
        db_actions.crud(
            action="create",
            model=models.Battle,
            data={"name": "Test Battle 2", "description": "Test Description 2", "user_id": 1},
            params=["id"]
        )

    def test_get_all(self):
        response = self.client.get("/battles", headers={"Authorization": f"JWT {self.TOKEN}"})
        battles = response.json
        self.assertEquals(len(battles), 2)

    def test_get(self):
        response = self.client.get("/battles/1", headers={"Authorization": f"JWT {self.TOKEN}"})
        name = response.json["name"]
        self.assertEquals(name, "Test Battle 1")

    def test_add(self):
        response = self.client.post(
            "/battles",
            json={"name": "Test Battle 3", "description": "Test Description 3", "user_id": 1},
            headers={"Authorization": f"JWT {self.TOKEN}"},
            content_type="application/json"
        )
        response = self.client.get(
            f"/battles/{response.json['id']}",
            headers={"Authorization": f"JWT {self.TOKEN}"}
        )
        name = response.json["name"]
        self.assertEquals(name, "Test Battle 3")

    def test_update(self):
        response = self.client.post(
            "/battles/1",
            json={"name": "changed_name"},
            headers={"Authorization": f"JWT {self.TOKEN}"},
            content_type="application/json"
        )
        name = response.json["name"]
        self.assertEquals(name, "changed_name")

    def test_delete(self):
        response = self.client.delete("/battles/1", headers={"Authorization": f"JWT {self.TOKEN}"})
        self.assert200(response)
        response = self.client.get("/battles", headers={"Authorization": f"JWT {self.TOKEN}"})
        battles = response.json
        self.assertEquals(len(battles), 1)
