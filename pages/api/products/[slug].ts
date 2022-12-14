import type { NextApiRequest, NextApiResponse } from 'next'
import { db, SHOP_CONSTANTS } from '../../../database'
import { IProduct } from '../../../interfaces'
import { Product } from '../../../models'

type Data = 
| { message: string }
| IProduct[]
| IProduct

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch( req.method ){
        case 'GET':
            return getProductsBySlug(req, res)
        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }
}

const getProductsBySlug = async (req: NextApiRequest, res: NextApiResponse<Data>)  => {
    try {
        const { slug } = req.query;
        
        await db.connect()
        const ProductBySlug = await Product.findOne({slug}).lean()
        await db.disconnect()
    
        if( !ProductBySlug ) {
            await db.disconnect()
            return res.status(400).json( { message: 'Dosnt entry with that id'} )
        }
    
        ProductBySlug.images = ProductBySlug.images.map( image => {
            return image.includes('http') ? image : `${process.env.HOST_NAME}products/${image}` 
        })
    
        return res.status(200).json( ProductBySlug )
    } catch (error) {
        await db.disconnect()
        console.log(error)
    }
}
