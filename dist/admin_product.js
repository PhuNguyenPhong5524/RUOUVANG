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
let id = "0";
function fetchData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('http://localhost:3000/product');
            const data = yield response.json();
            id = data[data.length - 1].id;
            console.log(data);
            console.log('Đã nhận được dữ liệu');
            render_Admin_Product(data);
            addProduct();
        }
        catch (error) {
            console.log('lỗi: ', error);
        }
    });
}
fetchData();
function render_Admin_Product(product) {
    const list_Admin_Product = document.querySelector('#sp');
    const htmls = product.map((e) => {
        document.getElementById("soSP").innerHTML = product.length.toString();
        return `
        <tr>
            <td><img src="${e.hinh}" alt="" width="80" height="80px"></td>
            <td>${e.id}</td>
            <td>${e.tenSP}</td>
            <td>${e.Gia}.000 vnđ</td>
            <td style="font-size:12px;">${e.moTa}</td>
            <td>${e.id_Cate}</td>
            <td class="box_btn"">
                <button class="btn1" onclick="show2(${e.id})" type="button">Sửa</button>
                <button class="btn2" onclick="Xoasp(${e.id})" type="button">Xóa</button>
            </td>
        </tr>
        `;
    });
    list_Admin_Product.innerHTML = htmls.join('');
}
function addProduct() {
    return __awaiter(this, void 0, void 0, function* () {
        const btn = document.querySelector('#submit');
        btn.onclick = function () {
            return __awaiter(this, void 0, void 0, function* () {
                const hinh = document.querySelector('input[name="hinh"]').value.split('\\').pop();
                const tenSP = document.querySelector('input[name="tenSP"]').value;
                const Gia = document.querySelector('input[name="Gia"]').value;
                const moTa = document.querySelector('input[name="moTa"]').value;
                const id_Cate = document.querySelector('.danhmuc').value;
                const form = {
                    id: (Number(id) + 1).toString(),
                    hinh: `src/img/${hinh}`,
                    tenSP: tenSP,
                    Gia: Number(Gia),
                    moTa: moTa,
                    id_Cate: Number(id_Cate),
                };
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(form)
                };
                try {
                    const response = yield fetch('http://localhost:3000/product', options);
                    const data = yield response.json();
                    console.log('Sản phẩm đã được thêm thành công:', data);
                    fetchData();
                }
                catch (error) {
                    console.log('Lỗi khi thêm sản phẩm:', error);
                }
            });
        };
    });
}
function suaSanPham(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`http://localhost:3000/product/${id}`);
            const sanPham = yield response.json();
            document.querySelector('input[name="tenSP2"]').value = sanPham.tenSP;
            document.querySelector('input[name="Gia2"]').value = sanPham.Gia.toString();
            document.querySelector('input[name="moTa2"]').value = sanPham.moTa;
            document.querySelector('.danhmuc2').value = sanPham.id_Cate.toString();
            const btn = document.querySelector('#submit2');
            btn.onclick = function () {
                capNhatSanPham(id);
            };
        }
        catch (error) {
            console.log('Lỗi khi tìm sản phẩm:', error);
        }
    });
}
function capNhatSanPham(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const tenSP2 = document.querySelector('input[name="tenSP2"]').value;
        const hinh2 = document.querySelector('input[name="hinh2"]').value.split('\\').pop();
        const Gia2 = document.querySelector('input[name="Gia2"]').value;
        const moTa2 = document.querySelector('input[name="moTa2"]').value;
        const id_Cate2 = document.querySelector('.danhmuc2').value;
        const hinh2Path = `src/img/${hinh2}`;
        const response = yield fetch(`http://localhost:3000/product/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tenSP: tenSP2,
                hinh: hinh2Path,
                Gia: Number(Gia2),
                moTa: moTa2,
                id_Cate: Number(id_Cate2),
            }),
        });
        if (response.ok) {
            fetchData();
        }
        else {
            console.error('Chưa sửa được');
        }
    });
}
function show2(id) {
    const modal = document.getElementById("myModal2");
    modal.style.display = "block";
    suaSanPham(id);
}
function Xoasp(id) {
    const confirmed = confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?');
    if (!confirmed) {
        return;
    }
    const options = {
        method: 'DELETE',
    };
    fetch(`http://localhost:3000/product/${id}`, options)
        .then((response) => response.json())
        .then(() => {
        console.log('Sản phẩm đã được xóa thành công');
        fetchData();
    });
}
function showw() {
    const modal = document.getElementById("myModal");
    modal.style.display = "block";
}
window.onclick = function (event) {
    const modal = document.getElementById("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
window.onclick = function (event) {
    const modal = document.getElementById("myModal2");
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
function logoutt() {
    localStorage.removeItem('user');
    window.location.href = "http://127.0.0.1:5500/index.html";
    document.getElementById("icon_US").style.display = "block";
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
