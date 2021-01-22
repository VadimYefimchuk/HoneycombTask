import axios from 'axios';
import { sendLogin } from './AuthorizationQuery';
import { openNotification } from './Notifications';


export var url = window.location.href.replace(window.location.pathname, "");
export let authData = JSON.parse(localStorage.getItem('login'));
export let userData = JSON.parse(localStorage.getItem('userData'));

export function studentRegister(state) {
    axios.post(url + "/api/students", state)
        .then((res) => {
            console.log(res.data);
            sendLogin(state);
        })
        .catch((error) => {
            console.error(error);
            openNotification('error', 'ERROR!', 'Additional user data is not registered');
        })
}

export function submitDate(state) {
    if (state.date != null && state.time != null) {
        userData.studyDate = state.date + "T" + state.time;
        axios.put(
            url + `/api/students/` + userData.id,
            userData,
            { headers: { "Authorization": "Bearer " + authData.token } })
            .then(res => {
                openNotification('success', 'Success!', 'Date was saved');
            })
            .catch((error) => {
                console.error(error);
                openNotification('error', 'ERROR!', 'Date was not saved');
            });
    }
    else {
        openNotification('error', 'ERROR!', 'Fields is empty');
    }
}

export function getStudents() {
    axios.get(url + `/api/students`, { headers: { "Authorization": "Bearer " + authData.token } })
        .then(res => {
            return res;
        })
}