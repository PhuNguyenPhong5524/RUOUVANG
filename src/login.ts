async function check(): Promise<boolean> {
    let email: string = (<HTMLInputElement>document.getElementById("email")).value;
    let password: string = (<HTMLInputElement>document.getElementById("password")).value;
    if(email == ""){
        alert("Vui lòng điền email!");
        return false;
    } else if(parseInt(email)<=0){
        alert("Vui lòng không nhập số âm!");
        return false;
    } else if(email.length <7){
        alert("Vui lòng điền đủ kí tự!");
        return false;
    } else if(!email.endsWith("@gmail.com")){
        alert("Email bắt buộc nhập đuôi @gmail.com!");
        return false;
    }
    if(password == ""){
        alert("Vui lòng điền password!");
        return false;
    }

    let response: Response = await fetch('http://localhost:3000/user');
    let users: any[] = await response.json();
    let user: any = users.find(user => user.email == email);
    
    if(user) {
        if(user.password == password){
            // Lưu trữ thông tin người dùng vào localStorage
            localStorage.setItem('user', JSON.stringify(user));
            if(user.role == 1) {
                window.location.href = "http://127.0.0.1:5500/admin_product.html?id=" + user.id;
            } else {
                window.location.href = "http://127.0.0.1:5500/index.html?id=" + user.id;
            }
        } else {
            alert("Mật khẩu không đúng!");
        }
    } else {
        alert("Tài khoản không tồn tại!");
    }
    return false;
}

function thoat(): void {
    if (confirm("Bạn có chắc chắn muốn thoát không?")) {
        window.location.href = "http://127.0.0.1:5500/index.html";
    } 
}
function showPass(): void {
    let x: HTMLInputElement = <HTMLInputElement>document.getElementById("password");
    let password: string = x.value;
    if(x.type != ""){
        x.type = "********";
        if(x.type === "password"){
            x.type = "text";
        }else{
            x.type = "password";
        }
    }else if(parseInt(password)<=0){
        alert("Vui lòng không nhập số âm!");
        x.focus();
        x.style.backgroundColor= "#fec9c9";
    }else if(password.length <5){
        alert("Vui lòng điền đủ kí tự!");
        x.focus();
        x.style.backgroundColor= "#fec9c9";
    }
}

