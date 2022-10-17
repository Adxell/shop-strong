import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { db } from '../../../database';
import { IOrder } from '../../../interfaces';
import { Product, Order} from '../../../models';


type Data = 
|{message: string}
| IOrder

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>){
   
   switch ( req.method ) {
    case 'POST':
        return createOrder(req, res)
    default:
        return res.status(400).json({message:'Bad request'})
   }  
}

const createOrder = async(req: NextApiRequest, res: NextApiResponse<Data>)  => {
    const {orderItems, total, subTotal} = req.body as IOrder;
    const session: any = await getSession({req})
    if ( !session ) {
        return res.status(401).json({message: 'Debe de estas autenticado para hacer esto'})
    }

    const productsIds = orderItems.map(product => product._id)

    await db.connect()
    const dbProducts = await Product.find({_id: { $in: productsIds}}).lean()
    try{
        const subTotalBack = orderItems.reduce((prev, current) => {
            const currentPrice = dbProducts.find(p => new mongoose.Types.ObjectId(p._id).toString() === current._id).price
           if ( !currentPrice ){
             throw new Error('Verficar el carrito')
           }
            return currentPrice * current.quantity + prev
        }
        , 0);

    if ( subTotal !== subTotalBack) {
        throw new Error('El total no es el mismo con el monto')
    }
      const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0)
      const backedTotal  = subTotalBack * ( taxRate + 1);

      if ( total !== backedTotal) {
        throw new Error('El total no es el mismo con el monto')
      }

      const userId = session.user.id;
      const newOrder =  new Order({...req.body, isPaid: false, user: userId })
      await newOrder.save()

      return res.status(201).json(newOrder)
    }catch(error){
        await db.disconnect()
        console.log(error)
        res.status(400).json({
            message: error.message || 'Revise logs servidor'
        })
    }
}
