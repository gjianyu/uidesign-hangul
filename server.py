import playsound
from email.mime import audio
from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
from flask import redirect
app = Flask(__name__)

# DATA
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
        "image": "",
        "audio_id": 7,
        "audio": "hangul_audios/7_gah.mp3"
    },
    {
        "id": 2,
        "hangul": "간",
        "pronunciation": "gan",
        "definition": "liver",
        "image": "",
        "audio_id": 8,
        "audio": "hangul_audios/8_gan.mp3"
    },
    {
        "id": 3,
        "hangul": "나",
        "pronunciation": "nah",
        "definition": "me",
        "image": "",
        "audio_id": 9,
        "audio": "hangul_audios/9_nah.mp3"
    },
    {
        "id": 4,
        "hangul": "난",
        "pronunciation": "nan",
        "definition": "I am... (in shortened form)",
        "image": "",
        "audio_id": 10,
        "audio": "hangul_audios/10_nan.mp3"
    },
    {
        "id": 5,
        "hangul": "바",
        "pronunciation": "bah",
        "definition": "NO_MEANING",
        "image": "",
        "audio_id": 11,
        "audio": "hangul_audios/11_bah.mp3"
    },
    {
        "id": 6,
        "hangul": "밥",
        "pronunciation": "bab",
        "definition": "rice, or food",
        "image": "",
        "audio_id": 12,
        "audio": "hangul_audios/12_bab.mp3"
    },
    {
        "id": 7,
        "hangul": "반",
        "pronunciation": "ban",
        "definition": "class, or half",
        "image": "",
        "audio_id": 13,
        "audio": "hangul_audios/13_ban.mp3"
    },
    {
        "id": 8,
        "hangul": "사",
        "pronunciation": "sah",
        "definition": "to buy",
        "image": "",
        "audio_id": 14,
        "audio": "hangul_audios/14_sah.mp3"
    },
    {
        "id": 9,
        "hangul": "산",
        "pronunciation": "san",
        "definition": "mountain",
        "image": "",
        "audio_id": 15,
        "audio": "hangul_audios/15_san.mp3"
    },
    {
        "id": 10,
        "hangul": "삽",
        "pronunciation": "sap",
        "definition": "shovel",
        "image": "",
        "audio_id": 16,
        "audio": "hangul_audios/16_sap.mp3"
    },
    {
        "id": 11,
        "hangul": "하",
        "pronunciation": "ha",
        "definition": "NO_MEANING",
        "image": "",
        "audio_id": 17,
        "audio": "hangul_audios/17_ha.mp3"
    },
    {
        "id": 12,
        "hangul": "한",
        "pronunciation": "han",
        "definition": "an internalized feeling of anger, sorrow and resentment stemming from centuries of oppression and suffering, in a way that is uniquely Korean",
        "image": "",
        "audio_id": 18,
        "audio": "hangul_audios/18_han.mp3"
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
        "audio": "hangul_audios/7_gah.mp3"
    },
    {
        "id": 2,
        "hangul": "간",
        "pronunciation": "gan",
        "definition": "liver",
        "image": "",
        "audio_id": 8,
        "audio": "hangul_audios/8_gan.mp3"
    },
    {
        "id": 3,
        "hangul": "나",
        "pronunciation": "na",
        "definition": "me",
        "image": "",
        "audio_id": 9,
        "audio": "hangul_audios/9_nah.mp3"
    },
    {
        "id": 4,
        "hangul": "바나나",
        "pronunciation": "banana",
        "definition": "banana",
        "image": "",
        "audio_id": 19,
        "audio": "hangul_audios/19_banana.mp3"
    },
    {
        "id": 5,
        "hangul": "박사",
        "pronunciation": "baksa",
        "definition": "professor",
        "image": "",
        "audio_id": 20,
        "audio": "hangul_audios/20_baksa.mp3"
    },
    {
        "id": 6,
        "hangul": "산",
        "pronunciation": "san",
        "definition": "mountain",
        "image": "",
        "audio_id": 15,
        "audio": "hangul_audios/14_san.mp3"
    },
    {
        "id": 7,
        "hangul": "하하하",
        "pronunciation": "hahaha",
        "english_word": "",
        "definition": "the sound of laughter (onomatopoeia)",
        "image": "",
        "audio_id": 21,
        "audio": "hangul_audios/21_hahaha.mp3"
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

@app.route('/quiz/class1/letter/<int:id>')
def quiz_class1_letter(id):
    global data
    return render_template('quiz_class1_letter.html', id=id)

@app.route('/quiz/class2/letter/<int:id>')
def quiz_class2_letter(id):
    global data
    return render_template('quiz_class2_letter.html', id=id)

@app.route('/learn/syllable/<int:id>')
def learn_syllable(id):
    global syllables
    syllable = syllables[id-1]
    return render_template('learn_syllable.html', syllable=syllable)

@app.route('/quiz/syllable/<int:id>')
def quiz_syllable(id):
    global syllables
    syllable = syllables[id-1]
    return render_template('quiz_syllable.html', syllable=syllable)

@app.route('/find_letter', methods=['GET', 'POST'])
def find_letter():
    global alphabet
    json_data = request.get_json()
    info = json_data
    stats = {}
    for x in alphabet:
        if info ==x["id"]:
            stats = x
    # send back the WHOLE array of data, so the client can redisplay it
    return jsonify(stats = stats)

@app.route('/all_letters', methods=['GET', 'POST'])
def all_letters():
    global alphabet
    json_data = request.get_json()
    info = json_data
    stats = alphabet
    # send back the WHOLE array of data, so the client can redisplay it
    return jsonify(stats = stats)


# RUN / DEBUG

if __name__ == '__main__':
   app.run(debug = True)
