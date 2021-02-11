/////////////
// Classes //
/////////////

let productStorageArray = [];

class Product {
  constructor(prName, prPrice, prYear) {
    this.prName = prName;
    this.prPrice = prPrice;
    this.prYear = prYear;
  }

  // Add Product method
  static AddProductToTable(product, ev) {
    // Check if product exists
    var flag = true;
    productStorageArray.forEach(element => {
      if (element.prName === product.prName) {
        Product.AlertType("Product name is already in use", "warning");
        // ev.target[0].value = '';
        flag = false;
      }
    });
    if (flag === true) {
      const row = document.createElement("tr");
      row.innerHTML = `
      <td>${product.prName}</td>
      <td>${product.prPrice}</td>
      <td>${product.prYear}</td>
      <td><button class="btn btn-danger btn-sm delete">Delete</button></td>
      `;
      productTableBody.appendChild(row);
      productStorageArray.push(product);
      Product.AlertType("Product added succesfully", "success");
    }
  }
  // Delete Product method
  static DeleteProductFromTable(el) {
    // Remove product only if the click comes from a Delete button
    
    if (el.classList.contains("delete")) {
      for (let element in productStorageArray) {
       if (productStorageArray[element].prName === el.parentElement.parentElement.firstElementChild.innerHTML) {
        productStorageArray.splice(element, 1);
              }
    }
    
    // if (el.classList.contains("delete")) {
    //     for (let element in productStorageArray) {
    //      if (productStorageArray[element].prName === el.parentElement.parentElement.firstElementChild.innerHTML) {
    //       delete productStorageArray[element];
    //             }
    //   }
      el.parentElement.parentElement.remove();
      Product.AlertType("Product deleted form list", "danger");
    }
  }
  // Show Alert type (success, warning, danger)
  static AlertType(message, type) {
    alertContainer.className = `alert alert-${type} mb-4`;
    alertContainer.innerHTML = (message);
    alertContainer.style.visibility = 'visible';
    // Vanish in 2 seconds
    setTimeout(() => alertContainer.style.visibility = 'hidden', 2000);
  }
}

/////////////////////
// Event Listeners //
/////////////////////

// Add Product Event
productForm.addEventListener('submit', (ev) => {
  // Prevent submit
  ev.preventDefault();
  // Validate form, if a field is empty show warning alert
  if (ev.target[0].value === '' || ev.target[1].value === '' || ev.target[2].value === '') {
    Product.AlertType("All fields need to be filled", "warning");
  } else {
    // Instatiate product Object
    const newProduct = new Product(prName.value, prPrice.value, prYear.value);
    // Add product to product table
    Product.AddProductToTable(newProduct, ev);
    // Clear Form after success adding new product
    for (let n = 0; n < 3; n++) {
      ev.target[n].value = '';
    }
  }
});

// Delete Product Event
productTableBody.addEventListener("click", (ev) => {
  Product.DeleteProductFromTable(ev.target);
});