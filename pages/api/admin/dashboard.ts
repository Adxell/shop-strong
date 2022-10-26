import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Order, Product, User } from '../../../models';


type Data = {
   numberOfOrder: number;
   paidOrders: number;
   notPaidOrders: number;
   numberOfCLients: number;
   numberOfProducts: number;
   productsWithNoInventory: number;
   lowInventory: number;
}

export default async function handler (req: NextApiRequest, res: NextApiResponse<Data>){
    try {
        await db.connect()
           const [
        numberOfOrder,
        paidOrders,
        numberOfCLients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory
    ] = await Promise.all([
        Order.count(),
        Order.find({isPaid: true}).count(),
        User.find({role: 'client'}).count(),
        Product.count(),
        Product.find({inStock: 0 }).count(),
        Product.find({inStock: { $lte: 10 } }).count(),
    ])
    await db.disconnect()
    
    res.status(200).json({
        notPaidOrders:  numberOfOrder - paidOrders,
        numberOfOrder,
        paidOrders,
        numberOfCLients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory,
    })
    } catch (error) {
        await db.disconnect()
        console.log(error)
    }
    // const numberOfOrder= await Order.count()
    // const paidOrders= await Order.find({isPaid: true}).count()
    // const numberOfCLients= await User.find({role: 'client'}).count()
    // const numberOfProducts= await Product.count()
    // const productsWithNoInventory= await Product.find({inStock: 0 }).count()
    // const lowInventory= await Product.find({inStock: { $lte: 10 } }).count()

 
}