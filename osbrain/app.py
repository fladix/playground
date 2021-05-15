import os
from flask import Flask
from resources.agent_res import AgentRes
from resources.world_res import WorldRes
from resources.cases_res import PushPullRes

"""
Attention:
    Cloud Run local emulation does not work with Buildpacks for osBrain. 
    We had to set up the build with Docker -> No live-reload :(
"""

# pylint: disable=C0103
app = Flask(__name__)

app.add_url_rule('/osbrain/world', view_func=WorldRes.as_view('world_res'))
app.add_url_rule('/osbrain/cases/pushpull', view_func=PushPullRes.as_view('pushpull_res'))
app.add_url_rule('/osbrain/agent/<string:agent_id>', view_func=AgentRes.as_view('agent_res'))


if __name__ == '__main__':

    # API spin-up
    server_port = os.environ.get('PORT', '8080')
    app.run(debug=True, port=server_port, host='0.0.0.0')