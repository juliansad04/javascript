class SinhVien {
  constructor(ten, ngaySinh, diemTrungBinh, maSinhVien) {
    this.ten = ten;
    this.ngaySinh = ngaySinh;
    this.diemTrungBinh = diemTrungBinh;
    this.maSinhVien = maSinhVien;
    this.monHoc = [];
  }

  themMonHoc(monHocMoi) {
    this.monHoc.push(monHocMoi);
  }
}
const sv = new SinhVien("Nguyen Van A", "01/01/2000", 8.5, "SV001");
sv.themMonHoc("Toan");
sv.themMonHoc("Van");
console.log(sv);
