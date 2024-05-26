let idsvus = 0;

async function fetchDATA(): Promise<void> {
    try {
        const response = await fetch('http://localhost:3000/user');
        const data: any = await response.json();
        console.log(data);
        idsvus = data[data.length - 1].id;
        console.log('Đã nhận được dữ liệu');
        addUser();
        render_Admin_Userr(data);
    } catch (error) {
        console.log('lỗi: ', error);
    }
}
fetchDATA();

function render_Admin_Userr(User: any[]): void {
    const list_Admin_User = document.querySelector('#user') as HTMLElement;
    const htmls = User.map(function(e){
        (document.getElementById("soUS") as HTMLElement).innerHTML  = User.length.toString();
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
        `
    });
    
    list_Admin_User.innerHTML = htmls.join('');
}

async function addUser(): Promise<void> {
    const btn = document.querySelector('#submit') as HTMLButtonElement;
    btn.onclick = async function() {
        const name = (document.querySelector('input[name="name"]') as HTMLInputElement).value; 
        const email = (document.querySelector('input[name="email"]') as HTMLInputElement).value;
        const phone = (document.querySelector('input[name="phone"]') as HTMLInputElement).value;
        const Role = (document.querySelector('.Role') as HTMLSelectElement).value;
        const form = {
            id: String(++idsvus),
            name: name,
            email: email,
            phone: phone,
            role: Role,
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        }
        try {
            const response = await fetch('http://localhost:3000/user', options);
            const data = await response.json();
            console.log('Sản phẩm đã được thêm thành công:', data);
            fetchDATA(); 
        } catch (error) {
            console.log('Lỗi khi thêm user:', error);
        }
    }
}

async function suaTaiKhoan(id: number): Promise<void> {
    try {
        const response = await fetch(`http://localhost:3000/user/${id}`);
        const user = await response.json();
        console.log(user);
        (document.querySelector('input[name="name2"]') as HTMLInputElement).value = user.name;
        (document.querySelector('input[name="email2"]') as HTMLInputElement).value = user.email;
        (document.querySelector('input[name="phone2"]') as HTMLInputElement).value = user.phone;
        (document.querySelector('.role2') as HTMLSelectElement).value = user.role;
        const btn = document.querySelector('#submit2') as HTMLButtonElement;
        btn.onclick = function() {
            capNhatUser(id);
        }
    } catch (error) {
        console.log('Lỗi khi tìm sản phẩm:', error);
    }
}

async function capNhatUser(id: number): Promise<void> {
    const name2 = (document.querySelector('input[name="name2"]') as HTMLInputElement).value; 
    const email2 = (document.querySelector('input[name="email2"]') as HTMLInputElement).value;
    const phone2 = (document.querySelector('input[name="phone2"]') as HTMLInputElement).value;
    const role2 = (document.querySelector('.role2') as HTMLSelectElement).value;
    const Response = await fetch(`http://localhost:3000/user/${id}`, {
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
    } else {
        console.error('Chưa sửa được');
    }
}

function Xoaus(id: number): void {
    const confirmed = confirm('Bạn có chắc chắn muốn xóa tài khoản này không?');
    if (!confirmed) {
        return;
    }
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    fetch(`http://localhost:3000/user/${id}`, options)
        .then((response) => response.json())
        .then(() => {
            console.log('User đã được xóa thành công');
            fetchDATA(); 
        })
}
function show3(): void {
    const modal = document.getElementById("myModal") as HTMLElement;
    modal.style.display = "block";
}

window.onclick = function(event: MouseEvent) {
    const modal = document.getElementById("myModal") as HTMLElement;
    if (event.target == modal) {
      modal.style.display = "none";
    }
}

function show4(id: number): void {
    const modal = document.getElementById("myModal2") as HTMLElement;
    modal.style.display = "block";
    suaTaiKhoan(id);
}

window.onclick = function(event: MouseEvent) {
    const modal = document.getElementById("myModal2") as HTMLElement;
    if (event.target == modal) {
      modal.style.display = "none";
    }
}

function logoutus(): void {
    localStorage.removeItem('user');
    window.location.href = "http://127.0.0.1:5500/index.html";
    (document.getElementById("icon_US") as HTMLElement).style.display = "block";
}
