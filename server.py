from functools import total_ordering
import json
import random
from email.mime import audio
from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
from flask import redirect
app = Flask(__name__)

# DATA
alphabet_quizzed = []
syllable_quizzed = []
vocab_quizzed = []
score = {"total": 0, "correct": 0}
alphabet = [
    {
        "id": 1,
        "end": "0",
        "hangul": "ㄱ",
        "letter_details": "consonant",
        "pronunciation": "g",
        "english_word": "gun",
        "image": "https://www.clipartkey.com/mpngs/m/7-73298_cartoon-gun-clipart-transparent-background-gun-clipart.png",
        "audio_id": 1,
        "audio": "hangul_audios/1_g.mp3"
    },
    {
        "id": 2,
        "end" : "0",
        "hangul": "ㄴ",
        "letter_details": "consonant",
        "pronunciation": "n",
        "english_word": "nose",
        "image": "https://us.123rf.com/450wm/dvarg/dvarg1604/dvarg160400025/54978463-nose-icon-in-flat-design-on-white-background.jpg?ver=6",
        "audio_id": 2,
        "audio": "hangul_audios/2_n.mp3"
    },
    {
        "id": 3,
        "end" : "0",
        "hangul": "ㅂ",
        "letter_details": "consonant",
        "pronunciation": "b",
        "english_word": "bed",
        "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAABO1BMVEX////iS0uMYjn4wJ0zMzPBOjqJYz5zSiJtPwaTa0OLYDfOw7qVYTzkS03iSEjmZ2f2m3aRZUDDREOigWOjaEmbbErENjl2SxzojW3HPT3yjW7/xaH5+fnt7e2EVSP3t5XXRUXb29vHx8e3t7eurq7k5OQbGxssLCz2lm/2ro3ngWfU1NSoqKiHWizq493f1MqbeFdAPDrhOzvkV1f71Mbfro9uXFGgODghMjJsOTlmNADEsJ6ATxSCgoIQEBBnZ2eQkJBRUVEMGB2BZFL96d2SdmQREREdJivxnIS4oIz1ysrtmZnofHzncXHZzMJNRUD53t69lXzriYnwqqr5yazyubn97ukUISfoZFj72MLZqYx4YWHNaGi8Hh7vkn3elpg8MzNUNDTLWFGkcmLmponWdWVKMDLpdGfth3WnYl8lAAAFbUlEQVR4nO3ci1MaRwDHceC4VLBeqTQEe4cCd0BOHiJExUfMo1rxkaqtWmNbEo3G/P9/Qfee3lO9DAfr3O8zk4yj0Wy+2d3bddRYDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYrFCuVQQxj2Ip0Kol8WGWC6MexxPhiCKmFz3ESr1kv5iQSqPdSijs7C+vhD8vcqSWJcq2sulRn24Q6LVQmK22ZxNtYK+H1l1FVF7sdyoDHtUdGrNphNEOh24ViwmqXs62a6isre31VaJRDMb+F3r2j4lSqWIxGptJHQbj3yalcqEUkeQBP0VohSNk8PCrBFr1r0OK14FBEEoqXsVSVYX9V2LPBgjHuv1ZrX6RnJHKGhTisymiJ3chabeKt10vultNZlM1qqb7xol+7tIkSpkta7Xak4637KY1NRq1cW3pbtAkXn2edCehum27ZUFqdGoJe+8/41hmC31TaJYqkdhg/KU0s5ZtpNDY7Nas7aqbfMk1pxaq6JALFP596TdDinVn2NOxjJAYXJ3d5KSbdIj1hvrrCJ7VnKRYWQytRj/jyLs7R/8NCwfDvb3zDrqdazZ/CPEBI/njlWwrcDD7eWd90uMyu//V9jvdLih6nQOjtQPbVzHNr7jrj987lhi1RLrkOF55viY12qdbHn1OuU68aHjOn8qf5dxHUunRhXkPu5Y1lW4k1Uy8XorxnwmWv3V4Ybfiuh0hZhgXsc8bhij54olbFq39iXG6cQxuU5DmFYariu07m4YNKxDVyzJvgo9GLXOXhF7obUitQ4K991dR88Vy7YKt3mPWNoRYkt+qQhnCeo6eyljz0rQcHpwxhKsE+tv9ypUfCR/7tXLjOLXUGNx3QXf69g4OGOVrbEWjYnliHYWO9NaZc7DbEWm1lFWG19inI1MzlivLauwZq7CZXutjzFZjxXqxCJTa1+PRcXJwRlLsF1zLvQ4/FLWvnkZEyvcLYvE+kBzLNsqPDRX4fKFrRVzoscKd8sium2KzqTOWJ6rkM9eOJ6KcmZEsbjnFMeyPQvN6eQ6QMzJ8ohi/UJvrPKDJ1Ij1hwT7VhHp5/+8XwWEv2+7IwlRzjW2b//5XKfPZ+Fym+DgT0W+RXhWLkcO7PSs8SqGdv7tlJNJnnkQd/Y4PVY89GM9SnHsrnVpNcq5JeNROZaJKtQ2bPy0YzVnmYJn1VoxLKtQjmTz0czVuI5mVisbRUuGq2Ol53X6bm8MqvyEY91mey5V6HrlMVfzSupInt00GKxM8WV1Z7Wq3f45Zr3+mwWw99c5TMjO8HTG6sYn+LiK6ufe73L1dWvXy+/XDsXIHFzlckglhJLHWB8ujjFKRmKXPy2b4aSZZJKHlzzMmIRXqNVe5FQymnBODggFtmyfAbMcQP7YkQs31hx7pb3iBXxo0PRd8wDs1a/n7dALC/flMug/O2ci1tKzc/fTiGWx6C7t11l85o6N0pdseTqnQu51dOMpRwo1N/ntVLT6tPTd5eLQKxH/NM5S6lox7p/amluplmLKMd6uFaRZRFLj/VgLcSyxFI+83BfsBnEssZSG/gWYxHLGcso5hr7DGJ5x/JYlM5WiOVbrOhqhVg+wdylohtr+vtMhY3GWKmfv8+PYUvQGEv/qmBKURZrzDUegFgBIFYAiBUAYgVAWSw8DR9B//qs1DNKpemLlUj9QCkaYz2boFSTvljp9iSl2hR/7w51aP5GJ+ogVgCIFQBiBYBYASBWAIgVAGIFkE2rqIjVaqdUWRp+eomHVlYbX5uC8e2uGRfWtfVxj8XL7toLY3y74x5La+KFaYKGH/biIKxZxkfB3AIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGJn/AesxAB0+t5xbAAAAAElFTkSuQmCC",
        "audio_id": 3,
        "audio": "hangul_audios/3_b.mp3"
    },
    {
        "id": 4,
        "end" : "0",
        "hangul": "ㅅ",
        "letter_details": "consonant",
        "pronunciation": "s",
        "english_word": "slide",
        "image": "https://media.istockphoto.com/vectors/kids-slide-cartoon-vector-id1137328096?k=20&m=1137328096&s=170667a&w=0&h=QuEnOIjnb3xCQWDl-GmX6bVbu81PuLmF97IVikOGCAU=",
        "audio_id": 4,
        "audio": "hangul_audios/4_s.mp3"
    },
    {
        "id": 5,
        "end" : "0",
        "hangul": "ㅎ",
        "letter_details": "consonant",
        "pronunciation": "h",
        "english_word": "hat",
        "image": "https://cdna.artstation.com/p/marketplace/presentation_assets/000/215/134/large/file.jpg?1570541876",
        "audio_id": 5,
        "audio": "hangul_audios/5_h.mp3"
    },
    {
        "id": 6,
        "end" : "1",
        "hangul": "ㅏ",
        "letter_details": "consonant",
        "pronunciation": "ah",
        "english_word": "diploma",
        "image": "https://www.pngitem.com/pimgs/m/116-1165792_diploma-clipart-transparent-cartoons-graduation-certificate-png-png.png",
        "audio_id": 6,
        "audio": "hangul_audios/6_ah.mp3"
    },
]
syllables = [
    {
        "id": 1,
        "hangul": "가",
        "pronunciation": "gah",
        "definition": "to go",
        "image": "https://thumbs.dreamstime.com/b/cartoon-illustration-construction-worker-frowning-expression-holding-go-traffic-sign-cartoon-construction-worker-135307416.jpg",
        "audio_id": 7,
        "audio": "hangul_audios/7_gah.mp3"
    },
    {
        "id": 2,
        "hangul": "간",
        "pronunciation": "gan",
        "definition": "liver",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsqt_uK5PrpjdMss_oody-1hUGqnhvgCnQihM53toQtMVDml9ryiLaALmWhDkkylq9LSk&usqp=CAU",
        "audio_id": 8,
        "audio": "hangul_audios/8_gan.mp3"
    },
    {
        "id": 3,
        "hangul": "나",
        "pronunciation": "nah",
        "definition": "me",
        "image": "https://st2.depositphotos.com/12398928/43749/v/380/depositphotos_437490474-stock-illustration-teen-standing-pointing-thumbs-himself.jpg?forcejpeg=true",
        "audio_id": 9,
        "audio": "hangul_audios/9_nah.mp3"
    },
    {
        "id": 4,
        "hangul": "난",
        "pronunciation": "nan",
        "definition": "I am...",
        "image": "https://us.123rf.com/450wm/lisitsaimage/lisitsaimage2102/lisitsaimage210200010/163519446-smiling-african-american-girl-greeting-waving-hand-and-saying-hi.jpg?ver=6",
        "audio_id": 10,
        "audio": "hangul_audios/10_nan.mp3"
    },
    {
        "id": 5,
        "hangul": "바",
        "pronunciation": "bah",
        "definition": "no meaning",
        "image": "",
        "audio_id": 11,
        "audio": "hangul_audios/11_bah.mp3"
    },
    {
        "id": 6,
        "hangul": "밥",
        "pronunciation": "bab",
        "definition": "rice, or food",
        "image": "https://as1.ftcdn.net/v2/jpg/03/75/98/72/1000_F_375987209_FbtkdGUITnBb8ILZm3jWWHWgm5PRCEGI.jpg",
        "audio_id": 12,
        "audio": "hangul_audios/12_bab.mp3"
    },
    {
        "id": 7,
        "hangul": "반",
        "pronunciation": "ban",
        "definition": "class, or half",
        "image": "https://thumbs.dreamstime.com/b/pupils-teacher-classroom-school-pedagogue-teach-geography-lesson-map-globe-to-pupil-kids-character-schools-lessons-124097623.jpg",
        "audio_id": 13,
        "audio": "hangul_audios/13_ban.mp3"
    },
    {
        "id": 8,
        "hangul": "사",
        "pronunciation": "sah",
        "definition": "to buy",
        "image": "https://previews.123rf.com/images/stockgiu/stockgiu1907/stockgiu190732904/127134774-hand-with-money-cartoon.jpg",
        "audio_id": 14,
        "audio": "hangul_audios/14_sah.mp3"
    },
    {
        "id": 9,
        "hangul": "산",
        "pronunciation": "san",
        "definition": "mountain",
        "image": "https://i.pinimg.com/originals/fd/09/f7/fd09f7c5093408bcdd7510347301920f.png",
        "audio_id": 15,
        "audio": "hangul_audios/15_san.mp3"
    },
    {
        "id": 10,
        "hangul": "삽",
        "pronunciation": "sap",
        "definition": "shovel",
        "image": "https://cdn4.iconfinder.com/data/icons/building-cartoon/512/g18938-512.png",
        "audio_id": 16,
        "audio": "hangul_audios/16_sap.mp3"
    },
    {
        "id": 11,
        "hangul": "하",
        "pronunciation": "ha",
        "definition": "no meaning",
        "image": "",
        "audio_id": 17,
        "audio": "hangul_audios/17_ha.mp3"
    },
    {
        "id": 12,
        "hangul": "한",
        "pronunciation": "han",
        "definition": "an internalized feeling of anger, sorrow and resentment stemming from centuries of oppression and suffering, in a way that is uniquely Korean",
        "image": "https://adaa.org/sites/default/files/2021-05/Sad%20child%20purchased%20iStock%20small.jpg",
        "audio_id": 18,
        "audio": "hangul_audios/18_han.mp3"
    }
]
vocabulary = [
    {
        "id": 1,
        "end": 0,
        "hangul": "가",
        "pronunciation": "ga",
        "definition": "to go",
        "image": "https://thumbs.dreamstime.com/b/cartoon-illustration-construction-worker-frowning-expression-holding-go-traffic-sign-cartoon-construction-worker-135307416.jpg",
        "audio_id": 7,
        "audio": "hangul_audios/7_gah.mp3"
    },
    {
        "id": 2,
        "end": 0,
        "hangul": "간",
        "pronunciation": "gan",
        "definition": "liver",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsqt_uK5PrpjdMss_oody-1hUGqnhvgCnQihM53toQtMVDml9ryiLaALmWhDkkylq9LSk&usqp=CAU",
        "audio_id": 8,
        "audio": "hangul_audios/8_gan.mp3"
    },
    {
        "id": 3,
        "end": 0,
        "hangul": "나",
        "pronunciation": "na",
        "definition": "me",
        "image": "https://st2.depositphotos.com/12398928/43749/v/380/depositphotos_437490474-stock-illustration-teen-standing-pointing-thumbs-himself.jpg?forcejpeg=true",
        "audio_id": 9,
        "audio": "hangul_audios/9_nah.mp3"
    },
    {
        "id": 4,
        "end": 0,
        "hangul": "바나나",
        "pronunciation": "banana",
        "definition": "banana",
        "image": "https://static.vecteezy.com/system/resources/previews/004/557/618/original/fruit-banana-cartoon-object-vector.jpg",
        "audio_id": 19,
        "audio": "hangul_audios/19_banana.mp3"
    },
    {
        "id": 5,
        "end": 0,
        "hangul": "박사",
        "pronunciation": "baksa",
        "definition": "professor",
        "image": "https://static.vecteezy.com/system/resources/previews/004/903/201/original/cartoon-illustration-of-thai-female-teacher-holding-a-stick-in-front-of-blackboard-vector.jpg",
        "audio_id": 20,
        "audio": "hangul_audios/20_baksa.mp3"
    },
    {
        "id": 6,
        "end": 1,
        "hangul": "산",
        "pronunciation": "san",
        "definition": "mountain",
        "image": "https://i.pinimg.com/originals/fd/09/f7/fd09f7c5093408bcdd7510347301920f.png",
        "audio_id": 15,
        "audio": "hangul_audios/15_san.mp3"
    }
]

