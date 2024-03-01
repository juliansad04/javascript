document.getElementById("contact").addEventListener("submit", function (event) {
  event.preventDefault();

  document.getElementById("form-submit").disabled = true;

  const formData = {
    name: document.getElementById("itemName").value,
    bid: document.getElementById("bidForItem").value,
    account: document.getElementById("account").value,
    date: document.getElementById("dateOfItem").value,
    file: document.getElementById("file").files[0],
  };

  console.log(formData);
  convertImageToBase64(formData.file);
});

function convertImageToBase64(file) {
  const reader = new FileReader();

  reader.onload = function (event) {
    const base64String = event.target.result;
    sendDataToServer(base64String);
  };

  reader.readAsDataURL(file);
}

function sendDataToServer(base64String) {
  fetch("http://localhost:3000/dataList", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image: base64String }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error submitting form");
      }
      console.log("Form submitted successfully");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
