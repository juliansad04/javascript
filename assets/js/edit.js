document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact");
  const submitButton = document.getElementById("form-submit");

  const urlParams = new URLSearchParams(window.location.search);
  const itemId = urlParams.get("id");

  fetch(`http://localhost:3000/dataList/${itemId}`)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("itemName").value = data.name;
      document.getElementById("bidForItem").value = data.bid;
      document.getElementById("account").value = data.account;
      document.getElementById("dateOfItem").value = data.date;
    })
    .catch((error) => console.error("Error fetching item data:", error));

  submitButton.addEventListener("click", function () {
    const formData = {
      name: document.getElementById("itemName").value,
      bid: document.getElementById("bidForItem").value,
      account: document.getElementById("account").value,
      date: document.getElementById("dateOfItem").value,
      file: document.getElementById("file").files[0],
    };

    editItem(formData);
  });

  function editItem(formData) {
    fetch(`http://localhost:3000/dataList/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
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
