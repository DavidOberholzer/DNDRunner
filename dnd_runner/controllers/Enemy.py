from flask import Blueprint, jsonify, request

from dnd_runner import db_actions, models


enemy_methods = Blueprint("enemies", __name__)


@enemy_methods.route("/enemies", methods=["GET"])
def get_enemies() -> dict:
    enemies = db_actions.crud(
        action="list",
        model=models.Enemy,
        query={
            **request.args
        }
    )
    return jsonify(enemies)


@enemy_methods.route("/enemies/<_id>", methods=["GET"])
def get_enemy(_id: int) -> dict:
    enemy = db_actions.crud(
        action="read",
        model=models.Enemy,
        query={
            "id": _id,
        }
    )
    return jsonify(enemy)


@enemy_methods.route("/enemies", methods=["POST"])
def add_enemies() -> dict:
    data = request.json
    enemy = db_actions.crud(
        action="create",
        model=models.Enemy,
        data=data
    )
    return jsonify(enemy)


@enemy_methods.route("/enemies/<_id>", methods=["POST"])
def update_enemy(_id: int) -> dict:
    data = request.json
    enemy = db_actions.crud(
        action="update",
        model=models.Enemy,
        query={
            "id": _id,
        },
        data=data
    )
    return jsonify(enemy)


@enemy_methods.route("/enemies/<_id>", methods=["DELETE"])
def delete_enemy(_id: int) -> dict:
    result = db_actions.crud(
        action="delete",
        model=models.Enemy,
        query={
            "id": _id,
        }
    )
    return jsonify(result)
