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

export async function getStudents(start, length) {
    return axios.get(url + `/api/students?start=` + start + '&length=' + length, 
    { headers: { "Authorization": "Bearer " + authData.token } })
        .then(res => {
            const newRes = res.data.data.map(data => ({
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
                    course.courseName,
                    course.description,
                    course.startDate,
                    course.id
                ])),
            }))
            return {
                data: newRes, 
                count: res.data.count
            };
        })
}

export async function getSearchStudents( currentPage, pageSize, searchString = null, sortOrder = null, sortField = null) {
    return axios.post(url + `/api/students/search`,
    {
        pageSize: pageSize,
        currentPage: currentPage,
        sortOrder: sortOrder,
        sortField: sortField,
        searchString: searchString
    },
    { headers: { "Authorization": "Bearer " + authData.token } })
        .then(res => {
            const newRes = res.data.data.map(data => ({
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
                    course.courseName,
                    course.description,
                    course.startDate,
                    course.id
                ])),
            }))
            return {
                data: newRes, 
                count: res.data.count
            };
        })
        .catch((error) => {
            console.error(error.message);
            openNotification('error', 'ERROR!', 'NOT FOUND!');
        });
}