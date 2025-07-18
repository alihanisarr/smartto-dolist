# Smart To-do List:
This is a smart to-do list that records your tasks and predicts the time required to complete them, depending on their type and priority level. 


# Features:
Enter or delete a task.
Select priority level: High, Medium, or Low.
Select the type of task: Working, Studying, or Personal. 
Receive the estimated time required to complete each task that has been entered.


# Technologies:
HTML/CSS/JavaScript for basic webpage formatting.
Python to build the ML model that predicts the time required. 
Flask (Python framework) to create an API (REST API) that connects the frontend with the backend. 
Scikit-learn to implement the Random Forest Regressor as the ML model to minimize the chances of error, as it averages the predictions from many decision trees. 
REST API to receive a POST request from the frontend and to return a prediction. 
Flask-cors to let Flask API receive requests from the frontend, even though they are on different ports. 


# Structure:
smart-todo/
- ├── tod-dolist.html      # Frontend layout
- ├── style.css            # Frontend styling
- ├── script.js            # JavaScript logic 
- │
- ├── server.py            # Flask API and ML setup
- ├── trained_model.pkl    # Trained ML model
- ├── task_data.csv        # Data used for training
- │
- └── README.md            # This file




