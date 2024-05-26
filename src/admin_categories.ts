let id_cate: string = "0";

type category = {
    id: string;
    tenDM: string;
};

async function fetchDataa(): Promise<void> {
    try {
        const response = await fetch('http://localhost:3000/category');
        const data: category[] = await response.json();
        id_cate = data[data.length - 1].id;
        console.log(data);
        console.log('Đã nhận được dữ liệu');
        render_Admin_Categorires(data);
        addCategories();
    } catch (error) {
        console.log('lỗi: ', error);
    }
}

fetchDataa();

async function postProduct(form: category): Promise<void> {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
    };
    const response = await fetch('http://localhost:3000/category', options);
    const data: category = await response.json();
    console.log('Danh mục đã được thêm thành công:', data);
}

function render_Admin_Categorires(category: category[]): void {
    const list_Admin_Categories = document.querySelector('#sp') as HTMLElement;
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

async function addCategories(): Promise<void> {
    const btn = document.querySelector('#submit') as HTMLElement;
    btn.onclick = async function() {
        const tenDM = (document.querySelector('input[name="tenDM"]') as HTMLInputElement).value;
        const form: category = {
            id: (Number(id_cate)+1).toString(), 
            tenDM: tenDM,
        };
        await postProduct(form);
        await fetchDataa();
    }
}


async function editCategories(id: string): Promise<void> {
    try {
        const response = await fetch(`http://localhost:3000/category/${id}`);
        const categories: category = await response.json();
        (document.querySelector('input[name="tenDM2"]') as HTMLInputElement).value = categories.tenDM;
        const btn = document.querySelector('#submit2') as HTMLElement;
        btn.onclick = function() {
            updateCategories(id);
        }
    } catch (error) {
        console.log('Lỗi khi tìm sản phẩm:', error);
    }
}

async function updateCategories(id: string): Promise<void> {
    const tenDM2 = (document.querySelector('input[name="tenDM2"]') as HTMLInputElement).value;
    const response = await fetch(`http://localhost:3000/category/${id}`, {
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
    } else {
        console.error('Chưa sửa được');
    }
}

async function delete_categories(id: string): Promise<void> {
    const confirmed = confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?');
    if (!confirmed) {
        return;
    }
    const options = {
        method: 'DELETE',
    }
    const response = await fetch(`http://localhost:3000/category/${id}`, options);
    const data: category = await response.json();
    console.log('Danh mục đã được xóa thành công');
    fetchData(); 
}

function SHOW(): void {
    const modal = document.getElementById("myModal") as HTMLElement;
    modal.style.display = "flex";
}

function an(): void {
    const modal = document.getElementById("myModal") as HTMLElement;
    modal.style.display = "none";
}

function SHOW2(id: string): void {
    const modal = document.getElementById("myModal2") as HTMLElement;
    modal.style.display = "block";
    editCategories(id);
}

window.onclick = function(event) {
    const modal = document.getElementById("myModal2") as HTMLElement;
    if (event.target == modal) {
      modal.style.display = "none";
    }
}






function logouttt(): void {
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