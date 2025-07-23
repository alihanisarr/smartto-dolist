// Function to add a task
async function addTask() {
    const input = document.getElementById("taskInput"); // Gets the input text element from HTML
    const taskText = input.value.trim(); // Removes whitespaces from input

    // Do nothing when no input is given
    if (taskText === "") return;

    // Get integer values of priority and task type from dropdowns
    const priority = parseInt(document.getElementById("prioritySelect").value);
    const taskType = parseInt(document.getElementById("taskTypeSelect").value);
  
  let predictedTime;
    
  try {    // Wrapping code that might give an error
    predictedTime = await getPrediction(taskText, priority, taskType);
  } catch (error) { # If error occurs then fetch it and give error message
    console.error("Prediction error:", error); 
    predictedTime = "Error giving estimated time";
  }

    // Creating a list that shows task and estimated time required to complete it
  const li = document.createElement("li");
  li.textContent = `${taskText} (Estimated time required: ${predictedTime} minutes)`;

    // Toggle 'completed' on CSS so user can mark tasks done or undone
    li.addEventListener("click", function () {
      li.classList.toggle("completed");
    });

    // Create a delete button with each task item
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function (e) { // To prevent event propagation : parent events like toggling
      e.stopPropagation();
      li.remove();
    });

    // Append delete button inside li and add the task to the task list
    li.appendChild(deleteBtn);
    document.getElementById("taskList").appendChild(li);
    input.value = ""; // Clear input block after adding a task item
  }

// Function to get predicted time from backend
  async function getPrediction(taskText, priority, taskType) {
    const res = await fetch("http://localhost:5001/predict", {  // Task data sent as JSON
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task_name: taskText,
        priority: priority,      
        type_of_task: taskType      
      }),
    });
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await res.json();
    return data.predicted_minutes_required;
  }
  
