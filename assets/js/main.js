document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:3000/dataList")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const itemListContainer = document.getElementById("itemList");
      data?.map((item) => {
        const itemHtml = `
              <div class="col-lg-4 col-md-6">
                <div class="item">
                  <div class="left-img">
                    <img src="${item.image}" alt="" onerror="console.error('Error loading image:', this.src)">
                </div>
                  <div class="right-content">
                    <h4>${item.name}</h4>
                    <a href="#">@${item.account}</a>
                    <h6>Bid: <em>${item.bid} ETH</em></h6>
                    <span class="date">${item.date}, 22:00</span>
                    <div class="button-main mt-2">
                      <a href="edit.html?id=${item.id}" class="btn btn-outline-light">edit</a>
                      <a href="#" class="btn btn-outline-light delete-btn" data-id="${item.id}">delete</a>
                    </div>
                  </div>
                </div>
              </div>
            `;
        itemListContainer.innerHTML += itemHtml;
      });

      const deleteButtons = document.querySelectorAll(".delete-btn");
      deleteButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
          event.preventDefault();
          const itemId = event.target.getAttribute("data-id");
          if (confirm("Bạn có chắc chắn muốn xóa?")) {
            deleteItem(itemId);
          }
        });
      });
    })
    .catch((error) => console.error("Error fetching data:", error));

  function deleteItem(itemId) {
    fetch(`http://localhost:3000/dataList/${itemId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete item");
        }
        console.log("Item deleted successfully");
      })
      .catch((error) => console.error("Error deleting item:", error));
  }
});
