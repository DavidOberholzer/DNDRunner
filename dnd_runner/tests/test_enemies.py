from dnd_runner import db_actions, models
from dnd_runner.tests import DNDTestCase


class TestEnemies(DNDTestCase):

    def setUp(self):
        super().setUp()
        db_actions.crud(
            action="create",
            model=models.Enemy,
            data={"name": "Test Enemy 1", "level": 1, "user_id": 1},
            params=["id"]
        )
        db_actions.crud(
            action="create",
            model=models.Enemy,
            data={"name": "Test Enemy 2", "level": 2, "user_id": 1},
            params=["id"]
        )

    def test_get_all(self):
        response = self.client.get("/enemies", headers={"Authorization": f"JWT {self.TOKEN}"})
        enemies = response.json
        self.assertEquals(len(enemies), 2)

    def test_get(self):
        response = self.client.get("/enemies/1", headers={"Authorization": f"JWT {self.TOKEN}"})
        name = response.json["name"]
        self.assertEquals(name, "Test Enemy 1")

    def test_add(self):
        response = self.client.post(
            "/enemies",
            json={"name": "Test Enemy 3", "level": 1, "user_id": 1},
            headers={"Authorization": f"JWT {self.TOKEN}"},
            content_type="application/json"
        )
        response = self.client.get(
            f"/enemies/{response.json['id']}",
            headers={"Authorization": f"JWT {self.TOKEN}"}
        )
        name = response.json["name"]
        self.assertEquals(name, "Test Enemy 3")

    def test_update(self):
        response = self.client.post(
            "/enemies/1",
            json={"name": "changed_name"},
            headers={"Authorization": f"JWT {self.TOKEN}"},
            content_type="application/json"
        )
        name = response.json["name"]
        self.assertEquals(name, "changed_name")

    def test_delete(self):
        response = self.client.delete("/enemies/1", headers={"Authorization": f"JWT {self.TOKEN}"})
        self.assert200(response)
        response = self.client.get("/enemies", headers={"Authorization": f"JWT {self.TOKEN}"})
        enemies = response.json
        self.assertEquals(len(enemies), 1)
