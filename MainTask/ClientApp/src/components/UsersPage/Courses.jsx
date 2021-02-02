import React from 'react'
import { getCourses, registerCourses } from '../Services/CoursesQuery'
import { openNotification } from '../Services/Notifications'
import { Carousel, Card, Button, Modal, DatePicker } from 'antd';
import { Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import moment from 'moment';

import { areaStyle, buttonStyle, datePickerStyle } from '../Styles/MainFieldStyle';
import { title } from 'process';

const { Meta } = Card;

const contentStyle = {

    //height: '80%',
    //width: '80%',
    //color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    marginLeft: "auto",
    marginRight: "auto",
};

export default class Courses extends React.Component {
    constructor() {
        super();
        this.state = {
            courses: [],
            courseStartDate: '2021-01-01 00:00:00',
        }
        this.userData = JSON.parse(localStorage.getItem('userData'));
        this.authData = JSON.parse(localStorage.getItem('login'));
    }

    async componentDidMount() {
        var courses = await getCourses();
        this.setState({ courses: courses })

    }

    registerCourse = (courseId) => {
        if (this.state.courseStartDate == null || this.state.courseStartDate == ''){
            openNotification('error', 'ERROR DATE!', 'Please select date for current course!');
        }
        else {
            const courseData = {
                studentId: this.userData.id,
                courseId: courseId,
                startDate: this.state.courseStartDate,
            }
            console.log(courseData);
            registerCourses(courseData);
        }
    }

    getAllCourses = () => {
        let allCoursesCard = this.state.courses.map(course =>
        (
            <div style={contentStyle}>
                <Card
                    style={{ borderRadius: "15px" }}
                    cover={
                        <img
                            alt="Course image"
                            src={course.imageURL}
                            width="100" height="300"
                        />
                    }

                >
                    <Meta style={{ height: 150 }}
                        avatar={<Avatar src="https://www.vhv.rs/dpng/d/50-504209_daenerys-targaryen-transparent-background-hd-png-download.png" />}
                        title={course.courseName} description={course.description}

                    />
                    <DatePicker 
                    value = {moment(this.state.courseStartDate, 'YYYY-MM-DD HH:mm:ss')}
                    style={datePickerStyle} 
                    onChange={(event)=>{this.setState({courseStartDate:event._d})}} 
                    showTime 
                    />
                    <br />
                    <Button type="primary" style={buttonStyle} onClick={() => { this.registerCourse(course.key) }}>
                        <strong>SELECT START DATE</strong>
                    </Button>
                </Card>

                <br /><br />
            </div>
        ))
        return allCoursesCard;
    }

    render() {
        var checkLogin = this.authData.login;
        return (
            <div>
                {
                    checkLogin
                        ?
                        <div>
                            <Carousel
                                autoplay
                                fade
                            >
                                {this.getAllCourses()}
                            </Carousel>
                        </div>
                        :
                        <div>
                            <h1 className="text-white" style={{ "textAlign": "center" }}>Please AUTH (Courses page)!</h1>
                            <hr />
                        </div>
                }
            </div>
        )
    }
}