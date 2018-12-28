from flask import Blueprint, jsonify, request

from dnd_runner import db_actions, models


player_item_methods = Blueprint("player_items", __name__)


@player_item_methods.route("/player-items", methods=["GET"])
def get_player_items() -> dict:
    player_items = db_actions.crud(
        action="list",
        model=models.PlayerItem,
        query={
            **request.args
        }
    )
    return jsonify(player_items)


@player_item_methods.route("/player-items/<player_id>/<item_id>", methods=["GET"])
def get_player_item(player_id: int, item_id: int) -> dict:
    player_item = db_actions.crud(
        action="read",
        model=models.PlayerItem,
        query={
            "player_id": player_id,
            "item_id": item_id
        }
    )
    return jsonify(player_item)


@player_item_methods.route("/player-items", methods=["POST"])
def add_player_item() -> dict:
    data = request.json
    player_item = db_actions.crud(
        action="create",
        model=models.PlayerItem,
        data=data
    )
    return jsonify(player_item)


@player_item_methods.route("/player-items/<player_id>/<item_id>", methods=["POST"])
def update_player_item(player_id: int, item_id: int) -> dict:
    data = request.json
    player_item = db_actions.crud(
        action="update",
        model=models.PlayerItem,
        query={
            "player_id": player_id,
            "item_id": item_id
        },
        data=data
    )
    return jsonify(player_item)


@player_item_methods.route("/player-items/<player_id>/<item_id>", methods=["DELETE"])
def delete_player_item(player_id: int, item_id: int) -> dict:
    result = db_actions.crud(
        action="delete",
        model=models.PlayerItem,
        query={
            "player_id": player_id,
            "item_id": item_id
        }
    )
    return jsonify(result)
