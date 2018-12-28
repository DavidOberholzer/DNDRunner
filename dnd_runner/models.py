from project.app import DB

from sqlalchemy import types
from sqlalchemy.sql import expression


class UTCNow(expression.FunctionElement):
    type = types.DateTime()


class Campaign(DB.Model):
    id = DB.Column(DB.Integer, primary_key=True)
    name = DB.Column(DB.VARCHAR(30), unique=True, index=True, nullable=False)
    description = DB.Column(DB.Text, nullable=True)
    created_at = DB.Column(DB.DateTime, default=UTCNow(), nullable=False)
    updated_at = DB.Column(
        DB.DateTime,
        default=UTCNow(),
        onupdate=UTCNow(),
        nullable=False
    )

    def __repr__(self):
        return f"<Campaign({self.name})>"


class Player(DB.Model):
    id = DB.Column(DB.Integer, primary_key=True)
    name = DB.Column(DB.VARCHAR(30), unique=True, index=True, nullable=False)
    health = DB.Column(DB.Integer)
    carry_capacity = DB.Column(DB.Float)
    alive = DB.Column(DB.Boolean, default=True)
    created_at = DB.Column(DB.DateTime, default=UTCNow(), nullable=False)
    updated_at = DB.Column(
        DB.DateTime,
        default=UTCNow(),
        onupdate=UTCNow(),
        nullable=False
    )

    def __repr__(self):
        return f"<Player({self.name})>"


class Item(DB.Model):
    id = DB.Column(DB.Integer, primary_key=True)
    name = DB.Column(DB.VARCHAR(30), unique=True, index=True, nullable=False)
    weight = DB.Column(DB.Float)
    created_at = DB.Column(DB.DateTime, default=UTCNow(), nullable=False)
    updated_at = DB.Column(
        DB.DateTime,
        default=UTCNow(),
        onupdate=UTCNow(),
        nullable=False
    )

    def __repr__(self):
        return f"<Item({self.name})>"


class Enemy(DB.Model):
    id = DB.Column(DB.Integer, primary_key=True)
    name = DB.Column(DB.VARCHAR(30), unique=True, index=True, nullable=False)
    health = DB.Column(DB.Integer)
    alive = DB.Column(DB.Boolean, default=True)
    created_at = DB.Column(DB.DateTime, default=UTCNow(), nullable=False)
    updated_at = DB.Column(
        DB.DateTime,
        default=UTCNow(),
        onupdate=UTCNow(),
        nullable=False
    )

    def __repr__(self):
        return f"<Enemy({self.name})>"


class Battle(DB.Model):
    id = DB.Column(DB.Integer, primary_key=True)
    name = DB.Column(DB.VARCHAR(30), unique=True, index=True, nullable=False)
    description = DB.Column(DB.Text, nullable=True)
    created_at = DB.Column(DB.DateTime, default=UTCNow(), nullable=False)
    updated_at = DB.Column(
        DB.DateTime,
        default=UTCNow(),
        onupdate=UTCNow(),
        nullable=False
    )

    def __repr__(self):
        return f"<Battle({self.name})>"


class BattleEnemy(DB.Model):
    battle_id = DB.Column(DB.Integer, DB.ForeignKey("battle.id"), primary_key=True)
    enemy_id = DB.Column(DB.Integer, DB.ForeignKey("enemy.id"), primary_key=True)
    created_at = DB.Column(DB.DateTime, default=UTCNow(), nullable=False)
    updated_at = DB.Column(
        DB.DateTime,
        default=UTCNow(),
        onupdate=UTCNow(),
        nullable=False
    )

    def __repr__(self):
        return f"<BattleEnemy({self.battle_id}-{self.enemy_id})>"


class CampaignBattle(DB.Model):
    campaign_id = DB.Column(DB.Integer, DB.ForeignKey("battle.id"), primary_key=True)
    battle_id = DB.Column(DB.Integer, DB.ForeignKey("enemy.id"), primary_key=True)
    created_at = DB.Column(DB.DateTime, default=UTCNow(), nullable=False)
    updated_at = DB.Column(
        DB.DateTime,
        default=UTCNow(),
        onupdate=UTCNow(),
        nullable=False
    )

    def __repr__(self):
        return f"<CampaignBattle({self.campaign_id}-{self.battle_id})>"


class CampaignPlayer(DB.Model):
    campaign_id = DB.Column(DB.Integer, DB.ForeignKey("campaign.id"), primary_key=True)
    player_id = DB.Column(DB.Integer, DB.ForeignKey("player.id"), primary_key=True)
    created_at = DB.Column(DB.DateTime, default=UTCNow(), nullable=False)
    updated_at = DB.Column(
        DB.DateTime,
        default=UTCNow(),
        onupdate=UTCNow(),
        nullable=False
    )

    def __repr__(self):
        return f"<CampaignPlayer({self.campaign_id}-{self.player_id})>"


class PlayerItem(DB.Model):
    player_id = DB.Column(DB.Integer, DB.ForeignKey("player.id"), primary_key=True)
    item_id = DB.Column(DB.Integer, DB.ForeignKey("item.id"), primary_key=True)
    created_at = DB.Column(DB.DateTime, default=UTCNow(), nullable=False)
    updated_at = DB.Column(
        DB.DateTime,
        default=UTCNow(),
        onupdate=UTCNow(),
        nullable=False
    )

    def __repr__(self):
        return f"<PlayerItem({self.player_id}-{self.item_id})>"
