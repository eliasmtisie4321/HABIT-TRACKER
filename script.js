
const habitInput = document.querySelector(".HABIT");
const targetInput = document.querySelector(".TARGET");
const categoryInput = document.querySelector(".CATEGORY");

const list = document.getElementById("list");

const totalEl = document.getElementById("total");
const doneEl = document.getElementById("done");
const percentEl = document.getElementById("percent");

const errorEl = document.getElementById("error");


let habits = [];


function addHabit() {

    let name = habitInput.value.trim();
    let target = Number(targetInput.value);
    let category = categoryInput.value;

   
    errorEl.textContent = "";

    if (name.length < 3) {
        errorEl.textContent = "Habit name must be at least 3 letters.";
        return;
    }

    if (target < 1 || target > 7) {
        errorEl.textContent = "Target must be between 1 and 7.";
        return;
    }

    if (category === "") {
        errorEl.textContent = "Please select a category.";
        return;
    }

    let habit = {
        id: Date.now(),
        name: name,
        target: target,
        category: category,
        streak: 0,
        done: false
    };

    habits.push(habit);

    
    habitInput.value = "";
    targetInput.value = "";
    categoryInput.value = "";

    render();
}


function render() {

    list.innerHTML = "";

    let doneCount = 0;

    for (let i = 0; i < habits.length; i++) {

        let habit = habits[i];

        if (habit.done === true) {
            doneCount++;
        }

        let li = document.createElement("li");
          textContent=("summary")
        li.innerHTML = `
            <strong>${habit.name}</strong> (${habit.category})
            <br>
            Target: ${habit.target}
            <br>
            Streak: ${habit.streak}
            <br>
        `;


        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = habit.done;

        checkbox.onclick = function () {
            toggleDone(habit.id);
        };

        // DELETE BUTTON
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.onclick = function () {
            deleteHabit(habit.id);
        };

        li.appendChild(checkbox);
        li.appendChild(deleteBtn);

        list.appendChild(li);
    }

    // SUMMARY
    totalEl.textContent = habits.length;
    doneEl.textContent = doneCount;

    let percent = 0;

    if (habits.length > 0) {
        percent = Math.round((doneCount / habits.length) * 100);
    }

    percentEl.textContent = percent + "%";
}

// MARK HABIT DONE
function toggleDone(id) {

    for (let i = 0; i < habits.length; i++) {

        if (habits[i].id === id) {

            if (habits[i].done === false) {
                habits[i].done = true;
                habits[i].streak++;
            } else {
                habits[i].done = false;

                if (habits[i].streak > 0) {
                    habits[i].streak--;
                }
            }
        }
    }

    render();
}

// DELETE HABIT
function deleteHabit(id) {

    for (let i = 0; i < habits.length; i++) {

        if (habits[i].id === id) {
            habits.splice(i, 1);
            break;
        }
    }

    render();
}