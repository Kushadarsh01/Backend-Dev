export const addToCart = async(req, res) => {
    try {
        const {
            productId,
            name,
            price,
            quantity
        } = req.body;

        if (!productId || !name || price === undefined || quantity === undefined) {
            return res.status(400)
            .json({
                message: "productId, name, price, and quantity are required."
            });
        }

        const cart = req.session.cart;
        const itemIndex = cart.items.findIndex(item => item.productId === productId);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } 
        
        else {
            cart.items.push({
                productId,
                name,
                price,
                quantity
            });
        }

        cart.totalPrice += price * quantity;

        res.status(200)
        .json({
            message: "Item added to cart",
            cart
        });
    }

    catch (error) {
        res.status(500)
        .json({
            message: error.message
        });
    }
};

export const updateCart = async(req, res) => {
    try {
        const {
            productId
        } = req.params;

        const {
            quantity
        } = req.body;

        if (quantity === undefined || quantity < 0) {
            return res.status(400)
            .json({
                message: "Valid quantity is required."
            });
        }

        const cart = req.session.cart;
        const itemIndex = cart.items.findIndex(item => item.productId === productId);

        if (itemIndex === -1) {
            return res.status(404)
            .json({
                message: "Item not found in cart."
            });
        }

        const item = cart.items[itemIndex];
        cart.totalPrice -= item.price * item.quantity;
        
        if (quantity === 0) {
            cart.items.splice(itemIndex, 1);
        } 
        
        else {
            item.quantity = quantity;
            cart.totalPrice += item.price * quantity;
        }

        res.status(200)
        .json({
            message: "Cart updated",
            cart
        });
    }

    catch (error) {
        res.status(500)
        .json({
            message: error.message
        });
    }
};

export const removeFromCart = async(req, res) => {
    try {
        const {
            productId
        } = req.params;

        const cart = req.session.cart;
        const itemIndex = cart.items.findIndex(item => item.productId === productId);

        if (itemIndex === -1) {
            return res.status(404)
            .json({
                message: "Item not found in cart."
            });
        }

        const item = cart.items[itemIndex];
        cart.totalPrice -= item.price * item.quantity;
        cart.items.splice(itemIndex, 1);

        res.status(200)
        .json({
            message: "Item removed from cart",
            cart
        });
    }

    catch (error) {
        res.status(500)
        .json({
            message: error.message
        });
    }
};

export const getCart = async(req, res) => {
    try {
        res.status(200)
        .json({
            cart: req.session.cart
        });
    }

    catch (error) {
        res.status(500)
        .json({
            message: error.message
        });
    }
};

export const clearCart = async(req, res) => {
    try {
        req.session.cart = {
            items: [],
            totalPrice: 0
        };

        res.status(200)
        .json({
            message: "Cart cleared",
            cart: req.session.cart
        });
    }

    catch (error) {
        res.status(500)
        .json({
            message: error.message
        });
    }
};