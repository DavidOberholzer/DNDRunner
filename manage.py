# All the imports and setup for migrations. flask_script allows for other
# management commands to be run or integrated.
if __name__ == "__main__":
    from flask_migrate import Migrate, MigrateCommand
    from flask_script import Manager

    from project.app import App, DB
    # We _have_ to import models here. If not, the migrations will
    # think that all tables have been dropped.
    import dnd_runner.models  # Do not remove

    MIGRATE = Migrate(App, DB)

    manager = Manager(App)
    manager.add_command("db", MigrateCommand)

    manager.run()
