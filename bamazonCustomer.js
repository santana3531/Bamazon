// npm packages
var mysql = require("mysql");
var inquirer = require("inquirer");
// require("console.table");

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


// this function shows "products" from the table in the DB
function loadProducts() {
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err;
		// console.table(res);
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
			message: "What product do you want homie? (Press Q to Quit)",
			validate: function(val) {
				return !isNaN(val) || val.toLowerCase() === "q";
			}

		}
		])
		.then(function(val) {
			checkForQuit(val.choice); // Check if User is a Quitter
			var choiceID = parseInt(val.choice);
			var product = checkInventory(choiceId, inventory);

			if (product) {
				promptCustomerForQuantity(product);
			} else { // tell them we aint got that shit!
				console.log("\nWe don't have that garbage");
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
		message: "Yo, how much you want homie? (Press Q to Quit)",
		validate: function(val) {
			return val > 0 || val.toLowerCase() === "q";
		}
	}
	])

	.then(function(val) {
		checkForQuit(val.quantity); // check if User is a Quitter, again.
		var quantity = parseInt(val.quantity);

		if (quantity > product.stock_quantity) {
			console.log("\nDon't be greedy dude, we don't have that much");
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

function checkExit(choice) {
	if (choice.toLowerCase() === "q") {
		console.log("Thanks Homie, Peace-Out!");
		process.exit(0);
	}
}