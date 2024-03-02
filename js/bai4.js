document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/students")
    .then((response) => {
      const students = response.data;
      const studentTableBody = document.getElementById("studentTableBody");

      students.forEach((student) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${student.name}</td>
                    <td>${student.birthday}</td>
                    <td>${student.gpa}</td>
                    <td>${student.studentID}</td>
                `;
        studentTableBody.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});
