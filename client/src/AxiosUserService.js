import axios from 'axios'

const login_url = 'http://localhost:3001/login';
const reg_url = 'http://localhost:3001/reguser';
const profile_url = 'http://localhost:3001/profile';

class UserService {
    // make login request
    static loginUser(username, pass) {
        const header_data = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        }
        if(username == '' || pass == '') {
            return { data: { error: 'Login error' ,err_msg: 'Invalid username/password' }}
        }
        return axios.post(login_url, {
            username : username,
            pass : pass
        }, {headers : header_data});
    }

    // make registration request
    static regUser(fname,lname, age, pass, email) {
        const header_data = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        }
        if(fname=='' || lname=='' || age=='' || pass=='' || email=='') {
            return { data: { error: 'Invalid form data !' }}
        }
        return axios.post(reg_url, {
            fname,
            lname,
            age,
            pass,
            email
        }, { headers : header_data});
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