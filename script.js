var QUIZ_INDEX = 2;
var RECITATION_INDEX = 3;
var LONGTEST_INDEX = 4;
var PROJECT_INDEX = 5;
var ATTENDANCE_INDEX = 6;
var EXAM_INDEX = 7;

const INCENTIVES = document.getElementById("incentives");
const QUIZ_TOTAL = document.getElementById("quiz-total");
const RECITATION_TOTAL = document.getElementById("recitation-total");
const LONGTEST_TOTAL = document.getElementById("longtest-total");
const PROJECT_TOTAL = document.getElementById("project-total");
const ATTENDANCE_TOTAL = document.getElementById("attendance-total");
const EXAM_TOTAL = document.getElementById("exam-total");
const FINAL_GRADE = document.getElementById("final-grade");
const TABLE_CARD = document.getElementById("body-card");
const WARNING_TEXT = document.getElementById("warning");
const CATEGORIES = document.querySelectorAll(".percentage")

var LIST_QUIZ = [];
var LIST_RECITATION = [];
var LIST_LONGTEST = [];
var LIST_PROJECT = [];

function FinalCalculate() {
    let total_added_grades = 0;
    for (let i = 0; i < CATEGORIES.length; i++) {
        total_added_grades += Number(CATEGORIES[i].textContent.replace("%", ""));
    }

    if (Math.round(total_added_grades + Number(INCENTIVES.value)) <= 100) {
        FINAL_GRADE.textContent = Math.round(total_added_grades + Number(INCENTIVES.value)) + "%";
    }
    else {
        FINAL_GRADE.textContent = "100%";
    }
    
}

function AddRow(name, index, lister, total_element, percentage) {
    var new_row = document.createElement("tr");
    var new_row_list = [];
    new_row_list.push(new_row)
    var topic_name = document.createElement("th");
    var input_name = document.createElement("input");
    input_name.type = "text";
    input_name.name = "Category Name";
    input_name.placeholder = `${name} ${lister.length + 1}`;
    var total_grade = document.createElement("th");
    total_grade.textContent = "100.00%";
    new_row.appendChild(topic_name);
    var warning_msg = document.createElement("h6");
    warning_msg.className = "warning-msg";
    warning_msg.style.display = "none";
    warning_msg.textContent = "GRADE IS LARGER THAN MAX GRADE, weight should be larger than grade!";
    for (let i = 0; i < 2; i++) {
        var new_cell = document.createElement("th");
        var new_input = document.createElement("input");
        new_input.type = "number";
        new_input.name = "Grade Input"
        new_input.min = 0;
        new_input.value = 5;
        new_row_list.push(new_input);
        new_cell.appendChild(new_input);
        new_row.appendChild(new_cell);
    }
    topic_name.appendChild(input_name);
    topic_name.appendChild(warning_msg)
    new_row.appendChild(total_grade);
    new_row_list.push(total_grade);
    new_row_list.push(warning_msg);
    new_row_list.push(input_name);
    TABLE_CARD.insertBefore(new_row, TABLE_CARD.children[index]);
    for (let i = 0; i < 2; i++) {
        const input_element = new_row_list[i + 1];
        input_element.addEventListener("input", function() {
            new_row_list[3].textContent = `${Number((Number(new_row_list[2].value) / Number(new_row_list[1].value)) * 100).toFixed(2)}`;
            if (Number(new_row_list[1].value) < Number(new_row_list[2].value)) {
                warning_msg.style.display = "block";
                new_row_list[5].style.display = "none";
            }

            else {
                warning_msg.style.display = "none";
                new_row_list[5].style.display = "block";
            }

            let total_percent = 0;
            for (let i = 0; i < lister.length; i++) {
                total_percent += Math.round(Number(lister[i][3].textContent.replace("%", "")));
            }
            total_percent = total_percent / lister.length;
            total_element.textContent = `${Number(total_percent * percentage).toFixed(2)}%`;
            FinalCalculate();
        })
    }
    return new_row_list;
}

function RemoveRow(lister) {
    lister[lister.length - 1][0].remove()
    lister.pop()
    return lister;
}

document.getElementById(`add-quiz`).addEventListener("click", () => {
    LIST_QUIZ.push(AddRow("Quiz", QUIZ_INDEX, LIST_QUIZ, QUIZ_TOTAL, 0.1));
    QUIZ_INDEX += 1;
    RECITATION_INDEX += 1;
    LONGTEST_INDEX += 1;
    ATTENDANCE_INDEX += 1;
    PROJECT_INDEX += 1;
    EXAM_INDEX += 1;
});

document.getElementById(`add-recitation`).addEventListener("click", () => {
    LIST_RECITATION.push(AddRow("Recitation", RECITATION_INDEX, LIST_RECITATION, RECITATION_TOTAL, 0.15));
    RECITATION_INDEX += 1;
    LONGTEST_INDEX += 1;
    ATTENDANCE_INDEX += 1;
    PROJECT_INDEX += 1;
    EXAM_INDEX += 1;
});

