from flask import Blueprint, jsonify, request

from dnd_runner import db_actions, models


campaign_battle_methods = Blueprint("campaign_battles", __name__)


@campaign_battle_methods.route("/campaign_battles", methods=["GET"])
def get_campaign_battles() -> dict:
    campaign_battles = db_actions.crud(
        action="list",
        model=models.CampaignBattle,
        query={
            **request.args
        }
    )
    return jsonify(campaign_battles)


@campaign_battle_methods.route("/campaign_battles/<campaign_id>/<battle_id>", methods=["GET"])
def get_campaign_battles(campaign_id: int, battle_id: int) -> dict:
    campaign_battle = db_actions.crud(
        action="read",
        model=models.CampaignBattle,
        query={
            "campaign_id": campaign_id,
            "battle_id": battle_id
        }
    )
    return jsonify(campaign_battle)


@campaign_battle_methods.route("/campaign_battles", methods=["POST"])
def add_campaign_battle() -> dict:
    data = request.json
    campaign_battle = db_actions.crud(
        action="create",
        model=models.CampaignBattle,
        data=data
    )
    return jsonify(campaign_battle)


@campaign_battle_methods.route("/campaign_battles/<campaign_id>/<battle_id>", methods=["POST"])
def update_campaign_battle(campaign_id: int, battle_id: int) -> dict:
    data = request.json
    campaign_battle = db_actions.crud(
        action="update",
        model=models.CampaignBattle,
        query={
            "campaign_id": campaign_id,
            "battle_id": battle_id
        },
        data=data
    )
    return jsonify(campaign_battle)


@campaign_battle_methods.route("/campaign_battles/<campaign_id>/<battle_id>", methods=["DELETE"])
def delete_campaign_battle(campaign_id: int, battle_id: int) -> dict:
    result = db_actions.crud(
        action="delete",
        model=models.CampaignBattle,
        query={
            "campaign_id": campaign_id,
            "battle_id": battle_id
        }
    )
    return jsonify(result)
