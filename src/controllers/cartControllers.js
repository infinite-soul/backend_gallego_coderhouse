import * as service from '../services/cartServices.js'

export const getCart = async (req,res,next) => {

    try {
        
        const data = await service.getCartService()
        res.status(200).json(data)
        

    } catch (error) {
        next(error.message)
    }
}

export const getCartById = async (req,res,next) => {

    try {

        const { id } = req.params
        const cart = await service.getCartByIdService (id)

        if (!cart) res.status(404).json ({ message: 'Carrito no encontrado'})
        else res.status(200).json (cart)
    } catch (error) {
        next(error.message)
    }
}

export const createCart = async (req,res,next) => {

    try {

        const cart = await service.createCartService ()
        if (!cart) req.status(404).json({ message: 'Falló la creación del carrito' })
        else res.status(200).json ({ message: 'Carrito creado'})
        
    } catch (error) {
        next(error.message)
    }
}

export const saveProductToCart = async (req,res,next) => {

    try {
        
        const { id, productId } = req.params

        const cart = await service.saveProductToCartService ( id, productId )

        res.status(200).json({ message: 'Producto guardado' })

    } catch (error) {
        next(error.message)
    }
}




export const deleteProductInCart = async (req,res,next) => {

    try {
        
        const { id, productId } = req.params

        const cart = await service.deleteProductInCartService (id, productId)

        res.status(200).json({ message: 'Producto eliminado',
        
        cart
    })

    } catch (error) {
        next(error.message)
    }
}


export const cleanCart = async (req, res, next) => {

    try {
        
        const {id} = req.params
        
        const cart = await service.cleanCartService (id)

        res.status(200).json({ message: 'Carrito vaciado',
        
        cart
    })

    } catch (error) {
        next(error.message)
    }
}




export const updateQuantityInCart = async (req,res,next) => {

    try {
        
        const { id, productId } = req.params

        const { quantity } = req.body

        const cart = await service.updateQuantityInCartService ( id, productId, quantity )

        res.status(200).json({ message: 'Producto guardado', 'cart': cart  })

    } catch (error) {
        next(error.message)
    }
}


export const updateCart = async (req,res,next) => {

    try {
        
        const { id } = req.params

        const obj = req.body;


        const cart = await service.updateCartService ( id, obj )

        res.status(200).json({ message: 'Producto guardado', 'cart': cart  })

    } catch (error) {
        next(error.message)
    }
}