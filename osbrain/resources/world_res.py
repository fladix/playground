from flask import jsonify, request
from flask.views import MethodView
from noaah.world import World


class WorldRes(MethodView):
    
    def get(self):
        if not World.get_name(): return {'msg': 'Welcome to Emptiness'}, 404
        msg = f'Welcome to {World.get_name()}!'
        return jsonify({'msg': msg}), 200
    
    def put(self):
        http_code = 201 if not World.get_name() else 200
        data = request.get_json()
        World(data['name'])
        msg = f'Welcome to {data["name"]}!'
        return jsonify({'msg': msg}), http_code

    def delete(self):
        name = World.get_name()
        if not name: return {'msg': 'Nothing to destroy here'}, 404  
        World.destroy_world()
        msg = f'{name} was destroyed!'
        return jsonify({'msg': msg}), 200