#!/usr/bin/env python3

from dnd_runner import methods
from project.app import App

if __name__ == "__main__":
    for method in dir(methods):
        if not method.startswith("__"):
            url = method.replace("_", "-")
            App.add_url_rule(f"/{url}", method, getattr(methods, method))
App.run(debug=True, port=8080)
