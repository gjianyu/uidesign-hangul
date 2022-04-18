from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
from flask import redirect
app = Flask(__name__)

# DATA
alphabet = [
    {
        "id": 1,
        "hangul": "ㄱ",
        "letter_details": "consonant",
        "pronunciation": "g",
        "english_word": "gun",
        "image": "",
        "audio_id": 1,
        "audio": ""
    },
    {
        "id": 2,
        "hangul": "ㄴ",
        "letter_details": "consonant",
        "pronunciation": "n",
        "english_word": "nose",
        "image": "",
        "audio_id": 2,
        "audio": ""
    },
    {
        "id": 3,
        "hangul": "ㅂ",
        "letter_details": "consonant",
        "pronunciation": "b",
        "english_word": "bed",
        "image": "",
        "audio_id": 3,
        "audio": ""
    },
    {
        "id": 4,
        "hangul": "ㅅ",
        "letter_details": "consonant",
        "pronunciation": "s",
        "english_word": "slide",
        "image": "",
        "audio_id": 4,
        "audio": ""
    },
    {
        "id": 5,
        "hangul": "ㅎ",
        "letter_details": "consonant",
        "pronunciation": "h",
        "english_word": "hat",
        "image": "",
        "audio_id": 5,
        "audio": ""
    },
    {
        "id": 6,
        "hangul": "ㅏ",
        "letter_details": "consonant",
        "pronunciation": "ah",
        "english_word": "diploma",
        "image": "",
        "audio_id": 6,
        "audio": ""
    },
]
syllables = [
    {
        "id": 1,
        "hangul": "가",
        "pronunciation": "gah",
        "definition": "to go",
        "audio_id": 7,
        "audio": ""
    },
    {
        "id": 2,
        "hangul": "간",
        "pronunciation": "gan",
        "definition": "liver",
        "audio_id": 8,
        "audio": ""
    },
    {
        "id": 3,
        "hangul": "나",
        "pronunciation": "nah",
        "definition": "me",
        "audio_id": 9,
        "audio": ""
    },
    {
        "id": 4,
        "hangul": "난",
        "pronunciation": "nan",
        "definition": "I am... (in shortened form)",
        "audio_id": 10,
        "audio": ""
    },
    {
        "id": 5,
        "hangul": "바",
        "pronunciation": "bah",
        "definition": "NO_MEANING",
        "audio_id": 11,
        "audio": ""
    },
    {
        "id": 6,
        "hangul": "밥",
        "pronunciation": "bab",
        "definition": "rice, or food",
        "audio_id": 12,
        "audio": ""
    },
    {
        "id": 7,
        "hangul": "반",
        "pronunciation": "ban",
        "definition": "class, or half",
        "audio_id": 13,
        "audio": ""
    },
    {
        "id": 8,
        "hangul": "사",
        "pronunciation": "sah",
        "definition": "to buy",
        "audio_id": 14,
        "audio": ""
    },
    {
        "id": 9,
        "hangul": "산",
        "pronunciation": "san",
        "definition": "mountain",
        "audio_id": 15,
        "audio": ""
    },
    {
        "id": 10,
        "hangul": "삽",
        "pronunciation": "sap",
        "definition": "shovel",
        "audio_id": 16,
        "audio": ""
    },
    {
        "id": 11,
        "hangul": "하",
        "pronunciation": "ha",
        "definition": "NO_MEANING",
        "audio_id": 17,
        "audio": ""
    },
    {
        "id": 12,
        "hangul": "한",
        "pronunciation": "han",
        "definition": "an internalized feeling of anger, sorrow and resentment stemming from centuries of oppression and suffering, in a way that is uniquely Korean",
        "audio_id": 18,
        "audio": ""
    }
]
vocabulary = [
    {
        "id": 1,
        "hangul": "가",
        "pronunciation": "ga",
        "definition": "to go",
        "image": "",
        "audio_id": 7,
        "audio": ""
    },
    {
        "id": 2,
        "hangul": "간",
        "pronunciation": "gan",
        "definition": "liver",
        "image": "",
        "audio_id": 8,
        "audio": ""
    },
    {
        "id": 3,
        "hangul": "나",
        "pronunciation": "na",
        "definition": "me",
        "image": "",
        "audio_id": 9,
        "audio": ""
    },
    {
        "id": 4,
        "hangul": "바나나",
        "pronunciation": "banana",
        "definition": "banana",
        "image": "",
        "audio_id": 19,
        "audio": ""
    },
    {
        "id": 5,
        "hangul": "박사",
        "pronunciation": "baksa",
        "definition": "professor",
        "image": "",
        "audio_id": 20,
        "audio": ""
    },
    {
        "id": 6,
        "hangul": "산",
        "pronunciation": "san",
        "definition": "mountain",
        "image": "",
        "audio_id": 15,
        "audio": ""
    },
    {
        "id": 7,
        "hangul": "하하하",
        "pronunciation": "hahaha",
        "english_word": "",
        "definition": "the sound of laughter (onomatopoeia)",
        "image": "",
        "audio_id": 21,
        "audio": ""
    }
]

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