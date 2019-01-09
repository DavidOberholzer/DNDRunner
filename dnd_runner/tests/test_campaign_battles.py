from dnd_runner import db_actions, models
from dnd_runner.tests import DNDTestCase


class TestCampaignBattles(DNDTestCase):

    def setUp(self):
        super().setUp()
        battle, status = db_actions.crud(
            action="create",
            model=models.Battle,
            data={"name": "Test Battle 1", "description": "Test Description 1", "user_id": 1},
            params=["id"]
        )
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
        db_actions.crud(
            action="create",
            model=models.CampaignBattle,
            data={"battle_id": battle["id"], "campaign_id": campaign["id"]},
            params=["battle_id", "campaign_id"]
        )
        db_actions.crud(
            action="create",
            model=models.Battle,
            data={"name": "Test Battle 2", "description": "Test Description 1", "user_id": 1},
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
        response = self.client.get("/campaign-battles", headers={"Authorization": f"JWT {self.TOKEN}"})
        relations = response.json
        self.assertEquals(len(relations), 1)

    def test_get(self):
        response = self.client.get("/campaign-battles/1/1", headers={"Authorization": f"JWT {self.TOKEN}"})
        _id = response.json["battle_id"]
        self.assertEquals(_id, 1)

    def test_add(self):
        response = self.client.post(
            "/campaign-battles",
            json={"battle_id": 2, "campaign_id": 2},
            headers={"Authorization": f"JWT {self.TOKEN}"},
            content_type="application/json"
        )
        response = self.client.get(
            f"/campaign-battles/{response.json['battle_id']}/{response.json['campaign_id']}",
            headers={"Authorization": f"JWT {self.TOKEN}"}
        )
        _id = response.json["battle_id"]
        self.assertEquals(_id, 2)

    def test_update(self):
        response = self.client.post(
            "/campaign-battles/1/1",
            json={"battle_id": 2},
            headers={"Authorization": f"JWT {self.TOKEN}"},
            content_type="application/json"
        )
        _id = response.json["battle_id"]
        self.assertEquals(_id, 2)

    def test_delete(self):
        response = self.client.delete("/campaign-battles/1/1", headers={"Authorization": f"JWT {self.TOKEN}"})
        self.assert200(response)
        response = self.client.get("/campaign-battles", headers={"Authorization": f"JWT {self.TOKEN}"})
        battles = response.json
        self.assertEquals(len(battles), 0)
