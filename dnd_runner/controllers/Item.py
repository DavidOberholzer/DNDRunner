from flask import Blueprint, jsonify, request

from dnd_runner import db_actions, models


item_methods = Blueprint("items", __name__)


@item_methods.route("/items", methods=["GET"])
def get_items() -> tuple:
    items, status = db_actions.crud(
        action="list",
        model=models.Item,
        query={
            **request.args
        }
    )
    return jsonify(items), status


@item_methods.route("/items/<_id>", methods=["GET"])
def get_item(_id: int) -> tuple:
    item, status = db_actions.crud(
        action="read",
        model=models.Item,
        query={
            "id": _id,
        }
    )
    return jsonify(item), status


@item_methods.route("/items", methods=["POST"])
def add_item() -> tuple:
    data = request.json
    item, status = db_actions.crud(
        action="create",
        model=models.Item,
        data=data,
        params=["id"]
    )
    return jsonify(item), status


@item_methods.route("/items/<_id>", methods=["POST"])
def update_item(_id: int) -> tuple:
    data = request.json
    item, status = db_actions.crud(
        action="update",
        model=models.Item,
        query={
            "id": _id
        },
        data=data,
        params=["id"]
    )
    return jsonify(item), status


@item_methods.route("/items/<_id>", methods=["DELETE"])
def delete_item(_id: int) -> tuple:
    db_actions.crud(
        action="delete",
        model=models.PlayerItem,
        query={
            "item_id": _id,
        },
        params={
            "error": False
        }
    )
    result, status = db_actions.crud(
        action="delete",
        model=models.Item,
        query={
            "id": _id,
        }
    )
    return jsonify(result), status
