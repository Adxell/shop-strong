import type { NextApiRequest, NextApiResponse } from 'next';

import bcrypt from 'bcryptjs'

import { db } from '../../../database';
import { User } from '../../../models';
import { jwt } from '../../../utils';


type Data = 
|{message: string}
|{  token: string, 
    user: {
        email: string, 
        role: 'admin'|'client', 
        name: string
    }
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>){
   switch ( req.method ) {
     case 'GET':
        return checkJWT(req, res)
     default:
        res.status(400).json({
            message: 'Bad request'
        })
   }
}

const checkJWT = async (req: NextApiRequest, res: NextApiResponse) => {

    const { token = '' } = req.cookies;

    let userId = ''

    try {
        userId = await jwt.isValidToken(token)
    } catch (error) {
        return res.status(401).json({
            message: 'Token de autorizacion no es valido'
        })
    }
    
    await db.connect()
    const user = await User.findById(userId).lean()
    await db.disconnect()

    if ( !user ) {
        return res.status(400).json({message: 'No existe el usuario'})
    }
    const {_id, email, name, role} = user
    
    return res.status(200).json({ 
        token: jwt.signToken(_id, email), 
        user: {
            email,
            role,
            name
        }
    })
}