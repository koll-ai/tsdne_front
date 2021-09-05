import math

from flask import Flask, request, Response
import json
import time
from flask_cors import CORS

MAX_PROMPT_LEN = 300

app = Flask(__name__)
CORS(app)

last_scp_str = ""

with open("/home/thisscpdoesnotexist/tsde/polling_api.key", "r") as f:
    NEXT_ROUND_KEY = f.read().rstrip()

with open("/home/thisscpdoesnotexist/tsde/last.txt", "r") as f:
    last_scp_str = f.read().rstrip()

with open('/home/thisscpdoesnotexist/tsde/current_scp.txt') as f:
    scp_number = int(f.read().rstrip())

object_classes = ['Safe', 'Euclid', 'Keter', 'Thaumiel']

next_time = time.time() + 3600

poll = []
votes = dict()
submitted_ips = []

@app.route('/', methods=['GET'])
def main():
    return "polling api live and running"

@app.route('/next_round/', methods=['GET'])
def next_round():
    global scp_number
    global poll
    global votes
    global submitted_ips
    global next_time
    global last_scp_str

    k = request.args.get('key')
    nt = request.args.get('next_time')
    
    if k == NEXT_ROUND_KEY:
        poll = []
        votes = dict()
        submitted_ips = []
        next_time = int(nt)
        scp_number += 1

        # save scp number
        with open('/home/thisscpdoesnotexist/tsde/current_scp.txt') as f:
            f.write(str(scp_number+1))

        with open("/home/thisscpdoesnotexist/tsde/last.txt", "r") as f:
            last_scp_str = f.read().rstrip()

        return Response(status=200)

    return Response(status=403)

@app.route('/get_poll/', methods=['GET'])
def get_poll():
    if len(poll) == 0:
        return Response(status=204)

    return {'poll': poll}
    
@app.route('/vote/', methods=['GET'])
def vote():
    #ip = request.remote_addr
    ip = request.args.get('ip')

    # if already voted
    if ip in votes.keys():
        return Response(status=403)

    # gets vote
    n = request.args.get('n')
    
    # if out of bounds
    if n.isdigit():
        n = int(n)
        if(n >= len(poll) or n < 0):
            return Response(status=412)
    else:
        return Response(status=412)
    
    # count vote
    poll[n]['votes'] += 1
    votes[ip] = n
    
    return Response(status=200)

@app.route('/my_vote/', methods=['GET'])
def my_vote():
    #ip = request.remote_addr
    ip = request.args.get('ip')

    if ip in votes.keys():
        return Response(response=str(votes[ip]),status=200)
    else:
        return Response(response="you haven't voted yet", status=204)       

@app.route('/add_prompt/', methods=['GET'])
def add_prompt():
    #ip = request.remote_addr
    ip = request.args.get('ip')
    
    # if ip has already submitted one prompt
    if ip in submitted_ips:
        return Response(response="already submitted a scp for this round",status=403)
    
    else:
        prompt = request.args.get('prompt')
        scp_class = request.args.get('class')
        
        if len(prompt) > MAX_PROMPT_LEN:
            return Response(response="prompt is too long", status=412)
        
        if scp_class.isdigit():
            scp_class = int(scp_class)
            if scp_class > 3 or scp_class < 0:
                return Response(response="class number is between 0 (Safe) and 3 (Thaumiel)", status=412)
        else:
            return Response(response="not a number", status=412)            
        
        submission = {
            'prompt': "SCP-" + str(scp_number) + "-GPT is " + prompt,
            'scpClass': object_classes[scp_class],
            'votes': 0,
            'index': len(poll)
        }
        
        poll.append(submission)
        submitted_ips.append(ip)        
        return Response(response="submission has been added!",status=200)

@app.route('/last_scp_desc/',  methods=['GET'])
def last_scp_desc():
    global last_scp_str
    return str(last_scp_str)

@app.route('/current_scp_number/', methods=['GET'])
def current_scp_number():
    return str(scp_number)

@app.route('/next_time/', methods=['GET'])
def next_time_():
    """Renvoie le next time au format de javascript"""
    return str( math.trunc(next_time * 1000 ) )[0:-2] + "00"