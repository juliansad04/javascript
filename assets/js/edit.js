document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact");
  const submitButton = document.getElementById("form-submit");

  const urlParams = new URLSearchParams(window.location.search);
  const itemId = urlParams.get("id");

  let initialImageData;

  fetch(`http://localhost:3000/dataList/${itemId}`)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("itemName").value = data.name;
      document.getElementById("bidForItem").value = data.bid;
      document.getElementById("account").value = data.account;
      document.getElementById("dateOfItem").value = data.date;
      initialImageData = data.image;
    })
    .catch((error) => console.error("Error fetching item data:", error));

  submitButton.addEventListener("click", function () {
    const formData = {
      name: document.getElementById("itemName").value,
      bid: document.getElementById("bidForItem").value,
      account: document.getElementById("account").value,
      date: document.getElementById("dateOfItem").value,
      file: document.getElementById("file").files[0],
      image: initialImageData,
    };

    if (validateForm(formData)) {
      editItem(formData);
    }
  });

  function validateForm(formData) {
    const itemName = formData.name.trim();
    const bidForItem = formData.bid.trim();
    const account = formData.account.trim();
    const dateOfItem = formData.date.trim();
    const file = formData.file;

    if (itemName === "") {
      alert("Vui lòng nhập tên mục");
      return false;
    }

    if (bidForItem === "") {
      alert("Vui lòng nhập giá đấu cho mục");
      return false;
    }

    if (account === "") {
      alert("Vui lòng nhập tài khoản");
      return false;
    }

    if (dateOfItem === "") {
      alert("Vui lòng nhập ngày mục");
      return false;
    }

    return true;
  }

  function editItem(formData) {
    const dataWithImage = {
      name: formData.name,
      bid: formData.bid,
      account: formData.account,
      date: formData.date,
      image: formData.image,
    };

    if (formData.file) {
      convertImageToBase64(formData, dataWithImage);
    } else {
      sendDataToServer(dataWithImage);
    }
  }

  function convertImageToBase64(formData, dataWithImage) {
    const reader = new FileReader();

    reader.onload = function (event) {
      const base64String = event.target.result;
      dataWithImage.image = base64String;
      sendDataToServer(dataWithImage);
    };

    reader.readAsDataURL(formData.file);
  }

  function sendDataToServer(dataWithImage) {
    fetch(`http://localhost:3000/dataList/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataWithImage),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to edit item");
        }
        console.log("Item edited successfully");
        window.location.href = "index.html";
      })
      .catch((error) => console.error("Error editing item:", error));
  }
});
