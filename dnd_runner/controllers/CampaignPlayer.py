from flask import Blueprint, jsonify, request

from dnd_runner import db_actions, models


campaign_player_methods = Blueprint("campaign_players", __name__)


@campaign_player_methods.route("/campaign-players", methods=["GET"])
def get_campaign_players() -> tuple:
    campaign_players, status = db_actions.crud(
        action="list",
        model=models.CampaignPlayer,
        query={
            **request.args
        }
    )
    return jsonify(campaign_players), status


@campaign_player_methods.route("/campaign-players/<campaign_id>/<player_id>", methods=["GET"])
def get_campaign_player(campaign_id: int, player_id: int) -> tuple:
    campaign_player, status = db_actions.crud(
        action="read",
        model=models.CampaignPlayer,
        query={
            "campaign_id": campaign_id,
            "player_id": player_id
        }
    )
    return jsonify(campaign_player), status


@campaign_player_methods.route("/campaign-players", methods=["POST"])
def add_campaign_player() -> tuple:
    data = request.json
    campaign_player, status = db_actions.crud(
        action="create",
        model=models.CampaignPlayer,
        data=data,
        params=["campaign_id", "player_id"]
    )
    return jsonify(campaign_player), status


@campaign_player_methods.route("/campaign-players/<campaign_id>/<player_id>", methods=["POST"])
def update_campaign_player(campaign_id: int, player_id: int) -> tuple:
    data = request.json
    campaign_player, status = db_actions.crud(
        action="update",
        model=models.CampaignPlayer,
        query={
            "campaign_id": campaign_id,
            "player_id": player_id
        },
        data=data,
        params=["campaign_id", "player_id"]
    )
    return jsonify(campaign_player), status


@campaign_player_methods.route("/campaign-players/<campaign_id>/<player_id>", methods=["DELETE"])
def delete_campaign_player(campaign_id: int, player_id: int) -> tuple:
    result, status = db_actions.crud(
        action="delete",
        model=models.CampaignPlayer,
        query={
            "campaign_id": campaign_id,
            "player_id": player_id
        }
    )
    return jsonify(result), status
