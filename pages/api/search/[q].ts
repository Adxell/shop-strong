import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../models';


type Data = 
|{ message: string }
|IProduct[]


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>){
    switch ( req.method ){
        case 'GET':
            return searchProducts( req, res )
        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }
}

const searchProducts = async (req: NextApiRequest, res: NextApiResponse<any>) => {
    
    try {
        let { q = '' } = req.query;
    
        if ( q.length === 0 ) {
            return res.status(400).json({
                message: 'Must specify a query'
            })
        }
        q = q.toString().toLowerCase()
        await db.connect()
        const products = await Product.find({
            $text: { $search: q}
        })
        .select('title images price insStock slug -_id')
        .lean()
        await db.disconnect()
        return res.status(400).json(products)
        
    } catch (error) {
        await db.disconnect()
        console.log(error)
    }
}
