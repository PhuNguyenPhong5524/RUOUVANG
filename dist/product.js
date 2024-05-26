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
function getProduct() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:3000/product');
        const data = yield response.json();
        return data.map((product, index) => ({
            id: product.id,
            id_Cate: product.id_Cate,
            hinh: product.hinh,
            tenSP: product.tenSP,
            Gia: product.Gia,
            DungTich: product.DungTich,
            DoManh: product.DoManh
        }));
    });
}
var i = 0;
function renderProduct(products) {
    const listProduct = document.querySelector('#sp');
    const htmls = products.map((product) => {
        if (product.id_Cate == 1 || product.id_Cate == 2 || product.id_Cate == 3) {
            return `
                <div class="col-md-3 mt-3 ">
                <div class="card" >
                    <a onclick="showCTProduct(${product.id})"><img src="${product.hinh}" class="card-img-top" alt="..."></a>
                    <div class="card-body">
                    <a href="#" class="card-title">${product.tenSP}</a >
                    <p class="card-text"><strong>${product.Gia}.000đ</strong></p>
                    <p class="card-text_dt">${product.DungTich} / ${product.DoManh}</p>
                    <a href="#" onclick='addCart(${i++})' class="btn">Thêm giỏ hàng</a>
                    </div>
                </div>
            </div>
            `;
        }
    });
    listProduct.innerHTML = htmls.join('');
}
function renderProduct2(products) {
    const listProduct = document.querySelector('#spuc');
    const htmls = products.map((product) => {
        if (product.id_Cate == 4) {
            return `
            <div class="col-md-3 mt-3 ">
            <div class="card" >
                <a onclick="showCTProduct(${product.id})"><img src="${product.hinh}" class="card-img-top" alt="..."></a>
                <div class="card-body">
                <a href="#" class="card-title">${product.tenSP}</a >
                <p class="card-text"><strong>${product.Gia}.000đ</strong></p>
                <p class="card-text_dt">${product.DungTich} / ${product.DoManh}</p>
                <a href="#" onclick='addCart(${i++})' class="btn">Thêm giỏ hàng</a>
                </div>
            </div>
        </div>
            `;
        }
    });
    listProduct.innerHTML = htmls.join('');
}
getProduct().then((products) => {
    renderProduct(products);
    renderProduct2(products);
});
let slStorage = localStorage.getItem('sl');
let cartStorage = localStorage.getItem('cart');
let sl = slStorage ? parseInt(slStorage) : 0;
let cart = cartStorage ? JSON.parse(cartStorage) : [];
function addCart(a) {
    return __awaiter(this, void 0, void 0, function* () {
        let products = yield getProduct();
        let productt = products[a];
        let check = cart.find((item) => item.id === productt.id);
        if (check) {
            check.quantity += 1;
        }
        else {
            productt.quantity = 1;
            cart.push(productt);
            sl++;
        }
        let slElement = document.getElementById("sl");
        if (slElement) {
            slElement.innerHTML = sl.toString();
        }
        else {
            console.error("Element with id 'sl' not found");
        }
        localStorage.setItem('sl', sl.toString());
        localStorage.setItem('cart', JSON.stringify(cart));
    });
}
function hienthigiohang() {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let str = "";
    let tongtienGiohang = 0;
    if (cart) {
        for (let i = 0; i < cart.length; i++) {
            let tongtien = cart[i].Gia * cart[i].quantity;
            tongtienGiohang += tongtien;
            str += `
                <tr style="text-align: center;">
                    <td>
                        <img src="${cart[i].hinh}" alt="" class="rounded-3" style="width:50px">
                    </td>
                    <td class="text-start" style="padding-top: 20px; font-weight: 550;width: 50%;padding-left: 100px;padding-right: 100px;">${cart[i].tenSP}</td>
                    <td class="text-end" style="padding-top: 20px; font-weight: 550;padding-left:20px ;">${cart[i].Gia}.000vnđ</td>
                    <td class="text-center" style="padding-top: 20px; font-weight: 550;padding-left: 55px;" >${cart[i].quantity}</td>
                    <td class="text-end" style="padding-top: 20px; font-weight: 550;">${tongtien.toFixed(3)}.000vnđ</td>
                    <td style="padding-top: 20px; font-weight: 550;">
                        <a href=""  class="btn btn-outline-danger btn-sm" onclick="delElement('${cart[i].id}')">Xóa</a>
                    </td>
                </tr>
                `;
        }
    }
    str += `<tr>
                <td class="text-end" colspan="4" style="font-weight: 700;font-size:20px" >Tổng thành tiền:</td>
                <td class="text-end" style="font-weight: 700;font-size:20px" >${tongtienGiohang.toFixed(3)}.000 VNĐ</td>
                <td>
                <a href=""  class="btn btn-outline-danger btn-sm" onclick="clearCart()">Xóa hết</a>
                </td>
                </tr>`;
    let cartElement = document.getElementById("cart");
    if (cartElement) {
        cartElement.innerHTML = str;
    }
    let thanhtien = document.getElementById("tt");
    if (thanhtien) {
        thanhtien.innerHTML = str;
    }
}
hienthigiohang();
function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let j = 0;
    let tong = 0;
    let tt = 0;
    let countElement = document.getElementById('count');
    if (countElement) {
        countElement.innerHTML = `
            <a style="color: #b7a054;"><i  onclick="show()" class="fa-solid fa-cart-shopping"></i></a>
            <div id="sl" class="header__cart-quanlity">${cart.length}</div>
            `;
    }
    if (cart.length === 0) {
        let hienspElement = document.getElementById('hiensp');
        if (hienspElement) {
            hienspElement.innerHTML = `
            <div><img src="src/img/bg_gh_index.webp" alt=""></div>
            <div style="font-size: 20px; color: rgba(67, 67, 67, 0.597);">Chưa có sản phẩm trong giỏ hàng...</div>
            `;
        }
    }
    else {
        let box_ic_vc = document.getElementById('box_ic_vc');
        if (box_ic_vc) {
            box_ic_vc.innerHTML = `
            <div id="vanchuyen">
            <div>Bạn đã được <strong>MIỄN PHÍ VẬN CHUYỂN</strong></div>
            </div> 
            <div id="icon_vc">
                <div style="border: 4px solid #f3a504; width: 420px;height: 0px; border-radius:6px;"></div>
                <div style="background: #f3a504;padding: 10px;border-radius: 20px; margin-left: -10px;font-size: 14px; color: #fff;"><i class="fa-solid fa-truck"></i></div>
            </div>
        `;
        }
        let hienspElement = document.getElementById('hiensp');
        if (hienspElement) {
            hienspElement.innerHTML = cart.map((items) => {
                let { id, tenSP, Gia, hinh, quantity } = items;
                tong = Gia * quantity;
                tt += tong;
                return (`
                    <div id="cartItem" class="cartItem2">
                        <div class="anh_Item">
                            <img id="anh${j}" src="${hinh}" alt="" width="70" height="70">
                        </div>
                        <div class="content_Item">
                            <div><strong>${tenSP}</strong></div>
                            <div style="font-size: 13px;">200 / xanh / 22cm</div>
                            <div class="btn_tg_sl">
                            <button>-</button>
                            <input id="quantity" type="text" value="${quantity}" readonly>
                            <button >+</button>
                            </div>
                        </div>
                        <div class="cloes_tt" style="display: flex; display: flex;flex-direction: column; align-content: flex-end;align-items: flex-end;margin: 3px;">
                            <div><i id="xoaspgh" onclick="delElement(${id})" class="fa-solid fa-xmark" ></i></div><br>
                            <div><strong>${tong.toFixed(3)}.000vnđ</strong></div>
                        </div>
                    </div>
                `);
            }).join('');
            let box_ic_vc = document.getElementById('box_ic_vc');
            if (box_ic_vc) {
                box_ic_vc.style.display = "block";
            }
            let box_tongtien = document.getElementById("box_tongtien");
            if (box_tongtien) {
                box_tongtien.style.display = "block";
            }
            let ttElement = document.getElementById('tt');
            if (ttElement) {
                ttElement.innerHTML = tt.toFixed(3) + ".000VNĐ";
            }
        }
    }
}
    function countCartItems() {
        let slStorage = localStorage.getItem('sl');
        let sl = slStorage ? parseInt(slStorage) : 0;
        let slElement = document.getElementById("sl");
        if (slElement) {
            slElement.innerHTML = sl.toString();
        }
        else {
            console.error("Lỗi không thể hiển thị");
        }
    }
    countCartItems();
