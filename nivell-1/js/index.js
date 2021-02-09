  // Product Class:
  class Product {
    constructor(name, price, year) {
      this.name = name;
      this.price = price;
      this.year = year;
    }
  }

  // Variables
  const productArray = [];

  //Functions
  const addProductToList = (product) => {
    console.log(product);
    productArray.push(product);
    console.log(productArray);
  }

  const clearForm = (name, price, year) => {
    name.value = '';
    price.value = '';
    year.value = '';
  }

  //Event Listeners
  document.querySelector('#productForm').addEventListener('submit', (e) => {
    // Prevent submit and get form values
    e.preventDefault();

    const name = document.querySelector('#name');
    const price = document.querySelector('#price');
    const year = document.querySelector('#year');

    // Validate form
    if (name.value === '' || price.value === '' || year.value === '') {
      alert('All fields are required');
    } else {
      // Instatiate product Object
      const product = new Product(name.value, price.value, year.value);
      // Add product to list of products
      addProductToList(product);
      // Clear Form fields
      clearForm(name, price, year);
    }
  });