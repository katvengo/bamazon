var mysql = require('mysql')

var inquirer = require('inquirer')

// Creating the connection
var connection = mysql.createConnection({
    host: "localhost",

    port: 8889,

    user: "root",

    password: "root",

    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    displayStartingValues()
    connection.end()
})

function displayStartingValues() {
    console.log("Selecting all products...\n");
    connection.query(
        "SELECT * FROM products",
        function (err, res) {
            if (err) throw err;
            console.log("Products for sale!")
            for (let i = 0; i < res.length; i++) {
            console.log("Item id Number:" + " " + res[i].item_id + "   " + "Name:" + " " + res[i].product_name + "   "
+ "Price:" + " "  + "$" + res[i].price       );
                
            }

        }

    )
}