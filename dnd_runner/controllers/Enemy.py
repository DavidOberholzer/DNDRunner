from flask import Blueprint, jsonify, request
from flask_jwt import jwt_required, current_identity

from dnd_runner import db_actions, models


enemy_methods = Blueprint("enemies", __name__)


@enemy_methods.route("/enemies", methods=["GET"])
@jwt_required()
def get_enemies() -> tuple:
    enemies, status = db_actions.crud(
        action="list",
        model=models.Enemy,
        query={
            **request.args,
            "user_id": current_identity.id
        }
    )
    return jsonify(enemies), status


@enemy_methods.route("/enemies/<_id>", methods=["GET"])
@jwt_required()
def get_enemy(_id: int) -> tuple:
    enemy, status = db_actions.crud(
        action="read",
        model=models.Enemy,
        query={
            "id": _id,
            "user_id": current_identity.id
        }
    )
    return jsonify(enemy), status


@enemy_methods.route("/enemies", methods=["POST"])
@jwt_required()
def add_enemy() -> tuple:
    data = request.json
    data["user_id"] = current_identity.id
    enemy, status = db_actions.crud(
        action="create",
        model=models.Enemy,
        data=data,
        params=["id"]
    )
    return jsonify(enemy), status


@enemy_methods.route("/enemies/<_id>", methods=["POST"])
@jwt_required()
def update_enemy(_id: int) -> tuple:
    data = request.json
    enemy, status = db_actions.crud(
        action="update",
        model=models.Enemy,
        query={
            "id": _id,
            "user_id": current_identity.id
        },
        data=data,
        params=["id"]
    )
    return jsonify(enemy), status


@enemy_methods.route("/enemies/<_id>", methods=["DELETE"])
@jwt_required()
def delete_enemy(_id: int) -> tuple:
    db_actions.crud(
        action="read",
        model=models.Enemy,
        query={
            "id": _id,
            "user_id": current_identity.id
        }
    )
    db_actions.crud(
        action="delete_many",
        model=models.BattleEnemy,
        query={
            "enemy_id": _id,
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
