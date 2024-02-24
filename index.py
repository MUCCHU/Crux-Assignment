import requests

# Replace 'your_affinda_api_key' with your actual Affinda API key
api_key = 'aff_c60e2875907e5d64107e432b51cd6719f1b79e49'
headers = {
    'Authorization': f'Bearer {api_key}'
}

# Specify the path to your resume file
file_path = './resume.pdf'

# Open the file in binary mode
with open(file_path, 'rb') as file:
    # Make the POST request to Affinda's resume parser API
    response = requests.post(
        'https://api.affinda.com/v1/resumes',
        headers=headers,
        files={'file': file}
    )

# Check if the request was successful
if response.status_code == 200:
    # Parse the JSON response
    parsed_data = response.json()
    # Display the parsed data
    print(parsed_data)
else:
    # Print error message if something went wrong
    print("There was an error")
    print(f"Error: {response.status_code}, Message: {response.text}")