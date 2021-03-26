export interface Category {
    icon?: string
    id?: number
    name_en: string
    name_fr: string
    services?: Service[]
}
export interface Service {
    category: number
    icon?: string
    id?: number
    name_en: string
    name_fr: string
    "is_popular":boolean
}