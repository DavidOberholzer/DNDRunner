from flask import Blueprint, jsonify, request

from dnd_runner import db_actions, models


item_methods = Blueprint("items", __name__)


@item_methods.route("/items", methods=["GET"])
def get_items() -> dict:
    items = db_actions.crud(
        action="list",
        model=models.Item,
        query={
            **request.args
        }
    )
    return jsonify(items)


@item_methods.route("/items/<_id>", methods=["GET"])
def get_item(_id: int) -> dict:
    item = db_actions.crud(
        action="read",
        model=models.Item,
        query={
            "id": _id,
        }
    )
    return jsonify(item)


@item_methods.route("/items", methods=["POST"])
def add_item() -> dict:
    data = request.json
    item = db_actions.crud(
        action="create",
        model=models.Item,
        data=data
    )
    return jsonify(item)


@item_methods.route("/items/<_id>", methods=["POST"])
def update_item(_id: int) -> dict:
    data = request.json
    item = db_actions.crud(
        action="update",
        model=models.Item,
        query={
            "id": _id,
        },
        data=data
    )
    return jsonify(item)


@item_methods.route("/items/<_id>", methods=["DELETE"])
def delete_item(_id: int) -> dict:
    result = db_actions.crud(
        action="delete",
        model=models.Item,
        query={
            "id": _id,
        }
    )
    return jsonify(result)
