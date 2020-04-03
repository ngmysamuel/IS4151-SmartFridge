# Smart Fridge Repo README

## Important notes on setting up
1. fork this repo and do pull requests, we can code review the updates together
2. open issues and have code related communications on github

## React Frontend

`cd web_dashboard` directory, do `yarn install` to init the react app, followed by `yarn start`, go to port 65432 and preview the development.


## Main Server REST API
In addition to all the commands Dr Tan mentioned in the lecture 8, you'll need to run the following:
<br>
<br>
pip install mysqlclient 
<br>
pip install Flask-Cors 
<br>
<br>
<br>
Use the commands Dr Tan gave to start the Flask server. 
<br>
cd into the IS-4151 folder for the react project.
<br>
run npm start
<br>
<br>
<br>
<strong>You'll need to configure data.py to connect to your own database. </strong>
<br>
If possible, create a table called "checkingaccount" with columns "CHECKINGACCOUNTID", "ACCOUNTNAME", "BALANCE". Else, will need to edit the code.
<br>
<br>
<br>
If it doesn't work, try:
<br>
pip install pymysql (3)
<br>
