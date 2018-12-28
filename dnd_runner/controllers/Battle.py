from flask import Blueprint, jsonify, request

from dnd_runner import db_actions, models


battle_methods = Blueprint("battles", __name__)


@battle_methods.route("/battles", methods=["GET"])
def get_battles() -> dict:
    battles = db_actions.crud(
        action="list",
        model=models.Battle,
        query={
            **request.args
        }
    )
    return jsonify(battles)


@battle_methods.route("/battles/<_id>", methods=["GET"])
def get_battle(_id: int) -> dict:
    battle = db_actions.crud(
        action="read",
        model=models.Battle,
        query={
            "id": _id,
        }
    )
    return jsonify(battle)


@battle_methods.route("/battles", methods=["POST"])
def add_battles() -> dict:
    data = request.json
    battle = db_actions.crud(
        action="create",
        model=models.Battle,
        data=data
    )
    return jsonify(battle)


@battle_methods.route("/battles/<_id>", methods=["POST"])
def update_battles(_id: int) -> dict:
    data = request.json
    battle = db_actions.crud(
        action="update",
        model=models.Battle,
        query={
            "id": _id,
        },
        data=data
    )
    return jsonify(battle)


@battle_methods.route("/battles/<_id>", methods=["DELETE"])
def delete_battles(_id: int) -> dict:
    result = db_actions.crud(
        action="delete",
        model=models.Battle,
        query={
            "id": _id,
        }
    )
    return jsonify(result)
