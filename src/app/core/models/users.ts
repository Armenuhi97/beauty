export interface IUser {
    id: number;
    about: string;
    address: string;
    address_latitude: string;
    address_longitude: string;
    birth_date: string;
    brands: string;
    city: string;
    city_latitude: string;
    city_longitude: string;
    gender: string;
    image: string;
    phone_number: string;
    zip_code: string;
    rating:string;
    orders:any;
    amount:string
    user_role: {
        id: number;
        code: string;
        title: string;
    };
    user: {
        email: string;
        first_name: string;
        last_name: string;
        username: string;
        is_active: boolean
    };
}

