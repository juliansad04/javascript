document
  .getElementById("form-submit")
  .addEventListener("click", function (event) {
    event.preventDefault();

    const formData = {
      name: document.getElementById("itemName").value,
      bid: document.getElementById("bidForItem").value,
      account: document.getElementById("account").value,
      date: document.getElementById("dateOfItem").value,
      file: document.getElementById("file").files[0],
    };

    console.log(formData);
    convertImageToBase64(formData);
  });

function convertImageToBase64(formData) {
  if (formData.file) {
    const reader = new FileReader();

    reader.onload = function (event) {
      const base64String = event.target.result;
      const dataWithImage = {
        name: formData.name,
        bid: formData.bid,
        account: formData.account,
        date: formData.date,
        image: base64String,
      };
      sendDataToServer(dataWithImage);
    };

    reader.readAsDataURL(formData.file);
  } else {
    console.error("No file selected");
  }
}

function sendDataToServer(dataWithImage) {
  fetch("http://localhost:3000/dataList", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataWithImage),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error submitting form");
      }
      console.log("Form submitted successfully");
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
