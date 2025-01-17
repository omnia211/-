//     CRUD
// C:Create.....R:Read......U:Update.....D:Delete...(for data)
// اول اما اسمع برنامج وفيه داتا يجى فى بالى كراد اول حاجة
//S:Search ... وبكده هيبقى اسمها cruds

//the project

let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create'
let tmp;

// لازمن اتيست الاوبجيكتس دول علشان اعرف لو كتبت حاجة غلط
//console.log(title, price, taxes, ads, discount, total, count, category, sumbit)

//get total

function getTotal() {
    // console.log('done');
    if (price.value != '') {
        //+ لما بتتكتب جمب اى سترينج بتتحول لرقم واحنا لازمن نحولها لانتجر علشان بدخل ارقام 
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#f23838';
    }
    else {
        total.innerHTML = '';
        total.style.background = ' rgb(156, 145, 145)';
    }
}


//create product

let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);
} else {
    dataPro = [];
}


submit.onclick = function () {
    let newPro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    }

    if (title.value != '') {
        if (mood === 'create') {
            if (newPro.count > 1) {
                for (i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                }
            } else {
                dataPro.push(newPro);
            }
        } else {
            dataPro[tmp] = newPro;
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }
        clearData();
    }

    //localStorage عملتها علشان لما اجى اعمل ريلود للصفحة الداتا متتمسحش
    localStorage.setItem('product', JSON.stringify(dataPro))
    console.log(dataPro)

    showData();
}


//clear inputs
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
}

//show or read data
function showData() {
    getTotal();
    let table = '';
    for (i = 0; i < dataPro.length; i++) {
        table += `
    <tr>
        <td>${i + 1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button  id="delete" onclick="deleteData( ${i})" >delete</button></td>
    </tr>
`;

    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if (dataPro.length > 0) {
        btnDelete.innerHTML = '<button onclick="deleteAll()">Delete All</button>'

    } else {
        btnDelete.innerHTML = '';
    }
}
showData();

//delete

function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}

function deleteAll() {
    localStorage.clear();    //علشان امسح الداتا من اللوكال
    dataPro.splice(0);   //علشان امسح الداتا من الاراى لان الداتا الى بتتعرض بتبقى موجودة فى الاراى وكاتبه زيرو علشان الداتا تتمسح من اول لاخرها 
    showData();
}
0


//update

function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    getTotal();
    count.style.display = 'none';
    submit.innerHTML = 'update'

    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth',
    })
}



//search

let searchMood = 'title'

function getSearchMood(id) {
    let search = document.getElementById('search');
    if (id == 'searchTitle') {
        searchMood = 'title';
        search.placeholder = 'Search By Title';
    } else {
        searchMood = 'category';
        search.placeholder = 'Search By Category';
    }
    search.focus();
    search.value = '';
    showData();


}
let table = '';
function searchData(value) {
    let table = '';
    if (searchMood == 'title') {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].title.toLowerCase().includes(value.toLowerCase())) {
                table += `
    <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button  id="delete" onclick="deleteData( ${i})" >delete</button></td>
    </tr>
`;

            }
        }

    } else {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].category.toLowerCase().includes(value.toLowerCase())) {
                table += `
    <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button  id="delete" onclick="deleteData( ${i})" >delete</button></td>
    </tr>
`;

            }
        }





    }
    document.getElementById('tbody').innerHTML = table;
}

//clean data