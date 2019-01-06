from flask import Blueprint, jsonify, request

from dnd_runner import db_actions, models


enemy_methods = Blueprint("enemies", __name__)


@enemy_methods.route("/enemies", methods=["GET"])
def get_enemies() -> tuple:
    enemies, status = db_actions.crud(
        action="list",
        model=models.Enemy,
        query={
            **request.args
        }
    )
    return jsonify(enemies), status


@enemy_methods.route("/enemies/<_id>", methods=["GET"])
def get_enemy(_id: int) -> tuple:
    enemy, status = db_actions.crud(
        action="read",
        model=models.Enemy,
        query={
            "id": _id,
        }
    )
    return jsonify(enemy), status


@enemy_methods.route("/enemies", methods=["POST"])
def add_enemy() -> tuple:
    data = request.json
    enemy, status = db_actions.crud(
        action="create",
        model=models.Enemy,
        data=data,
        params=["id"]
    )
    return jsonify(enemy), status


@enemy_methods.route("/enemies/<_id>", methods=["POST"])
def update_enemy(_id: int) -> tuple:
    data = request.json
    enemy, status = db_actions.crud(
        action="update",
        model=models.Enemy,
        query={
            "id": _id
        },
        data=data,
        params=["id"]
    )
    return jsonify(enemy), status


@enemy_methods.route("/enemies/<_id>", methods=["DELETE"])
def delete_enemy(_id: int) -> tuple:
    db_actions.crud(
        action="delete",
        model=models.BattleEnemy,
        query={
            "enemy_id": _id,
        },
        params={
            "error": False
        }
    )
    result, status = db_actions.crud(
        action="delete",
        model=models.Enemy,
        query={
            "id": _id,
        }
    )
    return jsonify(result), status
