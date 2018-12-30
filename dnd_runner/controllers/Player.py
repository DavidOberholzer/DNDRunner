from flask import Blueprint, jsonify, request

from dnd_runner import db_actions, models


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
    return jsonify(player), status


@player_methods.route("/players/<_id>", methods=["DELETE"])
def delete_player(_id: int) -> tuple:
    result, status = db_actions.crud(
        action="delete",
        model=models.Player,
        query={
            "id": _id,
        }
    )
    return jsonify(result), status
