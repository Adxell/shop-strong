import type { NextApiRequest, NextApiResponse } from 'next';


type Data = {
   message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse){
    res.status(400).json({message:'Must specify a query'})
}