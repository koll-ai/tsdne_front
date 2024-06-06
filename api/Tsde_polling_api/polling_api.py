import math
import json
import time
import openai
import os
import datetime

from dotenv import load_dotenv
from json import JSONDecodeError
from flask import Flask, request, Response, stream_with_context, send_from_directory, abort
from flask_cors import CORS
from flask_socketio import SocketIO, emit

load_dotenv()

OPENAI_KEY = os.getenv("OPENAI_KEY")
NEXT_ROUND_KEY = os.getenv("NEXT_ROUND_KEY")
MAX_PROMPT_LEN = 300
MIN_PROMPT_LEN = 10
MAX_AUTHOR_LEN = 20
DB_PATH = os.getenv('DB_PATH')
generator_command = os.getenv('GEN_CMD')
initial_data_path = os.getenv('INIT_DATA_PATH')
IMAGE_FOLDER = os.getenv('IMAGE_FOLDER')

object_classes = ['Safe', 'Euclid', 'Keter', 'Thaumiel']

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

openai.api_key = OPENAI_KEY
print("connected to openAI")

last_scp_str = ""
with open("last.txt", "r") as f:
    last_scp_str = f.read().rstrip()

with open('current_scp.txt') as f:
    scp_number = int(f.read().rstrip())

# Set initial variable with savec file or with initial value otherwise

try:
    with open(initial_data_path, "r") as f:
        params = json.load(f)
except FileNotFoundError:
    params = dict(next_time=time.time() + 3600,
                  poll=[],
                  votes=dict(),
                  submitted_ips_count=dict()
                  )

if params['next_time'] < time.time():
    print('reseted')
    params['next_time'] = time.time() + 3600

next_time = params['next_time']
poll = params['poll']
votes = params['votes']
submitted_ips_count = params['submitted_ips_count']

if not os.path.exists('history'):
    os.mkdir('history')

def is_scpid_legit(id_scp):
    if id_scp.isdigit():
        id_scp = int(id_scp)
        if id_scp < 9000 or id_scp > scp_number:
            return False
        else:
            return True
    else:
        return False


@app.route('/', methods=['GET'])
def main():
    return "gpt scp api live and running"


@app.route('/next_round/', methods=['GET'])
def next_round():
    global scp_number
    global poll
    global votes
    global submitted_ips_count
    global next_time
    global last_scp_str

    k = request.args.get('key')
    nt = request.args.get('next_time')

    if k == NEXT_ROUND_KEY:
        sorted_poll = list(reversed(sorted(poll, key=lambda k: k['votes'])))
        poll = sorted_poll[1:]
        votes = dict()
        submitted_ips_count = dict()
        next_time = int(nt)
        scp_number += 1

        # save scp number
        with open('current_scp.txt', 'w') as f:
            f.write(str(scp_number+1))

        with open("last.txt", "r") as f:
            # f.write()
            last_scp_str = f.read().rstrip()

        # save poll data
        date_time = datetime.datetime.now().strftime("%m-%d-%Y-%H-%M-%S")
        with open(f"history/'{date_time}_history.json", "w") as f:
            data = dict(next_time=next_time,
                        poll=poll,
                        votes=votes,
                        submitted_ips_count=submitted_ips_count
                        )
            json.dump(data, f)

        socketio.emit('next_round', {
            'scp_desc': last_scp_str,
            'next_time': str(math.trunc(next_time * 1000))[0:-2] + "00"
        }, broadcast=True)

        return Response(status=200)

    return Response(status=403)


@app.route('/get_poll/', methods=['GET'])
def get_poll():
    if len(poll) == 0:
        return Response(status=204)

    return {'poll': poll}


@app.route('/upvote/')
def upvote():
    if request.headers.getlist("X-Forwarded-For"):
        ip = request.headers.getlist("X-Forwarded-For")[0]
    else:
        ip = request.remote_addr

    id_scp = request.args.get('id')

    if is_scpid_legit(id_scp):
        id_scp = int(id_scp)
    else:
        return Response(response="not a valid id", status=412)

    try:
        # open file
        with open('./upvotes.json', 'r') as json_file:
            data = json.load(json_file)
    except (FileNotFoundError, JSONDecodeError) as e:
        # file does not exist, create it
        data = dict()

    if id_scp in data:
        if ip not in data[id_scp]["ips"]:
            data[id_scp]["n_upvotes"] += 1
            data[id_scp]["ips"].append(ip)
        else:
            return Response(response="already voted", status=414)
    else:
        data[id_scp] = {
            "n_upvotes": 1,
            "ips": [ip]
        }

    with open('upvotes.json', 'w') as outfile:
        json.dump(data, outfile)

    return Response(response="upvote counted", status=200)


@app.route('/get_upvotes/', methods=['GET'])
def get_upvotes():
    try:
        # open file
        with open('./upvotes.json', 'r') as json_file:
            data = json.load(json_file)
    except (FileNotFoundError, JSONDecodeError) as e:
        # file does not exist, create it
        data = dict()

    return data


@app.route('/vote/', methods=['GET'])
def vote():
    print(votes)
    print(poll)

    if request.headers.getlist("X-Forwarded-For"):
        ip = request.headers.getlist("X-Forwarded-For")[0]
    else:
        ip = request.remote_addr

    # gets vote
    n = request.args.get('n')

    # if already voted
    if ip in votes.keys():
        if n in votes[ip]:
            return Response(response="Already voted for this SCP", status=403)

    # if out of bounds
    if n.isdigit():
        n = int(n)
        if(n >= len(poll) or n < 0):
            return Response(response="Incorrect number", status=412)
    else:
        return Response(response="Not a digit", status=412)

    # count vote
    poll[n]['votes'] += 1

    if ip not in votes.keys():
        votes[ip] = [n]
    else:
        votes[ip].append(n)

    return Response(status=200)


