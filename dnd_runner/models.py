from datetime import datetime

from project.app import DB


class Campaign(DB.Model):
    __tablename__ = "Campaign"
    id = DB.Column(DB.Integer, primary_key=True)
    name = DB.Column(DB.VARCHAR(30), unique=True, index=True, nullable=False)
    description = DB.Column(DB.VARCHAR(500), nullable=True)
    created_at = DB.Column(DB.DateTime, default=datetime.utcnow(), nullable=False)
    updated_at = DB.Column(
        DB.DateTime,
        default=datetime.utcnow(),
        onupdate=datetime.utcnow(),
        nullable=False
    )

    def __repr__(self):
        return f"<Campaign({self.name})>"


class Player(DB.Model):
    __tablename__ = "Player"
    id = DB.Column(DB.Integer, primary_key=True)
    name = DB.Column(DB.VARCHAR(30), unique=True, index=True, nullable=False)
    health = DB.Column(DB.Integer)
    carry_capacity = DB.Column(DB.Float)
    alive = DB.Column(DB.Boolean, default=True)
    created_at = DB.Column(DB.DateTime, default=datetime.utcnow(), nullable=False)
    updated_at = DB.Column(
        DB.DateTime,
        default=datetime.utcnow(),
        onupdate=datetime.utcnow(),
        nullable=False
    )

    def __repr__(self):
        return f"<Player({self.name})>"


class Item(DB.Model):
    __tablename__ = "Item"
    id = DB.Column(DB.Integer, primary_key=True)
    name = DB.Column(DB.VARCHAR(30), unique=True, index=True, nullable=False)
    weight = DB.Column(DB.Float)
    created_at = DB.Column(DB.DateTime, default=datetime.utcnow(), nullable=False)
    updated_at = DB.Column(
        DB.DateTime,
        default=datetime.utcnow(),
        onupdate=datetime.utcnow(),
        nullable=False
    )

    def __repr__(self):
        return f"<Item({self.name})>"


class Enemy(DB.Model):
    __tablename__ = "Enemy"
    id = DB.Column(DB.Integer, primary_key=True)
    name = DB.Column(DB.VARCHAR(30), unique=True, index=True, nullable=False)
    health = DB.Column(DB.Integer)
    alive = DB.Column(DB.Boolean, default=True)
    created_at = DB.Column(DB.DateTime, default=datetime.utcnow(), nullable=False)
    updated_at = DB.Column(
        DB.DateTime,
        default=datetime.utcnow(),
        onupdate=datetime.utcnow(),
        nullable=False
    )

    def __repr__(self):
        return f"<Enemy({self.name})>"


class Battle(DB.Model):
    __tablename__ = "Battle"
    id = DB.Column(DB.Integer, primary_key=True)
    name = DB.Column(DB.VARCHAR(30), unique=True, index=True, nullable=False)
    description = DB.Column(DB.Text, nullable=True)
    created_at = DB.Column(DB.DateTime, default=datetime.utcnow(), nullable=False)
    updated_at = DB.Column(
        DB.DateTime,
        default=datetime.utcnow(),
        onupdate=datetime.utcnow(),
        nullable=False
    )

    def __repr__(self):
        return f"<Battle({self.name})>"


class BattleEnemy(DB.Model):
    __tablename__ = "BattleEnemy"
    battle_id = DB.Column(DB.Integer, DB.ForeignKey("Battle.id"), primary_key=True)
    enemy_id = DB.Column(DB.Integer, DB.ForeignKey("Enemy.id"), primary_key=True)
    created_at = DB.Column(DB.DateTime, default=datetime.utcnow(), nullable=False)
    updated_at = DB.Column(
        DB.DateTime,
        default=datetime.utcnow(),
        onupdate=datetime.utcnow(),
        nullable=False
    )

    def __repr__(self):
        return f"<BattleEnemy({self.battle_id}-{self.enemy_id})>"


class CampaignBattle(DB.Model):
    __tablename__ = "CampaignBattle"
    campaign_id = DB.Column(DB.Integer, DB.ForeignKey("Battle.id"), primary_key=True)
    battle_id = DB.Column(DB.Integer, DB.ForeignKey("Enemy.id"), primary_key=True)
    created_at = DB.Column(DB.DateTime, default=datetime.utcnow(), nullable=False)
    updated_at = DB.Column(
        DB.DateTime,
        default=datetime.utcnow(),
        onupdate=datetime.utcnow(),
        nullable=False
    )

    def __repr__(self):
        return f"<CampaignBattle({self.campaign_id}-{self.battle_id})>"


class CampaignPlayer(DB.Model):
    __tablename__ = "CampaignPlayer"
    campaign_id = DB.Column(DB.Integer, DB.ForeignKey("Campaign.id"), primary_key=True)
    player_id = DB.Column(DB.Integer, DB.ForeignKey("Player.id"), primary_key=True)
    created_at = DB.Column(DB.DateTime, default=datetime.utcnow(), nullable=False)
    updated_at = DB.Column(
        DB.DateTime,
        default=datetime.utcnow(),
        onupdate=datetime.utcnow(),
        nullable=False
    )

    def __repr__(self):
        return f"<CampaignPlayer({self.campaign_id}-{self.player_id})>"


class PlayerItem(DB.Model):
    __tablename__ = "PlayerItem"
    player_id = DB.Column(DB.Integer, DB.ForeignKey("Player.id"), primary_key=True)
    item_id = DB.Column(DB.Integer, DB.ForeignKey("Item.id"), primary_key=True)
    created_at = DB.Column(DB.DateTime, default=datetime.utcnow(), nullable=False)
    updated_at = DB.Column(
        DB.DateTime,
        default=datetime.utcnow(),
        onupdate=datetime.utcnow(),
        nullable=False
    )

    def __repr__(self):
        return f"<PlayerItem({self.player_id}-{self.item_id})>"