# ROUTES
@app.route('/')
def welcome():
    return render_template('welcome.html')

@app.route('/learn/letter/<int:id>')
def learn_letter(id):
    return render_template('learn_letter.html', id=id)

@app.route('/begin/letter/')
def begin_letter():
    return render_template('begin_letter.html')
@app.route('/begin/syllable/')
def begin_syllable():
    return render_template('begin_syllable.html')
@app.route('/begin/word/')
def begin_word():
    return render_template('begin_word.html')

@app.route('/begin/quiz/letter')
def begin_quiz_letter():
    return render_template('begin_quiz_letter.html')

@app.route('/begin/quiz/syllable')
def begin_quiz_syllable():
    return render_template('begin_quiz_syllable.html')

@app.route('/begin/quiz/word')
def begin_quiz_word():
    return render_template('begin_quiz_word.html')

@app.route('/quiz/class1/letter')
def quiz_class1_letter():
    global alphabet
    global alphabet_quizzed
    if len(alphabet_quizzed) == len(alphabet):
        alphabet_quizzed = []
    rand = random.choice(alphabet)
    while rand["id"] in alphabet_quizzed:
        rand = random.choice(alphabet)
    alphabet_quizzed.append(rand["id"])
    print("\n", alphabet_quizzed)
    return render_template('quiz_class1_letter.html', id=rand["id"], letter=rand)

