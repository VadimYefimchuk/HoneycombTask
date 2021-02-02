import axios from 'axios';
import { openNotification } from './Notifications';


export var url = window.location.href.replace(window.location.pathname, "");
export let authData = JSON.parse(localStorage.getItem('login'));
export let userData = JSON.parse(localStorage.getItem('userData'));

export async function getCourses() {
    return axios.get(url + `/api/courses`,
        { headers: { "Authorization": "Bearer " + authData.token } })
        .then(res => {
            const allCourses = res.data.map(data => ({
                key: data.id,
                courseName: data.courseName,
                description: data.description,
                imageURL: data.imageURL,
            }))
            return allCourses;
        })
        .catch((error) => {
            console.error(error.message);
            openNotification('error', 'ERROR!', 'Courses are empty');
        });
}

export async function registerCourses(data) {
    return axios.put(url + `/api/StudentsCourses/` + userData.id,
    data,
    { headers: { "Authorization": "Bearer " + authData.token } })
        .then(res => {
            openNotification('success', 'SUCCESS!', res.data.message);
        })
        .catch((error) => {
            console.error(error.message);
            openNotification('error', 'ERROR!', 'NOT REGISTERED!');
        });
}