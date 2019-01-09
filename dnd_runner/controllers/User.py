import hashlib

from flask import Blueprint, jsonify, request
from flask_jwt import jwt_required, current_identity

from dnd_runner import db_actions, models
from project import settings

user_methods = Blueprint("users", __name__)


@user_methods.route("/user", methods=["GET"])
@jwt_required()
def get_user() -> tuple:
    user, status = db_actions.crud(
        action="read",
        model=models.User,
        query={
            "id": current_identity.id,
        }
    )
    return jsonify(user), status


@user_methods.route("/users", methods=["POST"])
def add_user() -> tuple:
    data = request.json
    m = hashlib.md5(f"{data['password']}{settings.SALT}".encode("utf-8"))
    data["password"] = m.hexdigest()
    user, status = db_actions.crud(
        action="create",
        model=models.User,
        data=data,
        params=["id"]
    )
    return jsonify(user), status


@user_methods.route("/users/<_id>", methods=["POST"])
@jwt_required()
def update_user(_id: int) -> tuple:
    if int(_id) == current_identity.id:
        data = request.json
        if "password" in data:
            m = hashlib.md5(f"{data['password']}{settings.SALT}".encode("utf-8"))
            data["password"] = m.hexdigest()
        user, status = db_actions.crud(
            action="update",
            model=models.User,
            query={
                "id": _id,
            },
            data=data,
            params=["id"]
        )
        return jsonify(user), status
    else:
        return jsonify({"error": "Unauthorized"}), 401


@user_methods.route("/users/<_id>", methods=["DELETE"])
@jwt_required()
def delete_user(_id: int) -> tuple:
    if int(_id) == current_identity.id:
        # Remove User Campaigns and relations
        campaigns, status = db_actions.crud(
            action="list",
            model=models.Campaign,
            query={
                "user_id": _id
            }
        )
        ids = [campaign["id"] for campaign in campaigns]
        if ids:
            db_actions.crud(
                action="delete_many",
                model=models.CampaignBattle,
                query={
                    "ids": {
                        "field": "campaign_id",
                        "values": ids
                    }
                }
            )
            db_actions.crud(
                action="delete_many",
                model=models.CampaignPlayer,
                query={
                    "ids": {
                        "field": "campaign_id",
                        "values": ids
                    }
                }
            )
        # Remove User Battles and relations
        battles, status = db_actions.crud(
            action="list",
            model=models.Battle,
            query={
                "user_id": _id
            }
        )
        ids = [battle["id"] for battle in battles]
        if ids:
            db_actions.crud(
                action="delete_many",
                model=models.BattleEnemy,
                query={
                    "ids": {
                        "field": "battle_id",
                        "values": ids
                    }
                }
            )
        # Remove User Players and relations
        players, status = db_actions.crud(
            action="list",
            model=models.Player,
            query={
                "user_id": _id
            }
        )
        ids = [player["id"] for player in players]
        if ids:
            db_actions.crud(
                action="delete_many",
                model=models.PlayerItem,
                query={
                    "ids": {
                        "field": "player_id",
                        "values": ids
                    }
                }
            )
        # Remove User Enemies
        db_actions.crud(
            action="list",
            model=models.Enemy,
            query={
                "user_id": _id
            }
        )
        # Remove User Items
        db_actions.crud(
            action="list",
            model=models.Item,
            query={
                "user_id": _id
            }
        )
        # Remove User Finally
        result, status = db_actions.crud(
            action="delete",
            model=models.User,
            query={
                "id": _id,
            }
        )
        return jsonify(result), status
    else:
        return jsonify({"error": "Unauthorized"}), 401
