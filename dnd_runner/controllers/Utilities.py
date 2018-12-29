from flask import Blueprint, jsonify

from dnd_runner import db_actions, models

utility_methods = Blueprint("utility", __name__)


@utility_methods.route("/items-of-player/<_id>")
def items_of_player(_id: int) -> dict:
    items = db_actions.crud(
        action="list",
        model=models.PlayerItem,
        query={
            "player_id": _id
        }
    )
    items = db_actions.crud(
        action="list",
        model=models.Item,
        query={
            "ids": [item["item_id"] for item in items]
        }
    )
    return jsonify(items)


@utility_methods.route("/players-in-campaign/<_id>")
def players_in_campaign(_id: int) -> dict:
    players = db_actions.crud(
        action="list",
        model=models.CampaignPlayer,
        query={
            "campaign_id": _id
        }
    )
    players = db_actions.crud(
        action="list",
        model=models.Player,
        query={
            "ids": [player["player_id"] for player in players]
        }
    )
    return jsonify(players)


@utility_methods.route("/battles-in-campaign/<_id>")
def battles_in_campaign(_id: int) -> dict:
    battles = db_actions.crud(
        action="list",
        model=models.CampaignBattle,
        query={
            "campaign_id": _id
        }
    )
    battles = db_actions.crud(
        action="list",
        model=models.Battle,
        query={
            "ids": [battle["battle_id"] for battle in battles]
        }
    )
    return jsonify(battles)


@utility_methods.route("/enemies-in-battle/<_id>")
def enemies_in_battle(_id: int) -> dict:
    enemies = db_actions.crud(
        action="list",
        model=models.BattleEnemy,
        query={
            "battle_id": _id
        }
    )
    enemies = db_actions.crud(
        action="list",
        model=models.Enemy,
        query={
            "ids": [enemy["enemy_id"] for enemy in enemies]
        }
    )
    return jsonify(enemies)