function delElement(productId) {
    let result = confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?");
    if (result) {
        let index = cart.findIndex((item) => item.id == productId);
        if (index !== -1) {
            let removedItem = cart.splice(index, 1)[0];
            sl -= removedItem.quantity;
            if (sl < 0)
                sl = 0;
            localStorage.setItem('sl', sl.toString());
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        if (cart.length === 0) {
            let box_ic_vc = document.getElementById('box_ic_vc');
            if (box_ic_vc) {
                box_ic_vc.style.display = "none";
            }
            let box_tongtien = document.getElementById("box_tongtien");
            if (box_tongtien) {
                box_tongtien.style.display = "none";
            }
        }
    }
    displayCart();
    countCartItems();
}
function clearCart() {
    let result = confirm("Bạn có chắc chắn muốn xóa tất cả sản phẩm khỏi giỏ hàng?");
    if (result) {
        cart = [];
        sl = 0;
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('sl', sl.toString());
    }
    displayCart();
    countCartItems();
}
function hide() {
    document.getElementById("box_aside").style.display = "none";
}
function show() {
    document.getElementById("box_aside").style.display = "block";
    displayCart();
}
function showCTProduct(productId) {
    window.location.href = `http://127.0.0.1:5500/chitietsp.html?id=${productId}`;
}
function logout() {
    localStorage.removeItem('user');
    window.location.href = "http://127.0.0.1:5500/index.html";
    let iconElement = document.getElementById("icon_US");
    if (iconElement) {
        iconElement.style.display = "block";
    }
}
window.onload = () => {
    let user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.name) {
        let usernameElement = document.getElementById("username");
        let iconElement = document.getElementById("icon_US");
        if (usernameElement) {
            usernameElement.innerText = user.name;
        }
        if (iconElement) {
            iconElement.style.display = "none";
        }
    }
};
