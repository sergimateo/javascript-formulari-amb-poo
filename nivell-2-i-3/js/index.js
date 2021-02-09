////////////
// Classes //
/////////////

class Product {
  constructor(name, price, year) {
    this.name = name;
    this.price = price;
    this.year = year;
  }
}

class ProductActions {
  // Add Product method
  static addProductToTable(product) {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td>${product.year}</td>
      <td><button class="btn btn-danger btn-sm delete">Delete</button></td>
      `;
    
    productTableBody.appendChild(row);
    ProductActions.alertType("Product added succesfully", "success");
  }

  // Delete Product method
  static deleteProductFromTable(el) {
    // Remove product only if the click comes from a Delete button
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
      ProductActions.alertType("Product deleted form list", "danger");
    }
  }
  //  Clear Form Fields method
  static clearForm(name, price, year) {
    name.value = "";
    price.value = "";
    year.value = "";
  }
  // Show Alert type (success, warning, danger)
  static alertType(message, type) {
    const div = document.createElement("div");
    div.className = `alert alert-${type}`;
    div.appendChild(document.createTextNode(message));
    mainContainer.insertBefore(div, formContainer);

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }
}

/////////////////////
// Event Listeners //
/////////////////////

// Add Product Event
productForm.addEventListener("submit", (e) => {
  // Prevent submit and get form values
  e.preventDefault();
  const name = document.querySelector("#name");
  const price = document.querySelector("#price");
  const year = document.querySelector("#year");

  // Validate form, if a field is empty show warning alert
  if (name.value === "" || price.value === "" || year.value === "") {
    ProductActions.alertType("All fields need to be filled", "warning");
  } else {
    // Instatiate product Object
    const product = new Product(name.value, price.value, year.value);

    // Add product to product table
    ProductActions.addProductToTable(product);

    // Clear Form fields
    ProductActions.clearForm(name, price, year);
  }
});

// Delete Product Event
productTableBody.addEventListener("click", (e) => {
  ProductActions.deleteProductFromTable(e.target);
});