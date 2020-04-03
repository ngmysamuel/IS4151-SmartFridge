import connexion
from connexion.resolver import RestyResolver
from flask_cors import CORS

app = connexion.App(__name__, specification_dir='./')
app.add_api('swagger.yml')
CORS(app.app)
#app.add_api('swaggerfulltest.yml')

@app.route('/')
def index():
	return 'Hello Who are you?'


# If we're running in stand alone mode, run the application
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
