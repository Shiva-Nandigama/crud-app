const API_URL = "http://localhost:5000/students";

document.getElementById("studentForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const course = document.getElementById("course").value;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, age, course })
  });

  loadStudents();
  e.target.reset();
});

async function loadStudents() {
  const res = await fetch(API_URL);
  const students = await res.json();
  const list = document.getElementById("studentList");
  list.innerHTML = "";

  students.forEach(student => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${student.name} (${student.age}) - ${student.course}
      <button onclick="deleteStudent('${student._id}')">Delete</button>
    `;
    list.appendChild(li);
  });
}

async function deleteStudent(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  loadStudents();
}

// Load data on page load
loadStudents();