@app.route('/quiz/class2/letter')
def quiz_class2_letter():
    global alphabet
    global alphabet_quizzed
    if len(alphabet_quizzed) == len(alphabet):
        alphabet_quizzed = []
    rand = random.choice(alphabet)
    while rand["id"] in alphabet_quizzed:
        rand = random.choice(alphabet)
    alphabet_quizzed.append(rand["id"])
    print("\n", alphabet_quizzed)
    return render_template('quiz_class2_letter.html', id=rand, letter=rand)

@app.route('/learn/syllable/<int:id>')
def learn_syllable(id):
    global syllables
    syllable = syllables[id-1]
    return render_template('learn_syllable.html', id=id, syllable=syllable)

@app.route('/quiz/syllable')
def quiz_syllable():
    global syllables
    global syllable_quizzed
    if len(syllable_quizzed) == len(syllables):
        syllable_quizzed = []
    rand_syll = random.choice(syllables)
    while rand_syll["id"] in syllable_quizzed:
        rand_syll = random.choice(syllables)
    syllable_quizzed.append(rand_syll["id"])
    print("\n", syllable_quizzed)
    return render_template('quiz_syllable.html', syllable=rand_syll)

@app.route('/learn/vocab/<int:id>')
def learn_vocab(id):
    return render_template('learn_vocab.html', id=id)

