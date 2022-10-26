import { isValidObjectId } from "mongoose";
import { db } from ".";
import { IOrder } from "../interfaces";
import { Order } from "../models";


export const getOrderById = async( id: string ): Promise<IOrder|null> => {

    try {
        if ( !isValidObjectId(id) ) {
            return null
        }
    
        await db.connect();
        const order = await Order.findById( id )
        await db.disconnect()
    
        if ( !order ) {
            return null
        }
    
        return JSON.parse(JSON.stringify(order))
    } catch (error) {
        console.log(error)
    }
}

export const getOrderByUser = async ( id: string): Promise<IOrder[]> => {
    try {
        if ( !isValidObjectId(id) ) {
            return []
        }
    
        await db.connect();
        const orders = await Order.find({user: id}).lean()
        await db.disconnect();
    
    
        return JSON.parse(JSON.stringify(orders))
    } catch (error) {
        console.log(error)
    }
}