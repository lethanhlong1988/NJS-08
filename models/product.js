const fs = require("fs");
const path = require("path");
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

function getProductsFromFile(cb) {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      console.log("Error reading file", err);
      return cb([]);
    }
    if (fileContent.length === 0) {
      return cb([]);
    }
    try {
      const dataFromFile = JSON.parse(fileContent);
      cb(dataFromFile);
    } catch (parseErr) {
      console.log("Error parsing JSON", parseErr);
    }
  });
}

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    getProductsFromFile((products) => {
      const inputProduct = { title: this.title };
      products.push(inputProduct);
      const dataToWrite = JSON.stringify(products);
      fs.writeFile(p, dataToWrite, (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
