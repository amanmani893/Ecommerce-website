


let productsDiv = document.getElementById("products");


if(productsDiv){

fetch("https://dummyjson.com/products?limit=10")

.then(res => res.json())

.then(data => {


data.products.forEach(product => {


productsDiv.innerHTML += `


<div class="card">


<img src="${product.thumbnail}" width="150">


<h3>${product.title}</h3>


<p>Price: $${product.price}</p>


<p>${product.rating} ⭐</p>


<button onclick="viewProduct(${product.id})">

View Details

</button>


</div>


`


})


})

}






function viewProduct(id){


localStorage.setItem("productId", id);


window.location = "product.html";


}






let details = document.getElementById("details");


if(details){


let id = localStorage.getItem("productId");



fetch(`https://dummyjson.com/products/${id}`)


.then(res => res.json())


.then(product => {


details.innerHTML = `


<div class="card">


<h1>${product.title}</h1>


<img src="${product.thumbnail}" width="250">


<h2>Price: $${product.price}</h2>


<p>${product.description}</p>


<p>Category: ${product.category}</p>


<p>Rating: ${product.rating} ⭐</p>



<button onclick="addCart(${product.id})">

Add To Cart

</button>


</div>


`


})


}






function addCart(id){


let cart = JSON.parse(localStorage.getItem("cart")) || [];


cart.push(id);


localStorage.setItem("cart", JSON.stringify(cart));


alert("Product Added To Cart");


}
// =======================
// CART PAGE
// =======================


let cartDiv = document.getElementById("cart");


let totalDiv = document.getElementById("total");



if(cartDiv){


let cart = JSON.parse(localStorage.getItem("cart")) || [];


let total = 0;



cart.forEach(id => {



fetch(`https://dummyjson.com/products/${id}`)


.then(res => res.json())


.then(product => {



total += product.price;



cartDiv.innerHTML += `


<div class="card">


<img src="${product.thumbnail}" width="120">


<h3>${product.title}</h3>


<p>Price: $${product.price}</p>


</div>


`


totalDiv.innerHTML = 
"Total Bill: $" + total;



})


})


}