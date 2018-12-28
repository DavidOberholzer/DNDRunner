from flask import Blueprint, jsonify, request

from dnd_runner import db_actions, models


player_methods = Blueprint("players", __name__)


@player_methods.route("/players", methods=["GET"])
def get_players() -> dict:
    players = db_actions.crud(
        action="list",
        model=models.Player,
        query={
            **request.args
        }
    )
    return jsonify(players)


@player_methods.route("/players/<_id>", methods=["GET"])
def get_player(_id: int) -> dict:
    player = db_actions.crud(
        action="read",
        model=models.Player,
        query={
            "id": _id,
        }
    )
    return jsonify(player)


@player_methods.route("/players", methods=["POST"])
def add_player() -> dict:
    data = request.json
    player = db_actions.crud(
        action="create",
        model=models.Player,
        data=data
    )
    return jsonify(player)


@player_methods.route("/players/<_id>", methods=["POST"])
def update_player(_id: int) -> dict:
    data = request.json
    player = db_actions.crud(
        action="update",
        model=models.Player,
        query={
            "id": _id,
        },
        data=data
    )
    return jsonify(player)


@player_methods.route("/players/<_id>", methods=["DELETE"])
def delete_player(_id: int) -> dict:
    result = db_actions.crud(
        action="delete",
        model=models.Player,
        query={
            "id": _id,
        }
    )
    return jsonify(result)
