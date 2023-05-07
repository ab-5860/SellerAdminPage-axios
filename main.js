// select form and  product list elements'

let form = document.getElementById("form");
const productList = document.getElementById("product-list");

// add event lsistener to form submit button

form.addEventListener("submit", addItem);

// add event listener to delete button
productList.addEventListener("click", removeProduct);

// add event listerner to edit button
productList.addEventListener("click", editProduct);

function addItem(e)
{
        e.preventDefault();

        // get form values
        let sellingPrice = document.getElementById("sellingPrice").value;

        let productName = document.getElementById("productName");
        let productCategory = document.getElementById("productCategory");


        // create product object
        let product = {
            id: Math.random,
            price : sellingPrice,
            name : productName,
            category : productCategory
        };

        // Get existing products from local storage
        let products = JSON.parse(localStorage.getItem("products")) || [];

        // add new products to products array
        products.push(product);

        // store products in local storage
        localStorage.setItem("products", JSON.stringify(products));

        // display products
        displayProducts();
}

// function to display products on a web page
function displayProducts()
{

    // clear product list elements
    productList.innerHTML = "";

    // Get product from local storage
    let products = JSON.parse(localStorage.getItem("products")) || [];


    // create HTML Elements for each product and append it to product list
    for(let i=0;i<products.length;i++)
    {
        let productItem = document.createElement("li");

        const { id, price, name, category} = products[i];

        productItem.setAttribute("id", id);
        productItem.innerHTML = `<p>Selling Price: ${price} Product Name: ${name} Category: ${category} </p>`;

        // create del button element 
        var deleteBtn = document.createElement("button");

        // Add classes to del button
        deleteBtn.className = "btn btn-danger btn-sm float-right delete";

        // append text node
        deleteBtn.appendChild(document.createTextNode("Delete Expense"));

        // create edit button element
        var editBtn = document.createElement("button");

        //Add classes to edit button
        editBtn.className = "btn btn-danger btn-sm float-right edit";


        // append text node
        editBtn.appendChild(document.createTextNode("Edit Expense"));


        productItem.appendChild(deleteBtn);
        productItem.appendChild(editBtn);

        productList.appendChild(productItem);

    }
}


function removeProduct(e, isEdit = false)
{

    const isDel = e.target.classList.contains("delete");
    if(isDel || isEdit)
    {
        if(isEdit || confirm("Are you sure?"))
        {
            var li = e.target.parentElement;
            const listInd = li.getAttribute("id");

            // filtering out based on ID  from localStorage
            const allProducts = localStorage.getItem("products") || [];

            let updatedProduct = JSON.parse(allProducts).filter((prod) => 
                listInd != prod.id
            );

            localStorage.setItem("products", JSON.stringify(updatedProduct));

            // remove list from UI <ul>
            productList.removeChild(li);
        }
    }
}


