import { Service } from "./category";
import { IUser } from "./users";

export interface OrderItem {
    comment: string
    event: {
        created: string
    }
    google_calendar_id: string
    google_event_id: string
    id: number
    is_prepayed: false
    master: IUser
    minutes: number
    prepayed_price: null
    prepayed_status: string
    price: number
    reviews: []
    service: Service
    status: string
    user: IUser
}