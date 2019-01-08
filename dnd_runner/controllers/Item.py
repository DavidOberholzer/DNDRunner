from flask import Blueprint, jsonify, request
from flask_jwt import jwt_required, current_identity

from dnd_runner import db_actions, models


item_methods = Blueprint("items", __name__)


@item_methods.route("/items", methods=["GET"])
@jwt_required()
def get_items() -> tuple:
    items, status = db_actions.crud(
        action="list",
        model=models.Item,
        query={
            **request.args,
            "user_id": current_identity.id
        }
    )
    return jsonify(items), status


@item_methods.route("/items/<_id>", methods=["GET"])
@jwt_required()
def get_item(_id: int) -> tuple:
    item, status = db_actions.crud(
        action="read",
        model=models.Item,
        query={
            "id": _id,
            "user_id": current_identity.id
        }
    )
    return jsonify(item), status


@item_methods.route("/items", methods=["POST"])
@jwt_required()
def add_item() -> tuple:
    data = request.json
    data["user_id"] = current_identity.id
    item, status = db_actions.crud(
        action="create",
        model=models.Item,
        data=data,
        params=["id"]
    )
    return jsonify(item), status


@item_methods.route("/items/<_id>", methods=["POST"])
@jwt_required()
def update_item(_id: int) -> tuple:
    data = request.json
    item, status = db_actions.crud(
        action="update",
        model=models.Item,
        query={
            "id": _id,
            "user_id": current_identity.id
        },
        data=data,
        params=["id"]
    )
    return jsonify(item), status


@item_methods.route("/items/<_id>", methods=["DELETE"])
@jwt_required()
def delete_item(_id: int) -> tuple:
    db_actions.crud(
        action="read",
        model=models.Item,
        query={
            "id": _id,
            "user_id": current_identity.id
        }
    )
    db_actions.crud(
        action="delete_many",
        model=models.PlayerItem,
        query={
            "item_id": _id,
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
