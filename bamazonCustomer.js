// npm packages
var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

// initialize connection to Bamazon DB in mysql
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon"
});


connection.connect(function(err) {
	if (err) {
		console.error("Can't Connect Homie")
	}
	loadProducts();
});


function loadProducts() {
	connection.quer("SELECT * FROM products", function (err, res) {
		if (err) 
	})
}