from flask import Flask, request, Response

MAX_PROMPT_LEN = 300

object_classes = ['Safe', 'Euclid', 'Keter', 'Thaumiel']

app = Flask(__name__)

SCP_NUMBER = 202
poll = []
votes = dict()
submitted_ips = []

@app.route('/get_poll/', methods=['GET'])
def get_poll():
    if len(poll) == 0:
        return Response(status=204)

    return {'poll': poll}
    
@app.route('/vote/', methods=['GET'])
def vote():
    ip = request.remote_addr
    
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
    print(votes)

    ip = request.remote_addr
    if ip in votes.keys():
        return Response(response=str(votes[ip]),status=200)
    else:
        return Response(response="you haven't voted yet", status=204)       

@app.route('/add_prompt/', methods=['GET'])
def add_prompt():
    ip = request.remote_addr
    
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
            'prompt': "SCP " + str(SCP_NUMBER) + "-GPT is " + prompt,
            'scpClass': object_classes[scp_class],
            'votes': 0
        }
        
        poll.append(submission)
        submitted_ips.append(ip)        
        return Response(response="submission has been added!",status=200)

@app.route('/current_scp_number/', methods=['GET'])
def current_scp_number():
    return SCP_NUMBER

if __name__ == '__main__':
    app.run(host='127.0.0.1')