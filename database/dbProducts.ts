import { db } from "."
import { IProduct } from "../interfaces";
import { Product } from "../models"

export const getProductBySlug = async ( slug: string ): Promise<IProduct | null> => {
    try {
        await db.connect()
        const product = await Product.findOne({ slug }).lean();
        await db.disconnect()
    
        if ( !product ) return null
    
    
        //TODO: 
        product.images = product.images.map( image => {
            return image.includes('http') ? image : `${process.env.HOST_NAME}products/${image}` 
        })
    
        return JSON.parse( JSON.stringify( product ))
    } catch (error) {
        console.log(error)
    }
    
}


interface ProductSlug {
    slug: string
}

export const  getAllProductSlugs = async (): Promise<ProductSlug[]> => {
    try {
        await db.connect()
        const slugs = await Product.find().select('slug -_id').lean()
        await db.disconnect()
    
        return slugs;
    } catch (error) {
        console.log(error)
    }
}

export const getProductByTerm = async ( term: string ): Promise<IProduct[]> => {
    
    try {
        term = term.toString().toLowerCase();
        await db.connect()
        const products = await Product.find({
            $text: { $search: term }
        })
        .select('title  images price inStock slug -_id')
        .lean()
    
        await db.disconnect()
        const updateProducts = products.map( product => {
            product.images = product.images.map( image => {
                return image.includes('http') ? image : `${process.env.HOST_NAME}products/${image}` 
            })
            return product
        })
    
        return updateProducts;      
    } catch (error) {
        console.log(error)
    }
    
}

export const getAllProducts = async():Promise<IProduct[]> => {

    try {
        await db.connect()
        const products = await Product.find().lean()
        await db.disconnect()
        const updateProducts = products.map( product => {
            product.images = product.images.map( image => {
                return image.includes('http') ? image : `${process.env.HOST_NAME}products/${image}` 
            })
            return product
        })
    
        return JSON.parse( JSON.stringify( updateProducts ))
    } catch (error) {
        console.log(error)
    }
}