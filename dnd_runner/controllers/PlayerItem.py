from flask import Blueprint, jsonify, request

from dnd_runner import db_actions, models


player_item_methods = Blueprint("player_items", __name__)


@player_item_methods.route("/player-items", methods=["GET"])
def get_player_items() -> tuple:
    player_items, status = db_actions.crud(
        action="list",
        model=models.PlayerItem,
        query={
            **request.args
        }
    )
    return jsonify(player_items), status


@player_item_methods.route("/player-items/<player_id>/<item_id>", methods=["GET"])
def get_player_item(player_id: int, item_id: int) -> tuple:
    player_item, status = db_actions.crud(
        action="read",
        model=models.PlayerItem,
        query={
            "player_id": player_id,
            "item_id": item_id
        }
    )
    return jsonify(player_item), status


@player_item_methods.route("/player-items", methods=["POST"])
def add_player_item() -> tuple:
    data = request.json
    player_item, status = db_actions.crud(
        action="create",
        model=models.PlayerItem,
        data=data,
        params=["player_id", "item_id"]
    )
    return jsonify(player_item), status


@player_item_methods.route("/player-items/<player_id>/<item_id>", methods=["POST"])
def update_player_item(player_id: int, item_id: int) -> tuple:
    data = request.json
    player_item, status = db_actions.crud(
        action="update",
        model=models.PlayerItem,
        query={
            "player_id": player_id,
            "item_id": item_id
        },
        data=data,
        params=["player_id", "item_id"]
    )
    return jsonify(player_item), status


@player_item_methods.route("/player-items/<player_id>/<item_id>", methods=["DELETE"])
def delete_player_item(player_id: int, item_id: int) -> tuple:
    result, status = db_actions.crud(
        action="delete",
        model=models.PlayerItem,
        query={
            "player_id": player_id,
            "item_id": item_id
        }
    )
    return jsonify(result), status
