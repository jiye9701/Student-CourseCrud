import axios from "axios"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { setLoginSuccess } from "../features/authSlice"
import { gql, useMutation, useQuery } from "@apollo/client"
import "../css/style.css"

const REGISTER = gql`
	mutation Register(
		$email: String!
		$password: String!
		$role: String!
		$firstName: String!
		$lastName: String!
		$studentNumber: String!
		$address: String!
		$city: String!
		$phoneNumber: String!
		$program: String!
	) {
		register(
			email: $email
			password: $password
			studentNumber: $studentNumber
			role: $role
			firstName: $firstName
			lastName: $lastName
			address: $address
			city: $city
			phoneNumber: $phoneNumber
			program: $program
		) {
			id
			email
			role
			token
		}
	}
`

function StudentRegister() {
	const [
		register,
		{ data: registerData, loading: registerLoading, error: registerError }
	] = useMutation(REGISTER, {
		onCompleted: (registerData) => {
			dispatch(setLoginSuccess(registerData.register))
			navigate("/home")
		}
	})
	const [user, setUser] = useState({
		password: "",
		email: "",
		role: "user",
		studentNumber: "",
		firstName: "",
		lastName: "",
		address: "",
		city: "",
		phoneNumber: "",
		program: ""
		 
	})
	const navigate = useNavigate()

	//Set dispatch Redux
	const dispatch = useDispatch()

	const onInputChange = (e) =>
		setUser({ ...user, [e.target.name]: e.target.value })

	const handleRegister = async (e) => {
		e.preventDefault()

		register({
			variables: user
		})
	}

	return (
		<>
			<Form onSubmit={(e) => handleRegister(e)}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter the Email"
						name="email"
						value={user.email}
						onChange={(e) => onInputChange(e)}
					/>

				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter the Password"
						name="password"
						value={user.password}
						onChange={(e) => onInputChange(e)}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicFirstName">
					<Form.Label>First Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter the First Name"
						name="firstName"
						value={user.firstName}
						onChange={(e) => onInputChange(e)}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicLastName">
					<Form.Label>Last Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter the Last Name"
						name="lastName"
						value={user.lastName}
						onChange={(e) => onInputChange(e)}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicStudentNumber">
					<Form.Label>Student Number</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter the Student Number"
						name="studentNumber"
						value={user.studentNumber}
						onChange={(e) => onInputChange(e)}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicAddress">
					<Form.Label>address</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter the Address"
						name="address"
						value={user.address}
						onChange={(e) => onInputChange(e)}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicCity">
					<Form.Label>city</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter the City"
						name="city"
						value={user.city}
						onChange={(e) => onInputChange(e)}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicPhoneNumber">
					<Form.Label>phone Number</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter the Phone Number"
						name="phoneNumber"
						value={user.phoneNumber}
						onChange={(e) => onInputChange(e)}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicProgram">
					<Form.Label>program</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter the Program"
						name="program"
						value={user.program}
						onChange={(e) => onInputChange(e)}
					/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Register
				</Button>
			</Form>
		</>
	)
}

export default StudentRegister
