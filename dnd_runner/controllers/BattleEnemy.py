from flask import Blueprint, jsonify, request

from dnd_runner import db_actions, models


battle_enemy_methods = Blueprint("battle_enemies", __name__)


@battle_enemy_methods.route("/battle-enemies", methods=["GET"])
def get_battle_enemies() -> dict:
    battle_enemies = db_actions.crud(
        action="list",
        model=models.BattleEnemy,
        query={
            **request.args
        }
    )
    return jsonify(battle_enemies)


@battle_enemy_methods.route("/battle-enemies/<battle_id>/<enemy_id>", methods=["GET"])
def get_battle_enemy(battle_id: int, enemy_id: int) -> dict:
    battle_enemy = db_actions.crud(
        action="read",
        model=models.BattleEnemy,
        query={
            "battle_id": battle_id,
            "enemy_id": enemy_id
        }
    )
    return jsonify(battle_enemy)


@battle_enemy_methods.route("/battle-enemies", methods=["POST"])
def add_battle_enemy() -> dict:
    data = request.json
    battle_enemy = db_actions.crud(
        action="create",
        model=models.BattleEnemy,
        data=data
    )
    return jsonify(battle_enemy)


@battle_enemy_methods.route("/battle-enemies/<battle_id>/<enemy_id>", methods=["POST"])
def update_battle_enemy(battle_id: int, enemy_id: int) -> dict:
    data = request.json
    battle_enemy = db_actions.crud(
        action="update",
        model=models.BattleEnemy,
        query={
            "battle_id": battle_id,
            "enemy_id": enemy_id
        },
        data=data
    )
    return jsonify(battle_enemy)


@battle_enemy_methods.route("/battle-enemies/<battle_id>/<enemy_id>", methods=["DELETE"])
def delete_battle_enemy(battle_id: int, enemy_id: int) -> dict:
    result = db_actions.crud(
        action="delete",
        model=models.BattleEnemy,
        query={
            "battle_id": battle_id,
            "enemy_id": enemy_id
        }
    )
    return jsonify(result)
