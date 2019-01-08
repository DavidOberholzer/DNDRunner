import datetime

from sqlalchemy.exc import IntegrityError
from project.app import DB

CRUD = ["create", "read", "update", "delete", "delete_many", "list"]


class DBActions:

    @staticmethod
    def to_dict(instance: DB.Model) -> dict:
        instance = instance.__dict__
        try:
            instance.pop("_sa_instance_state")
        except KeyError:
            pass
        for key, value in instance.items():
            if isinstance(value, datetime.time):
                instance[key] = value.isoformat()
        return instance

    def list(self, model: DB.Model, **kwargs) -> list:
        query = DB.session.query(model)
        if "ids" in kwargs["query"]:
            ids = kwargs["query"]["ids"]
            group = query.filter(model.id.in_(ids))
        else:
            group = query.filter_by(**kwargs["query"]).all()
        results = []

        for item in group:
            results.append(self.to_dict(item))

        return results

    def read(self, model: DB.Model, **kwargs) -> dict:
        result = DB.session.query(model).filter_by(**kwargs["query"]).first_or_404()
        if (kwargs["params"] or {}).get("dict", True):
            return self.to_dict(result)
        else:
            return result

    def create(self, model: DB.Model, **kwargs) -> dict:
        instance = model(**kwargs["data"])
        DB.session.add(instance)
        DB.session.commit()
        query = {param: getattr(instance, param) for param in kwargs["params"]}
        return self.read(model, query=query, params=None)

    def update(self, model: DB.Model, **kwargs) -> dict:
        instance = model.query.filter_by(**kwargs["query"]).first_or_404()
        for key, value in kwargs["data"].items():
            setattr(instance, key, value)
        DB.session.commit()
        query = {param: getattr(instance, param) for param in kwargs["params"]}
        return self.read(model, query=query, params=None)

    @staticmethod
    def delete(model: DB.Model, **kwargs) -> dict:
        query = model.query.filter_by(**kwargs["query"])
        if (kwargs["params"] or {}).get("error", True):
            instance = query.first_or_404()
        else:
            instance = query.first()
        if instance:
            DB.session.delete(instance)
            DB.session.commit()
        return {"success": True}

    @staticmethod
    def delete_many(model: DB.Model, **kwargs) -> dict:
        query = DB.session.query(model)
        if "ids" in kwargs["query"]:
            field = kwargs["query"]["ids"]["field"]
            ids = kwargs["query"]["ids"]["values"]
            query.filter(getattr(model, field).in_(ids)).delete()
        else:
            query.filter_by(**kwargs["query"]).delete()
        DB.session.commit()
        return {"success": True}


runner = DBActions()


def crud(action: str, model: DB.Model, query=None, data=None, params=None) -> tuple:
    if action in CRUD:
        try:
            status = 200
            result = getattr(runner, action)(
                model=model,
                query=query,
                data=data,
                params=params
            )
        except IntegrityError as e:
            status = 400
            result = {
                "message": e._message()
            }
        return result, status
    else:
        raise Exception("Not a crud action")
