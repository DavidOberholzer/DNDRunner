from flask import Blueprint, jsonify, request

from dnd_runner import db_actions, models


campaign_methods = Blueprint("campaigns", __name__)


@campaign_methods.route("/campaigns", methods=["GET"])
def get_campaigns() -> tuple:
    campaigns, status = db_actions.crud(
        action="list",
        model=models.Campaign,
        query={
            **request.args
        }
    )
    return jsonify(campaigns), status


@campaign_methods.route("/campaigns/<_id>", methods=["GET"])
def get_campaign(_id: int) -> tuple:
    campaign, status = db_actions.crud(
        action="read",
        model=models.Campaign,
        query={
            "id": _id,
        }
    )
    return jsonify(campaign), status


@campaign_methods.route("/campaigns", methods=["POST"])
def add_campaign() -> tuple:
    data = request.json
    campaign, status = db_actions.crud(
        action="create",
        model=models.Campaign,
        data=data,
        params=["id"]
    )
    return jsonify(campaign), status


@campaign_methods.route("/campaigns/<_id>", methods=["POST"])
def update_campaign(_id: int) -> tuple:
    data = request.json
    campaign, status = db_actions.crud(
        action="update",
        model=models.Campaign,
        query={
            "id": _id
        },
        data=data,
        params=["id"]
    )
    return jsonify(campaign), status


@campaign_methods.route("/campaigns/<_id>", methods=["DELETE"])
def delete_campaign(_id: int) -> tuple:
    result, status = db_actions.crud(
        action="delete",
        model=models.Campaign,
        query={
            "id": _id,
        }
    )
    return jsonify(result), status
