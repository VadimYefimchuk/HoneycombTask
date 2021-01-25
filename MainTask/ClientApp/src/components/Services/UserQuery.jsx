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

export function submitUserData() {
    axios.put(
        url + '/api/students/' + userData.id,
        userData,
        { headers: { "Authorization": "Bearer " + authData.token } })
        .then(res => {
            openNotification('success', 'Success!', 'Data was saved');
        })
        .catch((error) => {
            console.error(error.message);
            openNotification('error', 'ERROR!', 'Data was not saved');
        });
}

export function changeCurrentUser(currentData) {
    axios.put(
        url + '/api/students/' + currentData.id,
        currentData,
        { headers: { "Authorization": "Bearer " + authData.token } })
        .then(res => {
            openNotification('success', 'Success!', 'Current User was changed');
        })
        .catch((error) => {
            console.error(error.message);
            openNotification('error', 'ERROR!', 'Current User was NOT changed');
        });
}

export async function getStudents() {
    return axios.get(url + `/api/students`, { headers: { "Authorization": "Bearer " + authData.token } })
        .then(res => {
            const newRes = res.data.map(data => ({
                key: data.id,
                id: data.id,
                name: data.name,
                lastName: data.lastName,
                age: data.age,
                email: data.email,
                registeredDate: data.registeredDate,
                studyDate: data.studyDate,
                username: data.userName,
                description: data.courses.map(course => ([
                    "Course name = " + course.courseName + ";  ",
                    "Description = " + course.description + ";  ",
                    "Start date = " + course.startDate + ";  ",
                ])),
            }))
            return newRes;
        })
}

export async function getSearchStudents(query) {
    return axios.get(url + `/api/students/search?query=` + query, { headers: { "Authorization": "Bearer " + authData.token } })
        .then(res => {
            const newRes = res.data.map(data => ({
                key: data.id,
                id: data.id,
                name: data.name,
                lastName: data.lastName,
                age: data.age,
                email: data.email,
                registeredDate: data.registeredDate,
                studyDate: data.studyDate,
                username: data.userName,
                description: data.courses.map(course => ([
                    "Course name = " + course.courseName + ";  ",
                    "Description = " + course.description + ";  ",
                    "Start date = " + course.startDate + ";  ",
                ])),
            }))
            return newRes;
        })
}