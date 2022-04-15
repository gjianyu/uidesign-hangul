from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
from flask import redirect
app = Flask(__name__)

# DATA

# ROUTES
@app.route('/')
def welcome():
    return render_template('welcome.html')

@app.route('/learn/<int:id>')
def learn(id):
    global data
    return render_template('learn.html', id=id)

@app.route('/quiz/<int:id>')
def quiz(id):
    global data
    return render_template('quiz.html', id=id)

# RUN / DEBUG

if __name__ == '__main__':
   app.run(debug = True)