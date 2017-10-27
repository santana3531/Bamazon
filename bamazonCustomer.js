// CONNECT TO MAMP SERVER TO RUN IN NODE //


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
		console.log("You are connected! Start Shopping!")
		if (err) {
		console.error("Can't Connect Homie")
	}
	loadProducts();
});


// this function shows "products" from the table in the DB
function loadProducts() {
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err;
		console.table(res);
		promptCustomerForItem(res);
	});
}


// ask user what they want
function promptCustomerForItem(inventory) {
	inquirer
		.prompt([
		{
			type: "input",
			name: "choice",
			message: "Select which number item_id you would like? (Press Q to Quit)",
			// validate: function(val) {
			// 	if (!isNaN(val) || val.toLowerCase() === "q")
			// 		console.log("Put in a number");
			// }

		}
		])
		.then(function(val) {
			checkForQuit(val.choice); // Check if User is a Quitter
			var choiceId = parseInt(val.choice);
			var product = checkInventory(choiceId, inventory);

			if (product) {
				promptCustomerForQuantity(product);
			} else { // tell shopper that item isn't available
				console.log("\nSorry, we do not have that.");
				loadProducts();
			}
		});
}

// How much you want playa??

function promptCustomerForQuantity(product) {
	inquirer
	.prompt([
	{
		type: "input",
		name: "quantity",
		message: "How many " + product.department_name + " would you like? (Press Q to Quit)",
		validate: function(val) {
			return val > 0 || val.toLowerCase() === "q";
		}
	}
	])

	.then(function(val) {
		checkForQuit(val.quantity); // check if User is a Quitter, again.
		var quantity = parseInt(val.quantity);

		if (quantity > product.stock_quantity) {
			console.log("\nDON'T BE GREEDY DUDE, WE DON'T HAVE THAT MUCH");
			loadProducts();
		}
		else { // congrats you bought my crap
			makePurchase(product, quantity);
		}
	});
}

// Bought my crap

function makePurchase(product, quantity) {
	connection.query(
		"UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
		[quantity, product.item_id],
		function(err, res) {
			console.log("\nCongrats! You bought " + quantity + " " + product.product_name + "'s!");
			loadProducts();
		}
		);
}

function checkInventory(choiceId, inventory) {
	for (var i = 0; i < inventory.length; i++) {
		if (inventory[i].item_id === choiceId) {
			return inventory[i];
		}
	}
	return null;
}

function checkForQuit(choice) {
	if (choice.toLowerCase() === "q") {
		console.log("Thank You! Come again!");
		process.exit(0);
	}
}