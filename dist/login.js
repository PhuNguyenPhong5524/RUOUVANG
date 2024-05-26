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
function check() {
    return __awaiter(this, void 0, void 0, function* () {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        if (email == "") {
            alert("Vui lòng điền email!");
            return false;
        }
        else if (parseInt(email) <= 0) {
            alert("Vui lòng không nhập số âm!");
            return false;
        }
        else if (email.length < 7) {
            alert("Vui lòng điền đủ kí tự!");
            return false;
        }
        else if (!email.endsWith("@gmail.com")) {
            alert("Email bắt buộc nhập đuôi @gmail.com!");
            return false;
        }
        if (password == "") {
            alert("Vui lòng điền password!");
            return false;
        }
        let response = yield fetch('http://localhost:3000/user');
        let users = yield response.json();
        let user = users.find(user => user.email == email);
        if (user) {
            if (user.password == password) {
                // Lưu trữ thông tin người dùng vào localStorage
                localStorage.setItem('user', JSON.stringify(user));
                if (user.role == 1) {
                    window.location.href = "http://127.0.0.1:5500/admin_product.html?id=" + user.id;
                }
                else {
                    window.location.href = "http://127.0.0.1:5500/index.html?id=" + user.id;
                }
            }
            else {
                alert("Mật khẩu không đúng!");
            }
        }
        else {
            alert("Tài khoản không tồn tại!");
        }
        return false;
    });
}
function thoat() {
    if (confirm("Bạn có chắc chắn muốn thoát không?")) {
        window.location.href = "http://127.0.0.1:5500/index.html";
    }
}
function showPass() {
    let x = document.getElementById("password");
    let password = x.value;
    if (x.type != "") {
        x.type = "********";
        if (x.type === "password") {
            x.type = "text";
        }
        else {
            x.type = "password";
        }
    }
    else if (parseInt(password) <= 0) {
        alert("Vui lòng không nhập số âm!");
        x.focus();
        x.style.backgroundColor = "#fec9c9";
    }
    else if (password.length < 5) {
        alert("Vui lòng điền đủ kí tự!");
        x.focus();
        x.style.backgroundColor = "#fec9c9";
    }
}
