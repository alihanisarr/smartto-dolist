# Smart To-do List:
This is a smart to-do list that records your tasks and predicts the time required to complete them, depending on their type and priority level. 

# Features:
- Enter or delete a task.
- Select priority level: High, Medium, or Low.
- Select the type of task: Working, Studying, or Personal. 
- Receive the estimated time required to complete each task that has been entered.

# Installation:
- Clone the repository (HTTPS Clone): 
- git clone https://github.com/alihanisarr/smartto-dolist.git

- Install libraries using pip: 
pip install flask flask_cors joblib numpy

- Run the program in the terminal (eg. VS code):
- cd smartto-dolist
- python3 server.py

- Open front-end:
- open tod-dolist.html

- Exit the program:
In the terminal, press Ctrl + C to end the program

# Technologies:
- HTML/CSS/JavaScript for basic webpage formatting.
- Python to build the ML model that predicts the time required. 
- Flask (Python framework) to create an API (REST API) that connects the frontend with the backend. 
- Scikit-learn to implement the Random Forest Regressor as the ML model to minimize the chances of error, as it averages the predictions from many decision trees. 
- REST API to receive a POST request from the frontend and to return a prediction. 
- Flask-cors to let Flask API receive requests from the frontend, even though they are on different ports. 
