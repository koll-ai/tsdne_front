import requests
import scp_gen
import openai
import time
import csv

# Get all polls
url_poll = "https://thisscpdoesnotexist.pythonanywhere.com/get_poll/"
r = requests.get(url_poll)
polls = r.json()['poll']

# Get winner
newlist = list(reversed(sorted(polls, key=lambda k: k['votes'])))
win = newlist[0]


# set variables
object_classes = ['Safe', 'Euclid', 'Keter', 'Thaumiel']
class_to_num = {c : i for i,c in enumerate(object_classes)}
with open("./openai.key", "r") as f:
    openai.api_key = f.readline()

with open("./reset.key", "r") as f:
    resetkey = f.readline()

# prepare inputs
raw_prompt = win['prompt']
prompt = raw_prompt[raw_prompt.index('GPT') + 7:]
scp_num = raw_prompt.split(' ')[1].split('-')[0]

# generate scp
scp = scp_gen.generate_scp(scp_num, prompt, class_to_num[win['scpClass']])


# save scp
filename = 'SCP-' + scp_num + '-GPT.txt'
with open("../raw_scp/SCP-" + scp_num + '-GPT.txt', 'w+') as f:
    f.write(scp)

with open("../raw_scp/scp_list.csv", 'a') as f:
    writer = csv.writer(f)
    writer.writerow([raw_prompt, win['scpClass'], 'SCP-' + scp_num + '-GPT.txt'])

next_time = time.time() + 3600
r = requests.get("https://thisscpdoesnotexist.pythonanywhere.com/get_poll/?k=" + resetkey + "&?nt=" + str(next_time))




if __name__ == '__main__':
    pass
