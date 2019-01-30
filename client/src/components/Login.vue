<template>
    <div class="login">
        <div class="login-page">
        <div class="form">
            <transition name="fade">
                <form v-if="show_reg_form" class="register-form">
                    <input type="text" v-model="fname" placeholder="first name"/>
                    <input type="text" v-model="lname" placeholder="last name"/>
                    <input type="number" v-model="age" placeholder="age"/>
                    <input type="password" v-model="reg_pass" placeholder="password"/>
                    <input type="email" v-model="email" placeholder="email address"/>
                    <button v-on:click="reqRegister">create</button>
                    <p class="message">Already registered? <a href="#" v-on:click="toggle_login_reg">Sign In</a></p>
                </form>
            </transition>
            <transition name="fade">
                <form v-if="show_login_form" class="login-form" onSubmit={this.reqLogin.bind(this)}>
                    <input type="text" v-model="username" placeholder="username or email"/>
                    <input type="password" v-model="pass" placeholder="password"/>
                    <button v-on:click="reqLogin">login</button>
                    <p class="message">Not registered? <a href="#" v-on:click="toggle_login_reg">Create an account</a></p>
                </form>
            </transition>
        </div>
    </div>
    </div>    
</template>

<script>
import UserService from '../AxiosUserService';

export default {
  name: 'Profile',
  data() {
      return {
        show_login_form: true,
        show_reg_form: false,
        username : '',
        pass: '',
        fname: '',
        lname: '',
        age: '',
        reg_pass: '',
        email: ''
      }
  },
  methods: {
      // handle login request
      async reqLogin(e) {
        e.preventDefault(); // IMP to prevent refreshing the page on first-time submit. Removes '?' from url.
        // call login api
        const loginResult = await UserService.loginUser(this.username,this.pass);        
        //alert(JSON.stringify(loginResult));
        if(typeof loginResult.data.error === 'undefined') {
            // store the token in cookie
            // this.$cookie.set('token', loginResult.data.token, 1);

            // show profile page
            this.$router.push({
                name: 'profile_route',
                params: {
                    token: loginResult.data.token
                } 
            });
        }else {
            const err_msg = 'Error: '+loginResult.data.err_msg;
            console.log(err_msg);
            alert(err_msg);
        }
      },

      // handle registration request
      async reqRegister(e) {
        e.preventDefault();
        // call registration api
        const regResult = await UserService.regUser(this.fname,this.lname,this.age,this.reg_pass,this.email);
        //alert(JSON.stringify(regResult));
        if(regResult.data.error) {
            alert(regResult.data.error);
        }
        else if(regResult.data.status == 'success') {
            alert('Registration successful !');
            this.toggle_login_reg(e);
        } else {
            alert('Registration failed !');
        }
      },

      // handle login/reg toggle request
      async toggle_login_reg(e) {
        e.preventDefault();
        this.show_reg_form = !this.show_reg_form;
        this.show_login_form = !this.show_login_form;
      }
  }
}   
</script>

<style>
    @import url(https://fonts.googleapis.com/css?family=Roboto:300);

    .fade-enter-active {
        transition: opacity .7s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

    .login-page {
    width: 360px;
    padding: 8% 0 0;
    margin: auto;
    }
    .form {
    position: relative;
    z-index: 1;
    background: #FFFFFF;
    max-width: 360px;
    margin: 0 auto 100px;
    padding: 45px;
    text-align: center;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    }
    .form input {
    font-family: "Roboto", sans-serif;
    outline: 0;
    background: #f2f2f2;
    width: 100%;
    border: 0;
    margin: 0 0 15px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
    }
    .form button {
    font-family: "Roboto", sans-serif;
    text-transform: uppercase;
    outline: 0;
    background: #4CAF50;
    width: 100%;
    border: 0;
    padding: 15px;
    color: #FFFFFF;
    font-size: 14px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    cursor: pointer;
    }
    .form button:hover,.form button:active,.form button:focus {
    background: #43A047;
    }
    .form .message {
    margin: 15px 0 0;
    color: #b3b3b3;
    font-size: 12px;
    }
    .form .message a {
    color: #4CAF50;
    text-decoration: none;
    }
    .container {
    position: relative;
    z-index: 1;
    max-width: 300px;
    margin: 0 auto;
    }
    .container:before, .container:after {
    content: "";
    display: block;
    clear: both;
    }
    .container .info {
    margin: 50px auto;
    text-align: center;
    }
    .container .info h1 {
    margin: 0 0 15px;
    padding: 0;
    font-size: 36px;
    font-weight: 300;
    color: #1a1a1a;
    }
    .container .info span {
    color: #4d4d4d;
    font-size: 12px;
    }
    .container .info span a {
    color: #000000;
    text-decoration: none;
    }
    .container .info span .fa {
    color: #EF3B3A;
    }
    body {
    background: #76b852; /* fallback for old browsers */
    background: -webkit-linear-gradient(right, #76b852, #8DC26F);
    background: -moz-linear-gradient(right, #76b852, #8DC26F);
    background: -o-linear-gradient(right, #76b852, #8DC26F);
    background: linear-gradient(to left, #b7b7b7, #355026);
    font-family: "Roboto", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;      
    }
</style>