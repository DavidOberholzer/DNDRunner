from dnd_runner import db_actions, models
from dnd_runner.tests import DNDTestCase


class TestItems(DNDTestCase):

    def setUp(self):
        super().setUp()
        db_actions.crud(
            action="create",
            model=models.Item,
            data={"name": "Test Item 1", "weight": 15, "user_id": 1},
            params=["id"]
        )
        db_actions.crud(
            action="create",
            model=models.Item,
            data={"name": "Test Item 2", "weight": 14, "user_id": 1},
            params=["id"]
        )

    def test_get_all(self):
        response = self.client.get("/items", headers={"Authorization": f"JWT {self.TOKEN}"})
        items = response.json
        self.assertEquals(len(items), 2)

    def test_get(self):
        response = self.client.get("/items/1", headers={"Authorization": f"JWT {self.TOKEN}"})
        name = response.json["name"]
        self.assertEquals(name, "Test Item 1")

    def test_add(self):
        response = self.client.post(
            "/items",
            json={"name": "Test Item 3", "weight": 14, "user_id": 1},
            headers={"Authorization": f"JWT {self.TOKEN}"},
            content_type="application/json"
        )
        response = self.client.get(
            f"/items/{response.json['id']}",
            headers={"Authorization": f"JWT {self.TOKEN}"}
        )
        name = response.json["name"]
        self.assertEquals(name, "Test Item 3")

    def test_update(self):
        response = self.client.post(
            "/items/1",
            json={"name": "changed_name"},
            headers={"Authorization": f"JWT {self.TOKEN}"},
            content_type="application/json"
        )
        name = response.json["name"]
        self.assertEquals(name, "changed_name")

    def test_delete(self):
        response = self.client.delete("/items/1", headers={"Authorization": f"JWT {self.TOKEN}"})
        self.assert200(response)
        response = self.client.get("/items", headers={"Authorization": f"JWT {self.TOKEN}"})
        items = response.json
        self.assertEquals(len(items), 1)
