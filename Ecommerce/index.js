let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Caffe Americano',
        image: '100433.webp',
        price: 231
    },
    {
        id: 2,
        name: 'Latte',
        image: '112540.webp',
        price: 210
    },
    {
        id: 3,
        name: 'Iced Mocha Cookie Crumble',
        image: '104018.webp',
        price: 446
    },
    {
        id: 4,
        name: 'Mocha Cookie Crumble Latte',
        image: '104014.webp',
        price: 414
    },
    {
        id: 5,
        name: 'Chocolate Cortado',
        image: '107934.webp',
        price: 270
    },
    {
        id: 6,
        name: 'Solo Espresso',
        image: '100511.webp',
        price: 236
    },

    {
        id: 7,
        name: 'Iced Hazelnut Latte',
        image: '112188.webp',
        price: 325
    },
    {
        id: 8,
        name: 'Iced Caffè Americano',
        image: '100441.webp',
        price: 230
    },
    {
        id: 9,
        name: 'Chocolate Cappuccino',
        image: '104068.webp',
        price: 309
    }
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}