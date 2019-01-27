<template>
    <div class="profile">
        <div class="img_details">
            <div id="pic">
                <img src="../assets/logo.png" />
            </div>
            <div id="img_name">
                <b>Sushil Takkekar</b>
            </div>
        </div>
        <div class="profile_details">
            <span id="profile_header">Profile Details</span>
            <div id="profile_data">
                <span id="profile_ele">Name : {{ fname }} {{ lname }}</span>
                <span id="profile_ele">Age : {{ age }}</span>
                <span id="profile_ele">Email : {{ email }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import UserService from '../AxiosUserService';

export default {
  name: 'Profile',
  props: {
    token : String
  },
  data() {
      return {
            error : '',
            fname : '',
            lname : '',
            age : '',
            email : ''
      }
  },
  async created() {
      try {
          // check existence of token
          if(typeof this.token === 'undefined') {
            // re-direct to login
            this.$router.push({
                name: 'login_route'
            });
          }
          
          // get the token from cookie
          // this.token = this.$cookie.get('token');

          // call profile api
          const profile_data = await UserService.getProfile(this.token);
          //alert(JSON.stringify(profile_data));
          this.fname = profile_data.data.fname;
          this.lname = profile_data.data.lname;
          this.age = profile_data.data.age;
          this.email = profile_data.data.email;
      }catch(err) {
        this.error = err.message;
      }
  }
}
</script>

<style>
    :root {
        --profile-min-wid : 920px;
        --img-details-min-wid : calc(200px + 20px + 20px);
        --profile-details-min-wid : calc(var(--profile-min-wid) - var(--img-details-min-wid) - 20px - 20px);
    }
    .profile {
        margin: auto;
        width: 70%;
        min-width: 920px; 
        max-width: 1100px;
        /* total-wid-area = 920px */
        
    }
    .img_details {
        float: left;
        margin: auto 10px;
        min-width: 200px;
        max-width: 250px;
        height: 200px;
        margin: 45px 10px 0;
        /* min-wid-area = 200px + 20px(pad*2) + 20px(mar*2) = 240*/
        --img-details-min-wid : calc(200px + 20px + 20px);
    }
    #pic,img {
        margin: auto;
        width: 150px;
        height: 150px;
    }
    #img_name {
        font-family: sans-serif;
        font-size: larger;
        color: white;
    }
    .profile_details{
        float: left;
        margin: auto 10px;
        padding: 10px;
        color: #f7f9f3;
        min-width: calc(var(--profile-min-wid) - var(--img-details-min-wid) - 20px - 20px);
        max-width: 850px;
        /* min-wid-area = (--profile-min-wid) - (--img-details-min-wid) - 20px(pad*2) + 20px(mar*2) = 640*/
        --profile-details-min-wid : calc(var(--profile-min-wid) - var(--img-details-min-wid) - 20px - 20px);
    }
    #profile_header {
        text-align: center;
        font-size: x-large;
        font-weight: bold;
        width: 100%;
        display: block;
        padding: 0 0 10px;
        border-bottom: solid #949494 1px;
    }
    #profile_ele {
        display: block;
        text-align: left;
        padding: 20px 3% 10px;
        width: 100%;
    }
</style>