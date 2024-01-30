export interface IQuestion {
    "tags": [
        string
    ],
    "owner": {
        "account_id": number,
        "reputation": number,
        "user_id": number,
        "user_type": string,
        "profile_image": string,
        "display_name": string
        "link": string
    },
    "is_answered": boolean,
    "view_count": number,
    "answer_count": number,
    "score": number,
    "last_activity_date": number,
    "creation_date": number,
    "last_edit_date": number,
    "question_id": number,
    "content_license": string,
    "link": string,
    "title": string
}

export interface IUser {
    "account_id": number,
    "creation_date": number,
    "user_type": "registered",
    "user_id": number,
    "profile_image": string,
    "display_name": string,
    "email"?: string,
    // "reputation": number,
    // "is_employee": boolean,
    // "last_modified_date": number,
    // "last_access_date": number,
    // "reputation_change_year": number,
    // "reputation_change_quarter": number,
    // "reputation_change_month": number,
    // "reputation_change_week": number,
    // "reputation_change_day": number,
    // "location": string,
    // "website_url": string,
    // "link": string,
}

export interface ICreateUserPayload {
    display_name: string,
    email: string,
    password: string
}

export interface ICreatedUser {
    user: IUser,
    accessToken: string,
}

export interface IUserToLogin {
    user: IUser,
    accessToken: string
}

export interface IUserToLoginPayload {
    email: string,
    password: string
}

export interface IUserAuth {
    user: IUser | undefined,
    accessToken: string | undefined
}

export interface IQuestionCreatePayload {
    title: string,
    content: string
}

export interface IDBQuestions {
    _id: number,
    tags: [
        string
    ],
    title: string,
    content: string,
    ownerOfQuestion: string,
    creation_date: Date
}