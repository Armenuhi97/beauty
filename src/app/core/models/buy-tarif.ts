import { Tarif } from "./tarif.model";
import { IUser } from "./users";

export interface BuyTarif{
    created_at: string
    expire_date: string
    id: number
    payed: boolean
    subscribied_category: []
    tarif: number
    tarif_details: Tarif
    user: number
    user_details: IUser
}