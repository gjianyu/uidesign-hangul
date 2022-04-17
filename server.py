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

@app.route('/learn/letter/<int:id>')
def learn_letter(id):
    global data
    return render_template('learn_letter.html', id=id)

@app.route('/learn/syllable/<int:id>')
def learn_syllable(id):
    global data
    return render_template('learn_syllable.html', id=id)

@app.route('/quiz/letter/<int:id>')
def quiz_letter(id):
    global data
    return render_template('quiz_letter.html', id=id)

@app.route('/quiz/syllable/<int:id>')
def quiz_syllable(id):
    global data
    return render_template('quiz_syllable.html', id=id)

# RUN / DEBUG

if __name__ == '__main__':
   app.run(debug = True)