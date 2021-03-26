export interface Reviews {
    "id": number,
    "from_user":number,
    "from_user_details": {
        "image": string,
        "id": number,
        "first_name":string,
        "last_name": string,
    },
    "to_user_details": {
        "image": string,
        "id":number,
        "first_name": string,
        "last_name": string,
    },
    "to_user": number,
    "comment": string,
    "reply": null,
    "rating": number,
    "created_at": string,
    "status": string
}