import React from 'react'
import { getCourses } from '../Services/CoursesQuery'
import { Carousel, Card } from 'antd';
import { Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;

const contentStyle = {

    //height: '80%',
    //width: '80%',
    //color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    //background: '#364d79',
};

export default class Courses extends React.Component {
    constructor() {
        super();
        this.state = {
            courses: []
        }
    }

    async componentDidMount() {
        var courses = await getCourses();
        this.setState({ courses: courses })

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
                </Card>

                <br /><br />
            </div>
        ))
        return allCoursesCard;
    }

    render() {
        return (
            <div>
                <Carousel
                    autoplay
                    fade
                >
                    {this.getAllCourses()}
                </Carousel>
            </div>
        )
    }
}