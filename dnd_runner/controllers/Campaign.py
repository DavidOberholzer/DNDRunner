from flask import Blueprint, jsonify, request
from flask_jwt import jwt_required, current_identity

from dnd_runner import db_actions, models


campaign_methods = Blueprint("campaigns", __name__)


@campaign_methods.route("/campaigns", methods=["GET"])
@jwt_required()
def get_campaigns() -> tuple:
    campaigns, status = db_actions.crud(
        action="list",
        model=models.Campaign,
        query={
            **request.args,
            "user_id": current_identity.id
        }
    )
    return jsonify(campaigns), status


@campaign_methods.route("/campaigns/<_id>", methods=["GET"])
@jwt_required()
def get_campaign(_id: int) -> tuple:
    campaign, status = db_actions.crud(
        action="read",
        model=models.Campaign,
        query={
            "id": _id,
            "user_id": current_identity.id
        }
    )
    return jsonify(campaign), status


@campaign_methods.route("/campaigns", methods=["POST"])
@jwt_required()
def add_campaign() -> tuple:
    data = request.json
    data["user_id"] = current_identity.id
    campaign, status = db_actions.crud(
        action="create",
        model=models.Campaign,
        data=data,
        params=["id"]
    )
    return jsonify(campaign), status


@campaign_methods.route("/campaigns/<_id>", methods=["POST"])
@jwt_required()
def update_campaign(_id: int) -> tuple:
    data = request.json
    campaign, status = db_actions.crud(
        action="update",
        model=models.Campaign,
        query={
            "id": _id,
            "user_id": current_identity.id
        },
        data=data,
        params=["id"]
    )
    return jsonify(campaign), status


@campaign_methods.route("/campaigns/<_id>", methods=["DELETE"])
@jwt_required()
def delete_campaign(_id: int) -> tuple:
    db_actions.crud(
        action="read",
        model=models.Campaign,
        query={
            "id": _id,
            "user_id": current_identity.id
        }
    )
    db_actions.crud(
        action="delete_many",
        model=models.CampaignPlayer,
        query={
            "campaign_id": _id,
        }
    )
    db_actions.crud(
        action="delete_many",
        model=models.CampaignBattle,
        query={
            "campaign_id": _id,
        }
    )
    result, status = db_actions.crud(
        action="delete",
        model=models.Campaign,
        query={
            "id": _id,
        }
    )
    return jsonify(result), status
