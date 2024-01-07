const myDiv = document.getElementById("product");
const pages = document.getElementById("pages");
let page = 1;
let limit = 4;
let db;

async function getProducts() {
    const response = await axios.get(`https://655ddd779f1e1093c59a0b08.mockapi.io/basket?page=${page}&limit=${limit}`);
    const data = await response.data;

    db = data;
    db.map(item => {
        const box = document.createElement("div");
        box.className = 'boxDiv col-xl-3 col-lg-3 col-md-6 col-sm-6 h-100';
        box.innerHTML = `
            <img src="${item.image}" style="max-width: 250px;min-height: 100px;" alt="">
            <p>${item.title}</p>
            <p>${item.price}</p>
            <p>${item.id}</p>
            <button class="addtobasket"  onclick="addToBasket(${item.id})"><i class="fa-solid fa-cart-shopping"></i>Add To Basket</button>
        `;
        myDiv.appendChild(box);
    });
    page++;
}

pages.addEventListener('click', getProducts);
function addToBasket(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(db.find(item => item.id == id));
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(db);
}

window.onload = () => {
    getProducts()
}
// sort
const inpp = document.getElementById("inpp");
const btn = document.getElementById("btn");
const popular = document.getElementById("popular");


function getbyname() {
    axios.get('https://655c81de25b76d9884fd6913.mockapi.io/products')
        .then(res => {
            db = res.data
            let filteredData = db.filter(item => item.title.toLowerCase().startsWith(inpp.value.toLowerCase()))
            let sortedData = [...filteredData].sort((a, b) => a.price.localeCompare(b.price))
            sortedData.map((item) => {
                const div = document.createElement('div')
                div.className = "searchDiv"
                div.innerHTML = `
            <p>${item.price}</p>
            <img src="${item.image}" alt="">
`;
                popular.append(div)
            })

        })
}
btn.addEventListener('click', getbyname)

