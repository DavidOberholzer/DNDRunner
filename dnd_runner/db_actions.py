from project.app import DB

CRUD = ["create", "read", "update", "delete", "list"]


class DBActions:

    @staticmethod
    def to_dict(instance: DB.Model) -> dict:
        instance = instance.__dict__
        try:
            instance.pop("_sa_instance_state")
        except KeyError:
            pass
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
        return self.to_dict(result)

    def create(self, model: DB.Model, **kwargs) -> dict:
        instance = model(**kwargs["data"])
        DB.session.add(instance)
        DB.session.commit()
        return self.to_dict(instance)

    def update(self, model: DB.Model, **kwargs) -> dict:
        instance = model.query.filter_by(**kwargs["query"]).first_or_404()
        for key, value in kwargs["data"].items():
            setattr(instance, key, value)
        result = self.to_dict(instance)
        DB.session.commit()
        return result

    @staticmethod
    def delete(model: DB.Model, **kwargs) -> dict:
        instance = model.query.filter_by(**kwargs["query"]).first_or_404()
        DB.session.delete(instance)
        DB.session.commit()
        return {"success": True}


runner = DBActions()


def crud(action: str, model: DB.Model, query=None, data=None) -> dict:
    if action in CRUD:
        return getattr(runner, action)(
            model=model,
            query=query,
            data=data
        )
    else:
        raise Exception("Not a crud action")
