from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
model_trained = joblib.load("final_trained_model.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    no_of_words = len(data["task_name"].split())
    priority_type = int(data["priority"])
    task_type = int(data["type_of_task"])

    features_of_list = np.array([[no_of_words, priority_type, task_type]])
    prediction = model_trained.predict(features_of_list)
    return jsonify({"predicted_minutes_required": round(float(prediction[0]), 1)})

if __name__ == "__main__":
    app.run(debug=True, port=5001)
