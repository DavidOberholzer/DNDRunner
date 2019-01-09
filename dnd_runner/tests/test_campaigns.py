from dnd_runner import db_actions, models
from dnd_runner.tests import DNDTestCase


class TestCampaigns(DNDTestCase):

    def setUp(self):
        super().setUp()
        db_actions.crud(
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
        db_actions.crud(
            action="create",
            model=models.Campaign,
            data={
                "name": "Test Campaign 2",
                "description": "Test Description 2",
                "time_of_day": "07:30",
                "day": 1,
                "user_id": 1
            },
            params=["id"]
        )

    def test_get_all(self):
        response = self.client.get("/campaigns", headers={"Authorization": f"JWT {self.TOKEN}"})
        campaigns = response.json
        self.assertEquals(len(campaigns), 2)

    def test_get(self):
        response = self.client.get("/campaigns/1", headers={"Authorization": f"JWT {self.TOKEN}"})
        name = response.json["name"]
        self.assertEquals(name, "Test Campaign 1")

    def test_add(self):
        response = self.client.post(
            "/campaigns",
            json={
                "name": "Test Campaign 3",
                "description": "Test Description 3",
                "time_of_day": "07:30",
                "day": 1,
                "user_id": 1
            },
            headers={"Authorization": f"JWT {self.TOKEN}"},
            content_type="application/json"
        )
        response = self.client.get(
            f"/campaigns/{response.json['id']}",
            headers={"Authorization": f"JWT {self.TOKEN}"}
        )
        name = response.json["name"]
        self.assertEquals(name, "Test Campaign 3")

    def test_update(self):
        response = self.client.post(
            "/campaigns/1",
            json={"name": "changed_name"},
            headers={"Authorization": f"JWT {self.TOKEN}"},
            content_type="application/json"
        )
        name = response.json["name"]
        self.assertEquals(name, "changed_name")

    def test_delete(self):
        response = self.client.delete("/campaigns/1", headers={"Authorization": f"JWT {self.TOKEN}"})
        self.assert200(response)
        response = self.client.get("/campaigns", headers={"Authorization": f"JWT {self.TOKEN}"})
        campaigns = response.json
        self.assertEquals(len(campaigns), 1)
