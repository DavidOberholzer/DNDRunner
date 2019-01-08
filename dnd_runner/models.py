from datetime import datetime

from project.app import DB


class User(DB.Model):
    __tablename__ = "User"
    id = DB.Column(DB.Integer, primary_key=True)
    username = DB.Column(DB.VARCHAR(30), unique=True, nullable=False)
    password = DB.Column(DB.CHAR(32), nullable=False)
    email = DB.Column(DB.VARCHAR(50), unique=True, nullable=True)
    created_at = DB.Column(DB.DateTime, default=datetime.utcnow(), nullable=False)
    updated_at = DB.Column(
        DB.DateTime,
        default=datetime.utcnow(),
        onupdate=datetime.utcnow(),
        nullable=False
    )

    def __repr__(self):
        return f"<User({self.username})>"


class Campaign(DB.Model):
    __tablename__ = "Campaign"
    id = DB.Column(DB.Integer, primary_key=True)
    user_id = DB.Column(DB.Integer, DB.ForeignKey("User.id"), nullable=False)
    name = DB.Column(DB.VARCHAR(30), unique=True, index=True, nullable=False)
    description = DB.Column(DB.VARCHAR(500), nullable=True)
    time_of_day = DB.Column(DB.Time, nullable=False)
    day = DB.Column(DB.Integer, default=1, nullable=False)
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
    user_id = DB.Column(DB.Integer, DB.ForeignKey("User.id"), nullable=False)
    name = DB.Column(DB.VARCHAR(30), unique=True, index=True, nullable=False)
    experience = DB.Column(DB.Integer, default=0, nullable=False)
    level = DB.Column(DB.Integer, default=1, nullable=False)
    avatar = DB.Column(DB.VARCHAR(50), nullable=True)
    health = DB.Column(DB.Integer, nullable=False)
    current_health = DB.Column(DB.Integer, nullable=False)
    carry_capacity = DB.Column(DB.Float, nullable=False)
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
    user_id = DB.Column(DB.Integer, DB.ForeignKey("User.id"), nullable=False)
    name = DB.Column(DB.VARCHAR(30), unique=True, index=True, nullable=False)
    weight = DB.Column(DB.Float, nullable=False)
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
    user_id = DB.Column(DB.Integer, DB.ForeignKey("User.id"), nullable=False)
    name = DB.Column(DB.VARCHAR(30), unique=True, index=True, nullable=False)
    level = DB.Column(DB.Integer, default=1, nullable=False)
    avatar = DB.Column(DB.VARCHAR(50), nullable=True)
    health = DB.Column(DB.Integer, nullable=True)
    current_health = DB.Column(DB.Integer, nullable=True)
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
    user_id = DB.Column(DB.Integer, DB.ForeignKey("User.id"), nullable=False)
    name = DB.Column(DB.VARCHAR(30), unique=True, index=True, nullable=False)
    description = DB.Column(DB.Text, nullable=True)
    experience = DB.Column(DB.Integer, default=0, nullable=True)
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
    campaign_id = DB.Column(DB.Integer, DB.ForeignKey("Campaign.id"), primary_key=True)
    battle_id = DB.Column(DB.Integer, DB.ForeignKey("Battle.id"), primary_key=True)
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
    amount = DB.Column(DB.Integer, default=1)
    created_at = DB.Column(DB.DateTime, default=datetime.utcnow(), nullable=False)
    updated_at = DB.Column(
        DB.DateTime,
        default=datetime.utcnow(),
        onupdate=datetime.utcnow(),
        nullable=False
    )

    def __repr__(self):
        return f"<PlayerItem({self.player_id}-{self.item_id})>"
