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
                console.log("Item id Number:" + " " + res[i].item_id + "   " + "Name:" + " " + res[i].product_name + "   " +
                    "Price:" + " " + "$" + res[i].price);

            }

        }

    )
    run()
}

function run() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;

        inquirer
            .prompt([{
                name: "Items for Sale",
                type: "rawlist",
                mesage: "What would you like to buy?",
                choices: function () {
                    var choiceArray = []
                    for (let i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].product_name);
                    }
                    return choiceArray

                }

            }])
            .then(function (answer) {
                var chosenItem;

                for (let i = 0; i < results.length; i++) {
                    if (results[i].product_name === answer.choice) {
                        chosenItem = results[i]
                    }

                }
            })
    })
}