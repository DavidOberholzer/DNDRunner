from flask import Blueprint, jsonify, request

from dnd_runner import db_actions, models

battle_enemy_methods = Blueprint("battle_enemies", __name__)


@battle_enemy_methods.route("/battle-enemies", methods=["GET"])
def get_battle_enemies() -> tuple:
    battle_enemies, status = db_actions.crud(
        action="list",
        model=models.BattleEnemy,
        query={
            **request.args
        }
    )
    return jsonify(battle_enemies), status


@battle_enemy_methods.route("/battle-enemies/<battle_id>/<enemy_id>", methods=["GET"])
def get_battle_enemy(battle_id: int, enemy_id: int) -> tuple:
    battle_enemy, status = db_actions.crud(
        action="read",
        model=models.BattleEnemy,
        query={
            "battle_id": battle_id,
            "enemy_id": enemy_id
        }
    )
    return jsonify(battle_enemy), status


@battle_enemy_methods.route("/battle-enemies", methods=["POST"])
def add_battle_enemy() -> tuple:
    data = request.json
    battle_enemy, status = db_actions.crud(
        action="create",
        model=models.BattleEnemy,
        data=data,
        params=["battle_id", "enemy_id"]
    )
    return jsonify(battle_enemy), status


@battle_enemy_methods.route("/battle-enemies/<battle_id>/<enemy_id>", methods=["POST"])
def update_battle_enemy(battle_id: int, enemy_id: int) -> tuple:
    data = request.json
    battle_enemy, status = db_actions.crud(
        action="update",
        model=models.BattleEnemy,
        query={
            "battle_id": battle_id,
            "enemy_id": enemy_id
        },
        data=data,
        params=["battle_id", "enemy_id"]
    )
    return jsonify(battle_enemy), status


@battle_enemy_methods.route("/battle-enemies/<battle_id>/<enemy_id>", methods=["DELETE"])
def delete_battle_enemy(battle_id: int, enemy_id: int) -> tuple:
    result, status = db_actions.crud(
        action="delete",
        model=models.BattleEnemy,
        query={
            "battle_id": battle_id,
            "enemy_id": enemy_id
        }
    )
    return jsonify(result), status
