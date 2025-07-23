from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS

# Setting up Flask app (REST API) and enabling CORS to allow requests from different ports
app = Flask(__name__)
CORS(app)

# Loading the trained and saved model
model_trained = joblib.load("final_trained_model.pkl")

# This sets up the route that listens to POST requests only
@app.route("/predict", methods=["POST"])
def get_tasktime():
    data = request.json # To convert JSON data and convert it into an understandable Python dictionary called 'data'

    # Converting input to features that the model can understand
    no_of_words = len(data["task_name"].split())
    priority_type = int(data["priority"]) # Converting numerical values sent by frontend as JSON to Python integers
    task_type = int(data["type_of_task"]) # Converting numerical values sent by frontend as JSON to Python integers


    features_of_list = np.array([[no_of_words, priority_type, task_type]]) # RandomForestRegressor expects a 2D Array
    prediction = model_trained.predict(features_of_list) # Making the prediction

    # Returning the prediction to frontend after formatting and converting it to JSON 
    return jsonify({"predicted_minutes_required": round(float(prediction[0]), 1)})

# Guard the app from running anywhere and display any errors
if __name__ == "__main__":
    app.run(debug=True, port=5001)
