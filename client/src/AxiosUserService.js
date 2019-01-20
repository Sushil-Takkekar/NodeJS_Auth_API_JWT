import axios from 'axios'

const login_url = 'http://localhost:3001/login';
const profile_url = 'http://localhost:3001/profile';

class UserService {
    // make login request
    static loginUser(username, pass) {
        const header_data = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        }
        return axios.post(login_url, {
            username : username,
            pass : pass
        }, {headers : header_data});
    }

    // get profile data
    static getProfile(token) {
        const auth_header = 'Bearer ' + token;
        const header_data = {
            'Authorization' : auth_header,
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        }
        return axios.post(profile_url,{},{headers : header_data});
    }
}

export default UserService;