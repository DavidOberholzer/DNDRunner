from flask import Blueprint, jsonify

from dnd_runner import db_actions, models

utility_methods = Blueprint("utility", __name__)


@utility_methods.route("/items-of-player/<_id>")
def items_of_player(_id: int) -> tuple:
    items, status = db_actions.crud(
        action="list",
        model=models.PlayerItem,
        query={
            "player_id": _id
        }
    )
    if status == 200:
        items, status = db_actions.crud(
            action="list",
            model=models.Item,
            query={
                "ids": [item["item_id"] for item in items]
            }
        )
    return jsonify(items), status


@utility_methods.route("/players-in-campaign/<_id>")
def players_in_campaign(_id: int) -> tuple:
    players, status = db_actions.crud(
        action="list",
        model=models.CampaignPlayer,
        query={
            "campaign_id": _id
        }
    )
    if status == 200:
        players, status = db_actions.crud(
            action="list",
            model=models.Player,
            query={
                "ids": [player["player_id"] for player in players]
            }
        )
        filled_players = []
        for player in players:
            filled_players.append(fill_items(player))
    return jsonify(players), status


@utility_methods.route("/battles-in-campaign/<_id>")
def battles_in_campaign(_id: int) -> tuple:
    battles, status = db_actions.crud(
        action="list",
        model=models.CampaignBattle,
        query={
            "campaign_id": _id
        }
    )
    if status == 200:
        battles, status = db_actions.crud(
            action="list",
            model=models.Battle,
            query={
                "ids": [battle["battle_id"] for battle in battles]
            }
        )
    return jsonify(battles), status


@utility_methods.route("/enemies-in-battle/<_id>")
def enemies_in_battle(_id: int) -> tuple:
    enemies, status = db_actions.crud(
        action="list",
        model=models.BattleEnemy,
        query={
            "battle_id": _id
        }
    )
    if status == 200:
        enemies, status = db_actions.crud(
            action="list",
            model=models.Enemy,
            query={
                "ids": [enemy["enemy_id"] for enemy in enemies]
            }
        )
    return jsonify(enemies), status


def fill_items(player: dict) -> dict:
    player_items, status = db_actions.crud(
        action="list",
        model=models.PlayerItem,
        query={
            "player_id": player["id"]
        }
    )
    amounts = {x["item_id"]: x["amount"] for x in player_items}
    items, status = db_actions.crud(
        action="list",
        model=models.Item,
        query={
            "ids": [player_item["item_id"] for player_item in player_items]
        }
    )
    final_items = []
    for item in items:
        item["amount"] = amounts[item["id"]]
        final_items.append(item)
    player["items"] = final_items
    return player
