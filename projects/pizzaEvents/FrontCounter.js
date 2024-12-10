const PizzaShop = require('./PizzaShop')

const pizzaShop = new PizzaShop()

pizzaShop.on("orderPizza", (size, toppings) => {
    console.log(`A ${size} pizza is being baked with ${toppings}.`)
})
pizzaShop.order('Large', 'mushroom on pineapples')
pizzaShop.displayOrderNumber()

pizzaShop.order('medium', 'mushroom on pineapples')
pizzaShop.displayOrderNumber()