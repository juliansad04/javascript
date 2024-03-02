document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.querySelector("#name").value;
    const dob = document.querySelector("#dob").value;
    const gpa = document.querySelector("#gpa").value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const studentID = document.querySelector("#studentID").value;

    let genderValue = "";
    if (gender) {
      genderValue = gender.value;
    }

    const student = {
      name: name,
      birthday: dob,
      gpa: parseFloat(gpa),
      gender: genderValue,
      studentID: studentID,
    };

    axios
      .get("http://localhost:3000/students?studentID=" + student.studentID)
      .then((response) => {
        if (response.data.length > 0) {
          alert("Mã sinh viên đã tồn tại. Vui lòng chọn mã sinh viên khác.");
        } else {
          axios
            .post("http://localhost:3000/students", student)
            .then(() => {
              window.location.href = "bai4.html";

              form.reset();
            })
            .catch((error) => {
              console.error("Lỗi khi thêm sinh viên:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Lỗi khi kiểm tra mã sinh viên:", error);
      });
  });
});
