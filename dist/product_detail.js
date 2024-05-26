"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const productAPI = 'http://localhost:3000/product';
function getctProduct(id, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${productAPI}/${id}`);
            const product = yield response.json();
            callback(product);
        }
        catch (err) {
            console.log(err);
        }
    });
}
window.onload = function () {
    const urlsp = new URLSearchParams(window.location.search);
    const productId = urlsp.get('id');
    if (productId) {
        getctProduct(productId, (product) => {
            if (product) {
                const showctsp = document.getElementById("showct");
                showctsp.innerHTML = `
                <div class="col-md-5">
            <div class="box-anh_lon-nho">
                <div class="box-anh_nho">
                    <div class="anh"><img width="100px" height="100px" onclick="anhct(${product.hinh})" src="${product.hinh}" alt=""></div>
                    <div class="anh"><img width="100px" height="100px" onclick="anhct(${product.hinh})" src="${product.hinh}" alt=""></div>
                </div>
                <div class="box-anh_lon">
                    <div class="anh_lon"><img height="420px" width="300px" src="${product.hinh}" alt=""></div>
                </div>
            </div>
            <div class="nut_muasam">
                <button type="button" class="btn btn1 btn-danger"><i class="fa-brands fa-opencart"></i> Thêm giỏ hàng</button>
                <button type="button" class="btn btn-danger"> Mua ngay</button>
            </div>
        </div>

        <div class="col-md-7">
            <div class="box_content-sp">
                <h2>${product.tenSP}</h2>
                <div class="thongtin_sach">
                    <div class="thongtin_sach-1">
                        <p>Loại vang: <strong>${product.Cate}</strong></p>
                        <p>Xuất xứ: <strong>${product.XuatXu}</strong></p>
                    </div>
                    <div class="thongtin_sach-2">
                        <p>Độ mạnh: <strong>${product.DoManh}</strong></p>
                        <p>Dung tích: <strong>${product.DungTich}</strong></p>
                    </div>
                </div>
                <div class="star">
                    <div class="icon_sao">
                        <div>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                    </div>
                    <div class="text_sao"><p> (500 đánh giá) </p></div>
                </div>
                <div class="row box_time_sale">
                    <div class="col-md-8 time_sale-thoigian">
                        <div class="thoigian">
                          <img src="src/img/flash sale.svg" alt="">
                            <span id="hours">00</span>
                            <h5>:</h5>
                            <span id="minutes">00</span>
                            <h5>:</h5>
                            <span id="seconds">00</span>
                        </div>
                    </div>
                    <div class="col-md-4 box_solieu">
                        <div class="solieu-1"><p>đã bán</p></div>
                        <div class="solieu-2"><p>Đã bán: 20</p></div>
                    </div>
                </div>
                <div class="box_giatien">
                    <div class="box_giatien_left">
                        <div class="giatien-1"><strong>${product.Gia}.000 đ</strong></div>
                        <div class="giatien-2"><p class="text-decoration-line-through">1.560.000</p></div>
                        <div class="giatien-3"><a>30%</a></div>
                    </div>
                    <div class="icon_share"><i class="fa-solid fa-share-nodes"></i></div>
                </div>

                <div class="box_thongtin_vanchuyen">
                    <div class="thongtin_vanchuyen1">
                        <p>Thời gian giao hàng</p>
                        <p>Chính sách đổi trả</p>
                    </div>
                    <div class="thongtin_vanchuyen2">
                        <p>Giao hàng đến <a href="#">Thay đổi</a></p>
                        <p>Đổi trả sản phẩm trong 30 ngày <a href="#">Xem thêm</a></p>
                    </div>
                </div>

                <div class="box_soluong">
                    <div class="text_soluong">
                        <p> Số lượng: </p>
                    </div>
                    <div class="btn-group btn-group-lg bg-danger">
                        <button type="button" class="btn btn-primary" value="-">-</button>
                        <button type="button" class="btn btn-primary" value="1">1</button>
                        <button type="button" class="btn btn-primary" value="+">+</button>
                      </div>
                      <div class="text_soluong">
                        <p> ( 100 sản phẩm có sẵn ) </p>
                    </div>
                </div>

            </div>
        </div>
                `;
                const showmtsp = document.getElementById("showmt");
                showmtsp.innerHTML = `
                     <p style="margin: 40px;text-align: center;"> ${product.moTa}  </p>
                `;
            }
            else {
                alert('Không tìm thấy sản phẩm!');
            }
        });
    }
};
