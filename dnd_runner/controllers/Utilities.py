import hashlib
import os

from flask import Blueprint, flash, jsonify, request, send_from_directory, Response
from flask_jwt import jwt_required, current_identity
from werkzeug.utils import secure_filename

from dnd_runner import db_actions, models
from project import settings

utility_methods = Blueprint("utility", __name__)


@utility_methods.route("/items-of-player/<_id>", methods=["GET"])
@jwt_required()
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


@utility_methods.route("/players-in-campaign/<_id>", methods=["GET"])
@jwt_required()
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


@utility_methods.route("/battles-in-campaign/<_id>", methods=["GET"])
@jwt_required()
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


@utility_methods.route("/enemies-in-battle/<_id>", methods=["GET"])
@jwt_required()
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


@utility_methods.route("/images/<filename>", methods=["GET"])
def image(filename: str) -> Response:
    path = os.getcwd() + settings.UPLOAD_FOLDER
    return send_from_directory(path, filename)


@utility_methods.route("/images", methods=["GET"])
@jwt_required()
def get_images() -> tuple:
    path = os.getcwd() + settings.UPLOAD_FOLDER
    only_files = [f for f in os.listdir(path) if
                  os.path.isfile(os.path.join(path, f))]
    return jsonify(only_files), 200


@utility_methods.route("/images", methods=["POST"])
@jwt_required()
def upload_image() -> tuple:
    status = 400
    response = {"message": "Invalid File Type"}
    if "file" not in request.files:
        flash("No file part")
        status = 400
        response = {"message": "No file part"}
    _file = request.files["file"]
    # if user does not select file, browser also
    # submit an empty part without filename
    if _file.filename == '':
        flash("No selected file")
        status = 400
        response = {"message": "No selected file"}
    if _file and allowed_file(_file.filename):
        filename = secure_filename(_file.filename)
        path = os.getcwd() + settings.UPLOAD_FOLDER + "/" + filename
        _file.save(path)
        status = 200
        response = {"message": "File Uploaded"}
    return jsonify(response), status


@utility_methods.route("/images/<_file>", methods=["DELETE"])
@jwt_required()
def delete_image(_file: str):
    path = os.getcwd() + settings.UPLOAD_FOLDER + "/" + _file
    response = {"message": "Success"}
    status = 200
    if os.path.exists(path):
        os.remove(path)
    else:
        response = {"message": "File Not Found"}
        status = 404

    return jsonify(response), status


def authenticate(username, password):
    m = hashlib.md5(f"{password}{settings.SALT}".encode("utf-8"))
    user, status = db_actions.crud(
        action="read",
        model=models.User,
        query={
            "username": username
        },
        params={
            "dict": False
        }
    )
    if user.password == m.hexdigest():
        return user


def identity(payload):
    user_id = payload['identity']
    user, status = db_actions.crud(
        action="read",
        model=models.User,
        query={
            "id": user_id
        },
        params={
            "dict": False
        }
    )
    return user


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
