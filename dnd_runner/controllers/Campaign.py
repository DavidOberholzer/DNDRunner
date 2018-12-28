from flask import Blueprint, jsonify, request

from dnd_runner import db_actions, models


campaign_methods = Blueprint("campaigns", __name__)


@campaign_methods.route("/campaigns", methods=["GET"])
def get_campaigns() -> dict:
    campaigns = db_actions.crud(
        action="list",
        model=models.Campaign,
        query={
            **request.args
        }
    )
    return jsonify(campaigns)


@campaign_methods.route("/campaigns/<_id>", methods=["GET"])
def get_campaign(_id: int) -> dict:
    campaign = db_actions.crud(
        action="read",
        model=models.Campaign,
        query={
            "id": _id,
        }
    )
    return jsonify(campaign)


@campaign_methods.route("/campaigns", methods=["POST"])
def add_campaign() -> dict:
    data = request.json
    campaign = db_actions.crud(
        action="create",
        model=models.Campaign,
        data=data
    )
    return jsonify(campaign)


@campaign_methods.route("/campaigns/<_id>", methods=["POST"])
def update_campaign(_id: int) -> dict:
    data = request.json
    campaign = db_actions.crud(
        action="update",
        model=models.Campaign,
        query={
            "id": _id,
        },
        data=data
    )
    return jsonify(campaign)


@campaign_methods.route("/campaigns/<_id>", methods=["DELETE"])
def delete_campaign(_id: int) -> dict:
    result = db_actions.crud(
        action="delete",
        model=models.Campaign,
        query={
            "id": _id,
        }
    )
    return jsonify(result)
