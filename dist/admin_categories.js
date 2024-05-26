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
let id_cate = "0";
function fetchDataa() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('http://localhost:3000/category');
            const data = yield response.json();
            id_cate = data[data.length - 1].id;
            console.log(data);
            console.log('Đã nhận được dữ liệu');
            render_Admin_Categorires(data);
            addCategories();
        }
        catch (error) {
            console.log('lỗi: ', error);
        }
    });
}
fetchDataa();
function postProduct(form) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        };
        const response = yield fetch('http://localhost:3000/category', options);
        const data = yield response.json();
        console.log('Danh mục đã được thêm thành công:', data);
    });
}
function render_Admin_Categorires(category) {
    const list_Admin_Categories = document.querySelector('#sp');
    const htmls = category.map((e) => {
        let sspElement = document.getElementById("soSP");
        if (sspElement) {
            sspElement.innerHTML = category.length.toString();
        }
        return `
        <tr>
            <td>${e.id}</td>
            <td>${e.tenDM}</td>
            <td class="box_btn">
                <button class="btn1" onclick="SHOW2(${e.id})" type="button">Sửa</button>
                <button class="btn2" onclick="delete_categories(${e.id})" type="button">Xóa</button>
            </td>
        </tr>
        `;
    });
    list_Admin_Categories.innerHTML = htmls.join('');
}
function addCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        const btn = document.querySelector('#submit');
        btn.onclick = function () {
            return __awaiter(this, void 0, void 0, function* () {
                const tenDM = document.querySelector('input[name="tenDM"]').value;
                const form = {
                    id: (Number(id_cate) + 1).toString(),
                    tenDM: tenDM,
                };
                yield postProduct(form);
                yield fetchDataa();
            });
        };
    });
}
function editCategories(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`http://localhost:3000/category/${id}`);
            const categories = yield response.json();
            document.querySelector('input[name="tenDM2"]').value = categories.tenDM;
            const btn = document.querySelector('#submit2');
            btn.onclick = function () {
                updateCategories(id);
            };
        }
        catch (error) {
            console.log('Lỗi khi tìm sản phẩm:', error);
        }
    });
}
function updateCategories(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const tenDM2 = document.querySelector('input[name="tenDM2"]').value;
        const response = yield fetch(`http://localhost:3000/category/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tenDM: tenDM2,
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
function delete_categories(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const confirmed = confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?');
        if (!confirmed) {
            return;
        }
        const options = {
            method: 'DELETE',
        };
        const response = yield fetch(`http://localhost:3000/category/${id}`, options);
        const data = yield response.json();
        console.log('Danh mục đã được xóa thành công');
        fetchData();
    });
}
function SHOW() {
    const modal = document.getElementById("myModal");
    modal.style.display = "flex";
}
function an() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
}
function SHOW2(id) {
    const modal = document.getElementById("myModal2");
    modal.style.display = "block";
    editCategories(id);
}
window.onclick = function (event) {
    const modal = document.getElementById("myModal2");
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
function logouttt() {
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
