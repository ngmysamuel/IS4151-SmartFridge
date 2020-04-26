import connexion
from flask_cors import CORS

app = connexion.App(__name__, specification_dir='./')
# set CORS header for all clients
CORS(app.app)
app.add_api('objdet_raspi_restapi.yml')


@app.route('/')
def index():
    """
    publish the latest trackers information on a web page for the local
    Peacekeepers in the District to monitor
    """
    return "go to python3 static http server for the react dashboard"


# If we're running in stand alone mode, run the application
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=55590, debug=True)
