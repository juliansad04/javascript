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
                    <img src="assets/images/${item.img}" alt="">
                  </div>
                  <div class="right-content">
                    <h4>${item.name}</h4>
                    <a href="#">@${item.account}</a>
                    <h6>Bid: <em>${item.bid} ETH</em></h6>
                    <span class="date">${item.date}, 22:00</span>
                    <div class="button-main mt-2">
                      <a href="" class="btn btn-outline-light">edit</a>
                      <a href="" class="btn btn-outline-light">delete</a>
                    </div>
                  </div>
                </div>
              </div>
            `;
        itemListContainer.innerHTML += itemHtml;
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});
