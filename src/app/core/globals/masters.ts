import { IUser, Service } from '@models/index';

export const DEFAULT_MASTERS: IUser[] = [
    {
        id: 1,
        about: 'About User',
        address: 'User Address',
        address_latitude: '134.156',
        address_longitude: '354.156',
        birth_date: '31.01.1998',
        brands: 'User Brands',
        city: 'User City',
        city_latitude: 'User City Latitude',
        city_longitude: 'User City Longitude',
        gender: 'User Gender',
        rating: '4.9',
        orders: 'order',
        amount: '1700',
        image: 'https://miro.medium.com/max/1838/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg',
        phone_number: '+37498783092',
        zip_code: '4525',
        user: {
            email: 'user@gmail.com',
            first_name: 'User First Name',
            is_active: true,
            last_name: 'User Last Name',
            username: 'user_username'
        },
        user_role: {
            code: 'ADM',
            id: 1,
            title: 'Administrator',
        }
    }
];

export interface MasterServiceType {
    busyTimes: Array<{ start: Date, end: Date }>
    created_at: string
    go_home: boolean
    go_home_price: number
    id: number
    minutes: number
    prepay_percent: number
    price: number
    service: number
    service_details: Service
    user: number
    user_details: IUser
    workingTimes: Array<{ start: Date, end: Date }>
}