@app.route('/quiz/class1/vocab')
def quiz_class1_vocab():
    global vocabulary
    global vocab_quizzed
    if len(vocab_quizzed) == len(vocabulary):
        vocab_quizzed = []
    rand_vocab = random.choice(vocabulary)
    while rand_vocab["id"] in vocab_quizzed:
        rand_vocab = random.choice(vocabulary)
    vocab_quizzed.append(rand_vocab["id"])
    print("\n", vocab_quizzed)
    return render_template('quiz_class1_vocab.html', vocab=rand_vocab)

@app.route('/quiz/class2/vocab')
def quiz_class2_vocab():
    global vocabulary
    global vocab_quizzed
    if len(vocab_quizzed) == len(vocabulary):
        vocab_quizzed = []
    rand_vocab = random.choice(vocabulary)
    while rand_vocab["id"] in vocab_quizzed:
        rand_vocab = random.choice(vocabulary)
    vocab_quizzed.append(rand_vocab["id"])
    print("\n", vocab_quizzed)
    return render_template('quiz_class2_vocab.html', vocab=rand_vocab)

# AJAX FUNCTIONS

@app.route('/find_letter', methods=['GET', 'POST'])
def find_letter():
    global alphabet
    json_data = request.get_json()
    info = json_data
    stats = {}
    for x in alphabet:
        if info == x["id"]:
            stats = x
    # send back the WHOLE array of data, so the client can redisplay it
    return jsonify(stats = stats)

@app.route('/find_word', methods=['GET', 'POST'])
def find_word():
    global vocabulary
    json_data = request.get_json()
    info = json_data
    stats = {}
    for x in vocabulary:
        if info ==x["id"]:
            stats = x
    # send back the WHOLE array of data, so the client can redisplay it
    print(stats)
    return jsonify(stats = stats)

@app.route('/all_letters', methods=['GET', 'POST'])
def all_letters():
    global alphabet
    json_data = request.get_json()
    info = json_data
    stats = alphabet
    # send back the WHOLE array of data, so the client can redisplay it
    return jsonify(stats = stats)

@app.route('/score', methods=['GET', 'POST'])
def score_method():
    global score
    print(score)
    if request.method == 'GET':
        print("json_data null, returning current score")
        return jsonify(total=score["total"], correct=score["correct"])
    else:
        json_data = request.get_json()
        if json_data == "reset":
            score = {"total": 0, "correct": 0}
            print("reset:", json_data)
            return jsonify(total=0, correct=0)
        else:
            print("else:", json_data)
            score = json_data
            return jsonify(total=score["total"], correct=score["correct"])

# RUN / DEBUG

if __name__ == '__main__':
   app.run(debug = True)
