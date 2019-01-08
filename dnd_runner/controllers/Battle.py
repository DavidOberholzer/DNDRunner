from flask import Blueprint, jsonify, request
from flask_jwt import jwt_required, current_identity

from dnd_runner import db_actions, models


battle_methods = Blueprint("battles", __name__)


@battle_methods.route("/battles", methods=["GET"])
@jwt_required()
def get_battles() -> tuple:
    battles, status = db_actions.crud(
        action="list",
        model=models.Battle,
        query={
            **request.args,
            "user_id": current_identity.id
        }
    )
    return jsonify(battles), status


@battle_methods.route("/battles/<_id>", methods=["GET"])
@jwt_required()
def get_battle(_id: int) -> tuple:
    battle, status = db_actions.crud(
        action="read",
        model=models.Battle,
        query={
            "id": _id,
            "user_id": current_identity.id
        }
    )
    return jsonify(battle), status


@battle_methods.route("/battles", methods=["POST"])
@jwt_required()
def add_battles() -> tuple:
    data = request.json
    data["user_id"] = current_identity.id
    battle, status = db_actions.crud(
        action="create",
        model=models.Battle,
        data=data,
        params=["id"]
    )
    return jsonify(battle), status


@battle_methods.route("/battles/<_id>", methods=["POST"])
@jwt_required()
def update_battles(_id: int) -> tuple:
    data = request.json
    battle, status = db_actions.crud(
        action="update",
        model=models.Battle,
        query={
            "id": _id,
            "user_id": current_identity.id
        },
        data=data,
        params=["id"]
    )
    return jsonify(battle), status


@battle_methods.route("/battles/<_id>", methods=["DELETE"])
@jwt_required()
def delete_battles(_id: int) -> dict:
    db_actions.crud(
        action="read",
        model=models.Battle,
        query={
            "id": _id,
            "user_id": current_identity.id
        }
    )
    db_actions.crud(
        action="delete_many",
        model=models.BattleEnemy,
        query={
            "battle_id": _id
        }
    )
    db_actions.crud(
        action="delete_many",
        model=models.CampaignBattle,
        query={
            "battle_id": _id
        }
    )
    result, status = db_actions.crud(
        action="delete",
        model=models.Battle,
        query={
            "id": _id,
        }
    )
    return jsonify(result)