@app.route('/add_prompt/', methods=['GET'])
def add_prompt():
    global submitted_ips_count

    if request.headers.getlist("X-Forwarded-For"):
        ip = request.headers.getlist("X-Forwarded-For")[0]
    else:
        ip = request.remote_addr


    # if ip has already submitted one prompt
    if ip in submitted_ips_count.keys():
        if submitted_ips_count[ip] >= 3:
            return Response(response="You can submit a maximum of three prompts per round", status=429)
    else:
        submitted_ips_count[ip] = 0

    prompt = request.args.get('prompt')
    # check prompt length
    if len(prompt) > MAX_PROMPT_LEN:
        return Response(response="prompt is too long", status=412)
    if len(prompt) <= MIN_PROMPT_LEN:
        return Response(response="prompt is too short", status=412)

    # prompt_filtered = regex.match(r'[\p{Latin} !?.-]+', prompt).group(0) # remove all non latin + espace + ponctioation char
    # if prompt_filtered != prompt:
    #     return Response(response="prompt contains invalid characters", status=412)

    author = request.args.get('author')
    # check author lenght
    if len(author) > MAX_AUTHOR_LEN:
        return Response(response="author is too long", status=412)
    if len(author) <= 0:
        return Response(response="author is too long", status=412)

    nsfw = request.args.get('nsfw')
    # check if nsfw is boolean:
    if not(nsfw == 'true' or nsfw == 'false'):
        return Response(response="nsfw is not bool", status=412)

    scp_class = request.args.get('class')
    # check if scp_class is a digit
    if scp_class.isdigit():
        scp_class = int(scp_class)
        if scp_class > 3 or scp_class < 0:
            return Response(response="class number is not included between 0 (Safe) and 3 (Thaumiel)", status=412)
    else:
        return Response(response="not a number", status=412)

    submission = {
        'prompt': "SCP-" + str(scp_number) + " is " + prompt,
        'scpClass': object_classes[scp_class],
        'votes': 0,
        'index': len(poll),
        'author': author,
        'nsfw': nsfw
    }

    poll.append(submission)

    # broadcast to all clients
    socketio.emit('new_prompt', {'prompt': submission}, broadcast=True)

    submitted_ips_count[ip] += 1
    return Response(response="submission has been added!", status=200)


@app.route('/last_scp_desc/',  methods=['GET'])
def last_scp_desc():

    with open("last.txt", "r") as f:
        last_scp_str = f.read()

    return str(last_scp_str)


@app.route('/current_scp_number/', methods=['GET'])
def current_scp_number():
    return str(scp_number)


@app.route('/next_time/', methods=['GET'])
def next_time_():
    """Renvoie le next time au format de javascript"""
    return str(math.trunc(next_time * 1000))[0:-2] + "00"


@app.route('/save_data/', methods=['GET'])
def save_data():
    k = request.args.get('key')
    if k == NEXT_ROUND_KEY:
        with open(initial_data_path, "w") as f:
            data = dict(next_time=next_time,
                        poll=poll,
                        votes=votes,
                        submitted_ips_count=submitted_ips_count
                        )
            json.dump(data, f)

        with open("current_scp.txt", "w") as f:
            f.write(str(scp_number))

    return "ok"


@app.route('/images/<filename>')
def get_past_illustration(filename):
    # Ensure the filename is secure and does not contain any directory traversal characters
    if '..' in filename or filename.startswith('/'):
        abort(404)  # Not found, to avoid revealing any directory structure

    # Securely join the directory and filename to prevent directory traversal
    safe_path = os.path.join(IMAGE_FOLDER, filename)

    # Check if the file exists in the directory
    if not os.path.isfile(safe_path):
        abort(404)  # If the file does not exist, return a 404 error

    # Serve the image from the directory
    return send_from_directory(IMAGE_FOLDER, filename)



@app.route('/get_past_scp/', methods=['GET'])
def get_past_scp():
    idscp = request.args.get('file')

    if is_scpid_legit(idscp):
        idscp = int(idscp)
    else:
        return Response(response="not a valid id", status=412)

    with open(DB_PATH + 'SCP-' + str(idscp) + '-GPT.txt', 'r') as f:
        return f.read()


@app.route('/get_past_list/', methods=['GET'])
def get_past_list():
    with open(DB_PATH+'scp_list.csv', "r") as f:
        return f.read()


@app.route('/generate/')
def generate_scp():
    key = request.args.get('key')
    if key == NEXT_ROUND_KEY:
        os.system(generator_command)
        
        sorted_poll = list(reversed(sorted(poll, key=lambda k: k['votes'])))
        winner = sorted_poll[0]
        rest_poll = sorted_poll[1:]
        with open(initial_data_path, "w") as f:
            data = dict(next_time=next_time,
                        poll=rest_poll,
                        votes=dict(),
                        submitted_ips_count=dict()
                    )                        

            json.dump(data, f)
        return 'ok'
    else:
        return 'ko'


@socketio.on('connect')
def test_connect():
    print('Client connected')


if __name__ == "__main__":
    socketio.run(app=app, host='0.0.0.0', port=45900, debug=True, allow_unsafe_werkzeug=True)
