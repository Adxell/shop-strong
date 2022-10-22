import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { IOrder } from '../../../interfaces';
import { Order } from '../../../models';


type Data = 
| { message: string }
| IOrder[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>){

    switch ( req.method ) {
        case 'GET':
            return geteOrders(req, res);
        default:
            return res.status(200).json({message:'Example'})
    }
}

const  geteOrders = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    await db.connect()
    const orders = await Order.find()
        .sort({createAt: 'desc'})
        .populate('user', 'name email')
        .lean()
    await db.disconnect()

    return res.status(200).json(orders)

}
