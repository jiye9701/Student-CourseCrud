import React, {  useState } from "react"
import { Button, Card, Col, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const { gql, useQuery, useMutation } = require("@apollo/client")

const GET_STUDENT = gql`
	query Student($id: String!) {
		student(id: $id) {
			id
			courses {
				id
				courseCode
				courseName
				section
				semester
			}
		}
	}
`

const DROP_COURSE = gql`
	mutation DropCourse($courseId: String!, $studentId: String!) {
		dropCourse(courseId: $courseId, studentId: $studentId) {
			id
		}
	}
`

function StudentCourses() {
	const [courses, setCourses] = useState([])

	const userId = useSelector((state) => state.auth.value.userId)
	const id = localStorage.getItem("userId")

	const { loading, error, data: studentData, refetch } = useQuery(GET_STUDENT, {
		variables: { id },
		fetchPolicy: "network-only",
		onCompleted: () => {
			setCourses(studentData.student.courses)
		}
	})

	const [
		dropCourse,
		{ data: dropCourseData, loading: dropCourseLoading, error: dropCourseError }
	] = useMutation(DROP_COURSE, {
		onCompleted: () => {
			console.log("The course has been dropped")
		}
	})

	const handleDeleteCourse = async (e) => {
		const courseId = e.target.value

		dropCourse({
			variables: {
				courseId,
				studentId: userId
			}
		})
		const newCourses = courses.filter(function (item) {
			return item.id !== courseId
		})
		setCourses(newCourses)
		
	}

	return (
		<div>
			<h2> My Course list</h2>
			<br></br>
			{!loading && courses.length !== 0 && courses != null && (
				<Row xs={1} md={3} className="g-4">
					{courses.map((course) => (
						<Col>
							<Card>
								<Card.Header as="h5">
									Course Code: {course.courseCode}
								</Card.Header>
								<Card.Body>
									<Card.Title className="cardTitle">Course Name: {course.courseName}</Card.Title>
									<Card.Text>Section: {course.section}</Card.Text>
									<Card.Text>Semester: {course.semester}</Card.Text>
									<br></br>
									<Button
										variant="danger"
										value={course.id}
										onClick={(e) => handleDeleteCourse(e)}
										className="button"
									>
										Drop Course
									</Button>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
			)}
		</div>
	)
}

export default StudentCourses
