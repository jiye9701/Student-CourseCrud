import React, { Component, useEffect, useState } from "react"
import axios from "axios"
import { Button, Card, Col, Row, Form } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useParams, Navigate, useNavigate } from "react-router-dom"
import { gql, useMutation, useQuery } from "@apollo/client"

const GET_STUDNET = gql`
	query Student($id: String!) {
		student(id: $id) {
			id
			firstName,
			lastName,
			studentNumber,

			program,
			email,
			address,
			city,
			phoneNumber
		}
	}
`
//delete unused mutation

function StudentInfo() {
	const [student, setStudent] = useState({
		studentId: "",
		firstName: "",
		lastName: "",
		studentNumber: "",

        program: "",
        email: "",
        address: "",
        city: "",
        phoneNumber: ""
	})
	// const token = useSelector((state) => state.auth.value.token)
	const userId = useSelector((state) => state.auth.value.userId)
	const id = localStorage.getItem("userId")
	const navigate = useNavigate()
	const { studentId } = useParams()

	const { loading, error, data: studentData } = useQuery(GET_STUDNET, {
		variables: { id: userId },
		fetchPolicy: "network-only",
		onCompleted: () => {

			setStudent({
				studentId: studentData.student.studentId,
				firstName: studentData.student.firstName,
				lastName: studentData.student.lastName,
				studentNumber: studentData.student.studentNumber,

                program: studentData.student.program,
                email: studentData.student.email,
                address: studentData.student.address,
                city: studentData.student.city,
                phoneNumber: studentData.student.phoneNumber

			})
		}
	})






	return (
		<>
			{/* <Form onSubmit={(e) => handleUpdateStudent(e)}> */}
				<Form>
				{/* <Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>User Id</Form.Label>
					<Form.Control
						type="txt"
						placeholder="studentId"
						name="studentId"
						value={userId}
						disabled
						onChange={(e) => onInputChange(e)}
					/>
				</Form.Group> */}

				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						name="email"
						value={student.email}
						// onChange={(e) => onInputChange(e)}
						
					/>
				</Form.Group>


				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>First Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter student Name"
						name="firstName"
						value={student.firstName}
						// onChange={(e) => onInputChange(e)}
						
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Last Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="lastName"
						name="lastName"
						value={student.lastName}
						// onChange={(e) => onInputChange(e)}
						
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Student Number</Form.Label>
					<Form.Control
						type="studentNumber"
						placeholder="Enter studentNumber"
						name="studentNumber"
						value={student.studentNumber}
						// readOnly
						// onChange={(e) => onInputChange(e)}
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Address</Form.Label>
					<Form.Control
						type="address"
						placeholder="Enter address"
						name="address"
						value={student.address}
						// onChange={(e) => onInputChange(e)}
						
					/>
				</Form.Group>

				{/* user */}
			

                <Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>City</Form.Label>
					<Form.Control
						type="city"
						placeholder="Enter city"
						name="city"
						value={student.city}
						// onChange={(e) => onInputChange(e)}
						
					/>
				</Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>PhoneNumber</Form.Label>
					<Form.Control
						type="phoneNumber"
						placeholder="Enter phoneNumber"
						name="phoneNumber"
						value={student.phoneNumber}
						// onChange={(e) => onInputChange(e)}
						
					/>
				</Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Program</Form.Label>
					<Form.Control
						type="program"
						placeholder="Enter program"
						name="program"
						value={student.program}
						// onChange={(e) => onInputChange(e)}
						
					/>
				</Form.Group>
<br></br>
				{/* <Button variant="primary" type="submit">
					Update
				</Button>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

				<Button
				value={userId}
				variant="danger"
				onClick={(e) => handleDelete(e)}>Delete
				</Button> */}
			</Form>
		</>
	)
}

export default StudentInfo
