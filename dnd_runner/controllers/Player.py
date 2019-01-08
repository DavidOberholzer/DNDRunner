from flask import Blueprint, jsonify, request
from flask_jwt import jwt_required, current_identity

from dnd_runner import db_actions, models
from dnd_runner.controllers.Utilities import fill_items

player_methods = Blueprint("players", __name__)


@player_methods.route("/players", methods=["GET"])
@jwt_required()
def get_players() -> tuple:
    players, status = db_actions.crud(
        action="list",
        model=models.Player,
        query={
            **request.args,
            "user_id": current_identity.id
        }
    )
    filled_players = []
    for player in players:
        filled_players.append(fill_items(player))
    return jsonify(players), status


@player_methods.route("/players/<_id>", methods=["GET"])
@jwt_required()
def get_player(_id: int) -> tuple:
    player, status = db_actions.crud(
        action="read",
        model=models.Player,
        query={
            "id": _id,
            "user_id": current_identity.id
        }
    )
    player = fill_items(player)
    return jsonify(player), status


@player_methods.route("/players", methods=["POST"])
@jwt_required()
def add_player() -> tuple:
    data = request.json
    data["user_id"] = current_identity.id
    player, status = db_actions.crud(
        action="create",
        model=models.Player,
        data=data,
        params=["id"]
    )
    player = fill_items(player)
    return jsonify(player), status


@player_methods.route("/players/<_id>", methods=["POST"])
@jwt_required()
def update_player(_id: int) -> tuple:
    data = request.json
    player, status = db_actions.crud(
        action="update",
        model=models.Player,
        query={
            "id": _id,
            "user_id": current_identity.id
        },
        data=data,
        params=["id"]
    )
    player = fill_items(player)
    return jsonify(player), status


@player_methods.route("/players/<_id>", methods=["DELETE"])
@jwt_required()
def delete_player(_id: int) -> tuple:
    db_actions.crud(
        action="read",
        model=models.Player,
        query={
            "id": _id,
            "user_id": current_identity.id
        }
    )
    db_actions.crud(
        action="delete_many",
        model=models.PlayerItem,
        query={
            "player_id": _id,
        }
    )
    db_actions.crud(
        action="delete_many",
        model=models.CampaignPlayer,
        query={
            "player_id": _id,
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
