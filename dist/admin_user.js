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
let idsvus = 0;
function fetchDATA() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('http://localhost:3000/user');
            const data = yield response.json();
            console.log(data);
            idsvus = data[data.length - 1].id;
            console.log('Đã nhận được dữ liệu');
            addUser();
            render_Admin_Userr(data);
        }
        catch (error) {
            console.log('lỗi: ', error);
        }
    });
}
fetchDATA();
function render_Admin_Userr(User) {
    const list_Admin_User = document.querySelector('#user');
    const htmls = User.map(function (e) {
        document.getElementById("soUS").innerHTML = User.length.toString();
        const role = e.role == 1 ? "Admin" : "Khách hàng";
        return `
        <tr>
            <td>${e.name}</td>
            <td>${e.email}</td>
            <td>${e.phone}</td>
            <td >${role}</td>
            <td class="box_btn"">
                <button class="btn1" onclick="show4(${e.id})" type="button">Sửa</button>
                <button class="btn2" onclick="Xoaus(${e.id})" type="button">Xóa</button>
            </td>
        </tr>
        `;
    });
    list_Admin_User.innerHTML = htmls.join('');
}
function addUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const btn = document.querySelector('#submit');
        btn.onclick = function () {
            return __awaiter(this, void 0, void 0, function* () {
                const name = document.querySelector('input[name="name"]').value;
                const email = document.querySelector('input[name="email"]').value;
                const phone = document.querySelector('input[name="phone"]').value;
                const Role = document.querySelector('.Role').value;
                const form = {
                    id: String(++idsvus),
                    name: name,
                    email: email,
                    phone: phone,
                    role: Role,
                };
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(form)
                };
                try {
                    const response = yield fetch('http://localhost:3000/user', options);
                    const data = yield response.json();
                    console.log('Sản phẩm đã được thêm thành công:', data);
                    fetchDATA();
                }
                catch (error) {
                    console.log('Lỗi khi thêm user:', error);
                }
            });
        };
    });
}
function suaTaiKhoan(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`http://localhost:3000/user/${id}`);
            const user = yield response.json();
            console.log(user);
            document.querySelector('input[name="name2"]').value = user.name;
            document.querySelector('input[name="email2"]').value = user.email;
            document.querySelector('input[name="phone2"]').value = user.phone;
            document.querySelector('.role2').value = user.role;
            const btn = document.querySelector('#submit2');
            btn.onclick = function () {
                capNhatUser(id);
            };
        }
        catch (error) {
            console.log('Lỗi khi tìm sản phẩm:', error);
        }
    });
}
function capNhatUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const name2 = document.querySelector('input[name="name2"]').value;
        const email2 = document.querySelector('input[name="email2"]').value;
        const phone2 = document.querySelector('input[name="phone2"]').value;
        const role2 = document.querySelector('.role2').value;
        const Response = yield fetch(`http://localhost:3000/user/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name2,
                email: email2,
                phone: phone2,
                role: role2,
            }),
        });
        if (Response.ok) {
            fetchDATA();
        }
        else {
            console.error('Chưa sửa được');
        }
    });
}
function Xoaus(id) {
    const confirmed = confirm('Bạn có chắc chắn muốn xóa tài khoản này không?');
    if (!confirmed) {
        return;
    }
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    fetch(`http://localhost:3000/user/${id}`, options)
        .then((response) => response.json())
        .then(() => {
        console.log('User đã được xóa thành công');
        fetchDATA();
    });
}
function show3() {
    const modal = document.getElementById("myModal");
    modal.style.display = "block";
}
window.onclick = function (event) {
    const modal = document.getElementById("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
function show4(id) {
    const modal = document.getElementById("myModal2");
    modal.style.display = "block";
    suaTaiKhoan(id);
}
window.onclick = function (event) {
    const modal = document.getElementById("myModal2");
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
function logoutus() {
    localStorage.removeItem('user');
    window.location.href = "http://127.0.0.1:5500/index.html";
    document.getElementById("icon_US").style.display = "block";
}