document.getElementById(`add-longtest`).addEventListener("click", () => {
    LIST_LONGTEST.push(AddRow("Long Test", LONGTEST_INDEX, LIST_LONGTEST, LONGTEST_TOTAL, 0.15));
    LONGTEST_INDEX += 1;
    ATTENDANCE_INDEX += 1;
    PROJECT_INDEX += 1;
    EXAM_INDEX += 1;
});

document.getElementById(`add-project`).addEventListener("click", () => {
    LIST_PROJECT.push(AddRow("Project", PROJECT_INDEX, LIST_PROJECT, PROJECT_TOTAL, 0.35));
    PROJECT_INDEX += 1;
    EXAM_INDEX += 1;
});

document.getElementById(`remove-quiz`).addEventListener("click", () => {
    LIST_QUIZ = RemoveRow(LIST_QUIZ);
    QUIZ_INDEX -= 1;
    RECITATION_INDEX -= 1;
    LONGTEST_INDEX -= 1;
    ATTENDANCE_INDEX -= 1;
    PROJECT_INDEX -= 1;
    EXAM_INDEX -= 1;
});

document.getElementById(`remove-recitation`).addEventListener("click", () => {
    LIST_RECITATION = RemoveRow(LIST_RECITATION);
    RECITATION_INDEX -= 1;
    LONGTEST_INDEX -= 1;
    ATTENDANCE_INDEX -= 1;
    PROJECT_INDEX -= 1;
    EXAM_INDEX -= 1;
});

document.getElementById(`remove-longtest`).addEventListener("click", () => {
    LIST_LONGTEST = RemoveRow(LIST_LONGTEST);
    LONGTEST_INDEX -= 1;
    ATTENDANCE_INDEX -= 1;
    PROJECT_INDEX -= 1;
    EXAM_INDEX -= 1;
});

document.getElementById(`remove-project`).addEventListener("click", () => {
    LIST_PROJECT = RemoveRow(LIST_PROJECT);
    PROJECT_INDEX -= 1;
    EXAM_INDEX -= 1;
});

const attendance_max = document.getElementById("attendance-max");
const attendance_score = document.getElementById("attendance-score");
const exam_max = document.getElementById("exam-max");
const exam_score = document.getElementById("exam-score");
const attendance_percent = document.getElementById("attendance-grade");
const exam_percent = document.getElementById("exam-grade");

function ATTENDANCE() {
    attendance_percent.textContent =  Number((attendance_score.value / attendance_max.value) * 100).toFixed(2);
    ATTENDANCE_TOTAL.textContent = Number(Number(attendance_percent.textContent) * 0.05).toFixed(2) + "%";
    FinalCalculate();
}

function EXAM() {
    exam_percent.textContent =  Number((exam_score.value / exam_max.value) * 100).toFixed(2);
    EXAM_TOTAL.textContent = Number(Number(exam_percent.textContent) * 0.2).toFixed(2) + "%";
    FinalCalculate();
}

attendance_max.addEventListener("input", ATTENDANCE);
attendance_score.addEventListener("input", ATTENDANCE);
exam_max.addEventListener("input", EXAM);
exam_score.addEventListener("input", EXAM);

exam_score.value = 5;
exam_max.value = 5;
attendance_max.value = 5;
attendance_score.value = 5;

for (let i = 0; i < 2; i++) {
    LIST_QUIZ.push(AddRow("Quiz", QUIZ_INDEX, LIST_QUIZ, QUIZ_TOTAL, 0.1));
    QUIZ_INDEX += 1;
    RECITATION_INDEX += 1;
    LONGTEST_INDEX += 1;
    ATTENDANCE_INDEX += 1;
    PROJECT_INDEX += 1;
    EXAM_INDEX += 1;
}

for (let i = 0; i < 2; i++) {
    LIST_RECITATION.push(AddRow("Recitation", RECITATION_INDEX, LIST_RECITATION, RECITATION_TOTAL, 0.15));
    RECITATION_INDEX += 1;
    LONGTEST_INDEX += 1;
    ATTENDANCE_INDEX += 1;
    PROJECT_INDEX += 1;
    EXAM_INDEX += 1;
}

for (let i = 0; i < 2; i++) {
    LIST_LONGTEST.push(AddRow("Long Test", LONGTEST_INDEX, LIST_LONGTEST, LONGTEST_TOTAL, 0.15));
    LONGTEST_INDEX += 1;
    ATTENDANCE_INDEX += 1;
    PROJECT_INDEX += 1;
    EXAM_INDEX += 1;
}

for (let i = 0; i < 2; i++) {
    LIST_PROJECT.push(AddRow("Project", PROJECT_INDEX, LIST_PROJECT, PROJECT_TOTAL, 0.35));
    PROJECT_INDEX += 1;
    EXAM_INDEX += 1;
}

FinalCalculate();

INCENTIVES.addEventListener("input", FinalCalculate);