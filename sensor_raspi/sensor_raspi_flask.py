import connexion
from connexion.resolver import RestyResolver
from flask_cors import CORS
from flask import render_template
import sqlite3

app = connexion.App(__name__, specification_dir='./')
app.add_api('sensor_raspi_restapi.yml')
CORS(app.app)
#app.add_api('swaggerfulltest.yml')

@app.route('/')
def index():
    conn = sqlite3.connect('sensor_data')
    c = conn.cursor()
    sql = 'SELECT door_open, timestamp FROM door ORDER BY timestamp DESC LIMIT 10;'
    c.execute(sql)
    results = c.fetchall()
    
    html = '<html><head><title>Edge/Fog Processor</title></head><body><h1>Door Status</h1><table cellspacing="1" cellpadding="3" border="1"><tr><th>Door Status</th><th>Timestamp</th></tr>'
    for result in results:
        
        if result[0] == 0:
            door_status = 'CLOSE'
        else:
            door_status = 'OPEN'
        html += '<tr><td>' + door_status + '</td><td>' + str(result[1]) + '</td></tr>'
    
    html += '</table>'
    html += '</br>'
    
    sql = 'SELECT temperature, timestamp FROM temperature ORDER BY timestamp DESC LIMIT 10;'
    c.execute(sql)
    results = c.fetchall()
    
    html += '<h1>Temperature</h1><table cellspacing="1" cellpadding="3" border="1"><tr><th>Temperature</th><th>Timestamp</th></tr>'
    for result in results:
                
        html += '<tr><td>' + str(result[0]) + '</td><td>' + str(result[1]) + '</td></tr>'
    
    html += '</table>'
    html += '</body></html>'
    
    conn.close()
    
    return html


# If we're running in stand alone mode, run the application
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
