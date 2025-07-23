import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
import joblib

# Load the task data
dataFrame = pd.read_csv("task_data.csv")

# Number of words in the task name being converted to a feature
dataFrame["no_of_words"] = dataFrame["task_name"].apply(lambda x: len(x.split()))

# Priority and task type being converted to numbers
dataFrame["priority_type"] = LabelEncoder().fit_transform(dataFrame["priority"])
dataFrame["task_type"] = LabelEncoder().fit_transform(dataFrame["type_of_task"])

# Identifying features and target variable
X = dataFrame[["no_of_words", "priority_type", "task_type"]]
y = dataFrame.time_required_minutes

# Training the model 
trained_task_model = RandomForestRegressor(random_state=1)
trained_task_model.fit(X, y)

joblib.dump(trained_task_model, "final_trained_model.pkl")

