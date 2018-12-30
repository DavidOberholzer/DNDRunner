from flask import Blueprint, jsonify, request

from dnd_runner import db_actions, models


campaign_battle_methods = Blueprint("campaign_battles", __name__)


@campaign_battle_methods.route("/campaign-battles", methods=["GET"])
def get_campaign_battles() -> tuple:
    campaign_battles, status = db_actions.crud(
        action="list",
        model=models.CampaignBattle,
        query={
            **request.args
        }
    )
    return jsonify(campaign_battles), status


@campaign_battle_methods.route("/campaign-battles/<campaign_id>/<battle_id>", methods=["GET"])
def get_campaign_battle(campaign_id: int, battle_id: int) -> tuple:
    campaign_battle, status = db_actions.crud(
        action="read",
        model=models.CampaignBattle,
        query={
            "campaign_id": campaign_id,
            "battle_id": battle_id
        }
    )
    return jsonify(campaign_battle), status


@campaign_battle_methods.route("/campaign-battles", methods=["POST"])
def add_campaign_battle() -> tuple:
    data = request.json
    campaign_battle, status = db_actions.crud(
        action="create",
        model=models.CampaignBattle,
        data=data,
        params=["campaign_id", "battle_id"]
    )
    return jsonify(campaign_battle), status


@campaign_battle_methods.route("/campaign-battles/<campaign_id>/<battle_id>", methods=["POST"])
def update_campaign_battle(campaign_id: int, battle_id: int) -> tuple:
    data = request.json
    campaign_battle, status = db_actions.crud(
        action="update",
        model=models.CampaignBattle,
        query={
            "campaign_id": campaign_id,
            "battle_id": battle_id
        },
        data=data,
        params=["campaign_id", "battle_id"]
    )
    return jsonify(campaign_battle), status


@campaign_battle_methods.route("/campaign-battles/<campaign_id>/<battle_id>", methods=["DELETE"])
def delete_campaign_battle(campaign_id: int, battle_id: int) -> tuple:
    result, status = db_actions.crud(
        action="delete",
        model=models.CampaignBattle,
        query={
            "campaign_id": campaign_id,
            "battle_id": battle_id
        }
    )
    return jsonify(result), status
