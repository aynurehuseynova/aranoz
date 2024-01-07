const myDiv = document.getElementById('getProduct');


function getProducts() {
    myDiv.innerHTML = ``
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    console.log(cart);
    cart.map((item, index) => {
        const box = document.createElement('div')
        box.className="box" 
        box.innerHTML = `
        <img src="${item.image}" style="max-width: 250px;min-height: 100px;" alt="">
        <p>${item.title}</p>
        <p>${item.price}</p>
        <button class="btn" onclick="removeItem(${index})">Remove from cart</button> 
    `
        myDiv.appendChild(box)
    })
    
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    cart.splice(index, 1)
    localStorage.setItem('cart', JSON.stringify(cart))
    getProducts()
}
window.onload = () => {
    getProducts()
}