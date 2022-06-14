import axios from "axios"
import { baseUrl } from "../configuration/url"

export const signin = (username: string, password: string) => {
    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('username', username);
    params.append('password', password);

    return axios.post(`${baseUrl}/token`, params)
        .then(s => {
            const { firstName, lastName, userName, userId } = JSON.parse(s.data["user_info"]);

            return {
                token: s.data["access_token"],
                user: {
                    firstName,
                    lastName,
                    userName,
                    userId
                }
            }
        }, error => {
            console.log(error)
        });
}