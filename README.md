# GitHub Bulk Invite to Organizations

## Setup
Add your envivonment variables to a new file called `.env` using the structure found in `.env.example`.

```
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Make sure to add a list of GitHub usernames into `fellows.txt`. Make sure each username is on a new line.


```
python script.py
```