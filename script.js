async function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();
    if (taskText === "") return;
  
    const priority = parseInt(document.getElementById("prioritySelect").value);
    const taskType = parseInt(document.getElementById("taskTypeSelect").value);
  
    

  let predictedTime;
  try {
    predictedTime = await getPrediction(taskText, priority, taskType);
  } catch (error) {
    console.error("Prediction error:", error); 
    predictedTime = "Error giving estimated time";
  }

  const li = document.createElement("li");
  li.textContent = `${taskText} (Estimated time required: ${predictedTime} minutes)`;

    li.addEventListener("click", function () {
      li.classList.toggle("completed");
    });
  
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      li.remove();
    });
  
    li.appendChild(deleteBtn);
    document.getElementById("taskList").appendChild(li);
    input.value = "";
  }
  
  async function getPrediction(taskText, priority, taskType) {
    const res = await fetch("http://localhost:5001/predict", {
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
  