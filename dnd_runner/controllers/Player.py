from flask import Blueprint, jsonify, request

from dnd_runner import db_actions, models
from dnd_runner.controllers.Utilities import fill_items

player_methods = Blueprint("players", __name__)


@player_methods.route("/players", methods=["GET"])
def get_players() -> tuple:
    players, status = db_actions.crud(
        action="list",
        model=models.Player,
        query={
            **request.args
        }
    )
    filled_players = []
    for player in players:
        filled_players.append(fill_items(player))
    return jsonify(players), status


@player_methods.route("/players/<_id>", methods=["GET"])
def get_player(_id: int) -> tuple:
    player, status = db_actions.crud(
        action="read",
        model=models.Player,
        query={
            "id": _id,
        }
    )
    player = fill_items(player)
    return jsonify(player), status


@player_methods.route("/players", methods=["POST"])
def add_player() -> tuple:
    data = request.json
    player, status = db_actions.crud(
        action="create",
        model=models.Player,
        data=data,
        params=["id"]
    )
    player = fill_items(player)
    return jsonify(player), status


@player_methods.route("/players/<_id>", methods=["POST"])
def update_player(_id: int) -> tuple:
    data = request.json
    player, status = db_actions.crud(
        action="update",
        model=models.Player,
        query={
            "id": _id
        },
        data=data,
        params=["id"]
    )
    player = fill_items(player)
    return jsonify(player), status


@player_methods.route("/players/<_id>", methods=["DELETE"])
def delete_player(_id: int) -> tuple:
    db_actions.crud(
        action="delete",
        model=models.PlayerItem,
        query={
            "player_id": _id,
        },
        params={
            "error": False
        }
    )
    db_actions.crud(
        action="delete",
        model=models.CampaignPlayer,
        query={
            "player_id": _id,
        },
        params={
            "error": False
        }
    )
    result, status = db_actions.crud(
        action="delete",
        model=models.Player,
        query={
            "id": _id,
        }
    )
    return jsonify(result), status
