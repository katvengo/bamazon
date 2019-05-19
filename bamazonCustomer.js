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

})

function displayStartingValues() {
    console.log("Selecting all products...\n");
    connection.query(
        "SELECT * FROM products",
        function (err, res) {
            if (err) throw err;
            console.log("Products for sale!")
            console.log("What would you like to buy?")
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
                    name: "action",
                    type: "rawlist",
                    // mesage: "What would you like to buy?",
                    choices: function () {
                        var choiceArray = []
                        for (let i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].item_id);
                        }
                        return choiceArray;


                    },


                },
                {
                    name: "amount",
                    type: "input",
                    message: "How many units would you like to buy?",
                },
            ])
            .then(function (answer) {
                var chosenItem = answer.action
                // console.log(chosenItem)

                for (let i = 0; i < results.length; i++) {
                    if (results[i].item_id === chosenItem) {
                        chosenItem = results[i]
                    }

                }
                // console.log(chosenItem.stock_quantity)
               
                if (answer.amount > chosenItem.stock_quantity) {
                    console.log("Insufficient amount left in stock.")
                } else if (answer.amount <= chosenItem.stock_quantity) {
                    var remainder = parseInt(chosenItem.stock_quantity) - parseInt(answer.amount)
                    let sql =
                        `UPDATE products 
                                SET stock_quantity = ?
                                 WHERE stock_quantity =  ?`

                    connection.query(sql,
                        [
                            remainder, chosenItem.stock_quantity
                        ],

                        (error, results) => {
                            if (error) {
                                return console.error(error.message);
                            }

                        });
                    var findPrice = parseInt(chosenItem.price) * parseInt(answer.amount)
                    console.log("Thank you for your purchase! The total cost of your purchase is:" + "" + findPrice)


                    connection.end()
                }
            })



    })
}