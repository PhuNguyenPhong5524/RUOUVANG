
let id: string = "0";
type Product1 = {
    id: string;
    id_Cate: number;
    hinh: string;
    tenSP: string;
    Gia: number;
    moTa: string;
}

async function fetchData(): Promise<void> {
    try {
        const response = await fetch('http://localhost:3000/product');
        const data: Product1[] = await response.json();
        id = data[data.length - 1].id; 
        console.log(data);
        console.log('Đã nhận được dữ liệu');
        render_Admin_Product(data);
        addProduct();
    } catch (error) {
        console.log('lỗi: ', error);
    }
}

fetchData();

function render_Admin_Product(product: Product1[]): void {
    const list_Admin_Product = document.querySelector('#sp');
    const htmls = product.map((e) => {
        document.getElementById("soSP")!.innerHTML = product.length.toString();
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
    
    list_Admin_Product!.innerHTML = htmls.join('');
}

async function addProduct(): Promise<void> {
    const btn = document.querySelector('#submit') as HTMLElement;
    btn.onclick = async function() {
        const hinh = (document.querySelector('input[name="hinh"]') as HTMLInputElement).value.split('\\').pop();
        const tenSP = (document.querySelector('input[name="tenSP"]') as HTMLInputElement).value;
        const Gia = (document.querySelector('input[name="Gia"]') as HTMLInputElement).value;
        const moTa = (document.querySelector('input[name="moTa"]') as HTMLInputElement).value;
        const id_Cate = (document.querySelector('.danhmuc') as HTMLSelectElement).value;
        const form: Product1 = {
            id: (Number(id)+1).toString(), 
            hinh: `src/img/${hinh}`,
            tenSP: tenSP,
            Gia:Number(Gia),
            moTa: moTa,
            id_Cate: Number(id_Cate),
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        }
        try {
            const response = await fetch('http://localhost:3000/product', options);
            const data: Product1 = await response.json();
            console.log('Sản phẩm đã được thêm thành công:', data);
            fetchData(); 
        } catch (error) {
            console.log('Lỗi khi thêm sản phẩm:', error);
        }
    }
}


async function suaSanPham(id: number): Promise<void> {

    try {
        const response = await fetch(`http://localhost:3000/product/${id}`);
        const sanPham: Product1 = await response.json();
        (document.querySelector('input[name="tenSP2"]') as HTMLInputElement).value = sanPham.tenSP;
        (document.querySelector('input[name="Gia2"]') as HTMLInputElement).value = sanPham.Gia.toString();
        (document.querySelector('input[name="moTa2"]') as HTMLInputElement).value = sanPham.moTa;
        (document.querySelector('.danhmuc2') as HTMLSelectElement).value = sanPham.id_Cate.toString();
        
        const btn = document.querySelector('#submit2') as HTMLElement;
        btn.onclick = function() {
            capNhatSanPham(id);
        }
    } catch (error) {
        console.log('Lỗi khi tìm sản phẩm:', error);
    }
}

async function capNhatSanPham(id: number): Promise<void> {
    const tenSP2 = (document.querySelector('input[name="tenSP2"]') as HTMLInputElement).value;
    const hinh2 = (document.querySelector('input[name="hinh2"]') as HTMLInputElement).value.split('\\').pop();
    const Gia2 = (document.querySelector('input[name="Gia2"]') as HTMLInputElement).value;
    const moTa2 = (document.querySelector('input[name="moTa2"]') as HTMLInputElement).value;
    const id_Cate2 = (document.querySelector('.danhmuc2') as HTMLSelectElement).value;
    const hinh2Path = `src/img/${hinh2}`; 
    const response = await fetch(`http://localhost:3000/product/${id}`, {
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
    } else {
        console.error('Chưa sửa được');
    }
}



function show2(id: number): void {
    const modal = document.getElementById("myModal2");
    modal!.style.display = "block";
    suaSanPham(id);
}

function Xoasp(id: number): void {
    const confirmed = confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?');
    if (!confirmed) {
        return;
    }
    const options = {
        method: 'DELETE',
    }
    fetch(`http://localhost:3000/product/${id}`, options)
        .then((response) => response.json())
        .then(() => {
            console.log('Sản phẩm đã được xóa thành công');
            fetchData(); 
        })
}

function showw(): void {
    const modal = document.getElementById("myModal");
    modal!.style.display = "block";
}

window.onclick = function(event: MouseEvent): void {
    const modal = document.getElementById("myModal");
    if (event.target == modal) {
      modal!.style.display = "none";
    }
}

window.onclick = function(event: MouseEvent): void {
    const modal = document.getElementById("myModal2");
    if (event.target == modal) {
      modal!.style.display = "none";
    }
}

function logoutt(): void {
    localStorage.removeItem('user');
    window.location.href = "http://127.0.0.1:5500/index.html";
    document.getElementById("icon_US")!.style.display = "block";
}
window.onload = (): void => {
    let user: any = JSON.parse(localStorage.getItem('user') || '{}');
    if(user && user.name) {
        let usernameElement = document.getElementById("username");
        let iconElement = document.getElementById("icon_US");
        if(usernameElement) {
            usernameElement.innerText = user.name;
        }
        if(iconElement) {
            iconElement.style.display = "none";
        }
    }
}