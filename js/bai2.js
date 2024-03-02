const tongSoChan = (mangSo) => {
  return mangSo.reduce((tong, so) => {
    if (so % 2 === 0) {
      return tong + so;
    }
    return tong;
  }, 0);
};

const mangSo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log("Tổng số chẵn trong mảng:", tongSoChan(mangSo));
