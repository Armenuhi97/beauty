export interface Country {
    title_en: string,
    title_fr: string,
    code: string,
    id?: number
}
export interface City {
    title_en: string,
    title_fr: string,
    id?: number,
    country: number,
    logitude: null,
    latitude: null
}