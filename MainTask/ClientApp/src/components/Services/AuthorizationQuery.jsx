import axios from 'axios';

let authData = null;
var url = window.location.href.replace(window.location.pathname,"");
export function hii(text){
    alert(text);
}

export function sendLogin(state){
    axios.post(url + "/api/authenticate/login", state)
    .then((res) => {
      console.log(res.data);
      localStorage.setItem('login', JSON.stringify({
        login: true,
        token: res.data.token,
        role: res.data.role,
        uName: res.data.uName
      }));
      //this.setState({login: true});
      
      //this.setState({username: null});
      //this.setState({password: null});
      authData = JSON.parse(localStorage.getItem('login'));
      getUserInfo();
      
      //window.location.reload();
      /*return{
        login: true,
        token: res.data.token,
        role: res.data.role,
        uName: res.data.uName
      };*/
    })
    .catch((error) => {
      console.error(error);
      /*return{
        login: false,
        token: undefined,
        role: undefined,
        uName: undefined
      };*/
    });
}

export function getUserInfo(){
    axios.get(
      url + `/api/students/SearchEmail?username=` + authData.uName,
      {headers:{"Authorization":"Bearer " + authData.token}})
      .then(res => {
        console.log(res.data);
        localStorage.setItem('userData', JSON.stringify({
          id: res.data.id,
          email: res.data.email,
          userName: res.data.userName,
          name: res.data.name,
          lastName: res.data.lastName,
          age: res.data.age,
          registeredDate:res.data.registeredDate,
          studyDate: res.data.studyDate
        }));

        
        //this.props.history.push("/select");
        /*if(window.location.pathname == "/select"){
          window.location.reload();
        }*/
        //props.history.push("/select");
        window.location.href = "/select";
      })
      .catch((error) => {
        console.error(error)
      });
}