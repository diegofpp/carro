const db = {
    methods: {
        //Aquí estamos creando una función llamada "find". Esta función toma un parámetro llamado "id", que se utiliza para buscar un elemento específico en la base de datos. La función utiliza el método "find" de JavaScript para buscar un elemento en el array "items" de la base de datos. Si encuentra un elemento que tenga el mismo valor "id" que se pasó como parámetro, devuelve ese elemento.
        find: (id) => {
            //Esta es la parte principal de la función "find". Aquí se utiliza el método "find" en el array "items" de la base de datos para buscar el elemento con el mismo valor "id" que se pasó como parámetro. Si lo encuentra, devuelve ese elemento.
            return db.items.find(item => item.id === id);
            
        },

        remove: (items) => {
            items.forEach(item => {
                const product = db.methods.find(item.id);
                product.qty = product.qty - item.qty;
            });
            console.log(db);
        },

    },

    items: [
        {
            id:0,
            title: 'Funko Pop',
            price: 250,
            qty:5,
        },
        {
            id:1,
            title: 'Harry Poter',
            price: 345,
            qty:50,
        },
        {
            id:2,
            title: 'Phillips Hue',
            price: 310,
            qty:20,
        },

    ]
}


//
const shoppingCart = {
    //carrito vacio al principio
    items: [],
    methods: {
        add: (id, qty) => {
            const cartItem = shoppingCart.methods.get(id);

             if(cartItem){
                if(shoppingCart.methods.hasInventory(id, qty + cartItem.qty)){
                    cartItem.qty += qty;
                } else {
                    alert("No hay inventario suficiente");
                }
             } else {
                shoppingCart.items.push({id, qty});
             } 

        },
        remove: (id, qty) => {
            const cartItem = shoppingCart.methods.get(id);
            if (cartItem.qty - qty > 0) {
                cartItem.qty -= qty;
            } else {
                shoppingCart.items = shoppingCart.items.filter(item => item.id != id)
            }
        },
        count: () => {
             return shoppingCart.items.reduce((acc, item) => acc + item.qty, 0);
        },
        get: (id) => {
            const index = shoppingCart.items.findIndex(item => item.id === id);
            return index >= 0 ? shoppingCart.items[index]: null; 
        },
        getTotal: () => {
            const total = shoppingCart.items.reduce((acc, item) => {
                const found =db.methods.find(item.id);
                return acc + found.price * item.qty;
            }, 0);
            return total;
        },
        hasInventory: (id, qty) => {
            return db.items.find(item => item.id === id).qty >= 0;
        },
        purchase: () => {
            db.methods.remove(shoppingCart.items);
            shoppingCart.items = [];
        },
    },
};

function renderStore() {
    const html = db.items.map((item) => {
        return `
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <img src="https://via.placeholder.com/400x300" alt="Producto 1" class="w-full h-48 object-cover">
        <div class="p-4">
          <h2 class="text-xl font-bold mb-2 title">${item.title}</h2>
          <p class="text-gray-700 price">${numberToCurrency(item.price)}</p>
          <p class="text-gray-700 font-bold mt-2 qty">${item/qty}</p>

          <div class="actions">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 add" data-id="${item.id}>Agregar al carrito</button>
        </div>
      </div>
        `;
    });

    document.querySelector('#store-container').innerHTML = html.join("");
}

function numberToCurrency(n) {
    return new Intl.NumberFormat("en-US", {
        maximumSignificantDigits: 2,
        style: "currency",
        currency: "USD",
    }).format(n);
}



