// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedDB } from '../../database'
import { Order, Product, User } from '../../models'


type Data = {
  message: string
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if ( process.env.NODE_ENV === 'production' ) {
        return res.status(401).json({message: 'Dont have access to service'})
    }
    db.connect()
    await Product.deleteMany()
    await User.deleteMany()
    await Order.deleteMany()
    await Product.insertMany(seedDB.initialData.products)
    await User.insertMany(seedDB.initialData.users)
    db.disconnect()
    res.status(200).json({ message: 'Seed exetuted' })
}

