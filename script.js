// Function to add a task
async function addTask() {
    const input = document.getElementById("taskInput"); // Gets the input text element from HTML
    const taskText = input.value.trim(); // Removes whitespaces from input

    // Do nothing when no input is given
    if (taskText === "") return;

    // Get integer values of priority and task type from dropdowns
    const priority = parseInt(document.getElementById("prioritySelect").value);
    const taskType = parseInt(document.getElementById("taskTypeSelect").value);

    // Declaring variable to hold value of predicted time
  let predictedTime;
    
  try {    // Try to call getPrediction with 'await' as it is an async function
    predictedTime = await getPrediction(taskText, priority, taskType);
  } catch (error) {    // If error occurs, 'catch' block runs and app does not crash
    console.error("Prediction error:", error); 
    predictedTime = "Error giving estimated time";
  }

    // Creating a list that shows task and estimated time required to complete it
  const li = document.createElement("li");
  li.textContent = `${taskText} (Estimated time required: ${predictedTime} minutes)`;

    // This toggles the CSS class 'completed' to show that a task is done
    li.addEventListener("click", function () {
      li.classList.toggle("completed");
    });

    // Create a delete button 
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
   
    deleteBtn.addEventListener("click", function (e) { // To prevent event propagation : parent events like toggling
      e.stopPropagation();
      li.remove();
    });

    // Append delete button inside li 
    li.appendChild(deleteBtn);
    
    // Add both task + delete button to the task list in DOM
    document.getElementById("taskList").appendChild(li);
    input.value = ""; // Clear input block after adding a task item
  }

// Function to get predicted time from backend
  async function getPrediction(taskText, priority, taskType) {
    
      // Sending POST request to server, this request includes task data as JSON
      const res = await fetch("http://localhost:5001/predict", {  
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task_name: taskText,  // Task description
        priority: priority,  // Numeric value    
        type_of_task: taskType    // Numeric value
      }),
    });

    // 
   if (!res.ok) {
  console.warn("Server responded with error, now giving default value.");
  return "Unknown/0"; 
}

const data = await res.json();
      
return data.predicted_minutes_required;
