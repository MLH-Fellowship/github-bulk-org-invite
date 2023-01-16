import requests
import time
import os
from dotenv import load_dotenv

load_dotenv()
with open("fellows.txt") as f:
    lines = f.readlines()

    # Go through each line of the file
    for line in lines:
        fellow_github = line.strip()

        # Get GitHub User ID from Username
        response = requests.get(f"https://api.github.com/users/{fellow_github}")
        user_id = response.json()["id"]
        body = {
            "invitee_id": user_id
        }

        # Invite to org
        response = requests.post(url=f"https://api.github.com/orgs/{os.getenv('GITHUB_ORG')}/invitations", 
                          json=body, 
                          auth=(os.getenv("GITHUB_USERNAME"), os.getenv("GITHUB_ACCESS_TOKEN")))
        print(f"{fellow_github}: {response.json()}")
        time.sleep(1)

