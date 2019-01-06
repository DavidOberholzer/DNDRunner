import os

from flask import Blueprint, flash, jsonify, request
from werkzeug.utils import secure_filename

from dnd_runner import db_actions, models
from project import settings

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


@utility_methods.route("/upload-image", methods=["POST"])
def upload_file():
    status = 500
    response = {}
    if "file" not in request.files:
        flash("No file part")
        status = 400
        response = {"message": "No file part"}
    file = request.files["file"]
    # if user does not select file, browser also
    # submit an empty part without filename
    if file.filename == '':
        flash("No selected file")
        status = 400
        response = {"message": "No selected file"}
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(settings.UPLOAD_FOLDER, filename))
        status = 200
        response = {"message": "File Uploaded"}
    return jsonify(response), status


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in settings.ALLOWED_EXTENSIONS


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
