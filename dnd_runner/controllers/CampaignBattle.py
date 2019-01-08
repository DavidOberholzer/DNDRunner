from flask import Blueprint, jsonify, request
from flask_jwt import jwt_required

from dnd_runner import db_actions, models


campaign_battle_methods = Blueprint("campaign_battles", __name__)


@campaign_battle_methods.route("/campaign-battles", methods=["GET"])
@jwt_required()
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
@jwt_required()
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
@jwt_required()
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
@jwt_required()
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
@jwt_required()
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
