const API_URL = "http://localhost:3001/students";
const getBtn = document.getElementById("get-students-btn");
const tableBody = document.querySelector("#students-table tbody");
const addForm = document.getElementById("add-student-form");
async function getStudents() {
    const response = await fetch(API_URL);
    const students = await response.json();
    renderStudents(students);
}
function renderStudents(students) {
    tableBody.innerHTML = students.map((student)=>`
      <tr>
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.course}</td>
        <td>${student.skills.join(", ")}</td>
        <td>${student.email}</td>
        <td>${student.isEnrolled ? "\u2705" : "\u274C"}</td>
        <td>
          <button data-action="update" data-id="${student.id}">\u{41E}\u{43D}\u{43E}\u{432}\u{438}\u{442}\u{438}</button>
          <button data-action="delete" data-id="${student.id}">\u{412}\u{438}\u{434}\u{430}\u{43B}\u{438}\u{442}\u{438}</button>
        </td>
      </tr>
    `).join("");
}
async function addStudent(e) {
    e.preventDefault();
    const newStudent = {
        name: document.getElementById("name").value,
        age: Number(document.getElementById("age").value),
        course: document.getElementById("course").value,
        skills: document.getElementById("skills").value.split(",").map((s)=>s.trim()),
        email: document.getElementById("email").value,
        isEnrolled: document.getElementById("isEnrolled").checked
    };
    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newStudent)
    });
    addForm.reset();
    getStudents();
}
async function updateStudent(id) {
    const newCourse = prompt("\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u043D\u043E\u0432\u0438\u0439 \u043A\u0443\u0440\u0441:");
    if (!newCourse) return;
    await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            course: newCourse
        })
    });
    getStudents();
}
async function deleteStudent(id) {
    if (!confirm("\u0412\u0438 \u0432\u043F\u0435\u0432\u043D\u0435\u043D\u0456, \u0449\u043E \u0445\u043E\u0447\u0435\u0442\u0435 \u0432\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u0430?")) return;
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });
    getStudents();
}
getBtn.addEventListener("click", getStudents);
addForm.addEventListener("submit", addStudent);
tableBody.addEventListener("click", (e)=>{
    const btn = e.target.closest("button");
    if (!btn) return;
    const id = btn.dataset.id;
    const action = btn.dataset.action;
    if (action === "delete") deleteStudent(id);
    if (action === "update") updateStudent(id);
});

//# sourceMappingURL=goiteens-hw-crud.579125c3.js.map
