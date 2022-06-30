import React, { useEffect, useState } from "react"
import {
	BrowserRouter as Router,
	Route,
	Link,
	Redirect,
	Routes
} from "react-router-dom"

import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import "./App.css"

import Home from "./components/Home"
import Login from "./components/Login"
import { useDispatch, useSelector } from "react-redux"
import {
	setLocalUserLogin,
	setLoginSuccess,
	setLogoutSuccess
} from "./features/authSlice"
import AdminRegister from "./components/admin/AdminRegister"
import StudentRegister from "./components/StudentRegister"
import { NavDropdown } from "react-bootstrap"
import AdminCreateCourse from "./components/admin/AdminCreateCourse"
import { AdminRoute } from "./components/admin/AdminRoute"
import AdminAllCourses from "./components/admin/AdminAllCourses"
import EditCourse from "./components/admin/EditCourse"
import StudentCourses from "./components/student/StudentCourses"
import { StudentRoute } from "./components/student/StudentRoute"
import CourseList from "./components/student/CourseList"
// 
import AdminAllStudents from "./components/admin/AdminAllStudents"

import StudentInfo from "./components/student/StudentInfo"
// import DeleteStudent from "./components/student/DeleteStudent"
// import PickCourse from "./components/student/PickCourse"
//
function App() {
	const [userEmail, setUserEmail] = useState("")

	const email = useSelector((state) => state.auth.value.email)
	const role = useSelector((state) => state.auth.value.role)

	const dispatch = useDispatch()

	const token = localStorage.getItem("token")
	useEffect(() => {
		if (token != null) {
			dispatch(setLocalUserLogin())
		}
	}, [])

	const logout = () => {
		dispatch(setLogoutSuccess())
	}

	return (
		<Router>
			<Navbar bg="primary" variant="dark" expand="lg">
				<Container>
					<Navbar.Brand href="#home">Jiye Yu Assignment3</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto">
							<Nav.Link as={Link} to="/home">Home</Nav.Link>
							<Nav.Link as={Link} to="/login">Sign in</Nav.Link>
              <Nav.Link as={Link} to="/admin-register">Admin</Nav.Link>
							<Nav.Link as={Link} to="/student-register">Student</Nav.Link>

							{role === "user" && (
								<NavDropdown title="Student Dashboard" id="basic-nav-dropdown">
                {/* <NavDropdown.Item as={Link} to="/student/my-profile">
										My Profile
									</NavDropdown.Item> */}
									<NavDropdown.Item as={Link} to="/student/my-profile">
										My Account
									</NavDropdown.Item>
									<NavDropdown.Item as={Link} to="/student/my-courses">
										My course list
									</NavDropdown.Item>
									<NavDropdown.Item as={Link} to="/student/courses">
										All courses
									</NavDropdown.Item>

								</NavDropdown>
							)}

							{role === "admin" && (
								<NavDropdown title="Admin Dashboard" id="basic-nav-dropdown">
										<NavDropdown.Item as={Link} to="admin/students">
										Student list
									</NavDropdown.Item>
									<NavDropdown.Item as={Link} to="/admin/courses/create">
										Create Course
									</NavDropdown.Item>

                  <NavDropdown.Item as={Link} to="/admin/courses/all">
										Course list
									</NavDropdown.Item>
								</NavDropdown>
							)}
						</Nav>

					</Navbar.Collapse>
					{email && <Navbar.Brand>{email}</Navbar.Brand>}
					{email && (
						<Navbar.Brand className="btn" onClick={logout}>
							{" "}
							Sign out
						</Navbar.Brand>
					)}
				</Container>
			</Navbar>

			<div className="center-container">
				<Routes>
					<Route index element={<Home />} />
					<Route path="home" element={<Home />} />
					<Route path="admin-register" element={<AdminRegister />} />
					<Route path="student-register" element={<StudentRegister />} />
					<Route path="login" element={<Login />} />



		  <Route path="student/my-profile" element={<StudentInfo />} />
		  {/* <Route path="student/my-profile/delete/:studentId" element={<DeleteStudent />} /> */}


					<Route path="student/my-courses" element={
          <StudentRoute>
            <StudentCourses />
            </StudentRoute>
            
          }
					/>

					<Route path="student/courses" element={
          <StudentRoute>
            <CourseList />
            </StudentRoute>
						}
					
					/>
          {/* demo modal
					<Route
						exact
						path="student/courses/pick/:courseId"
						element={<PickCourse />}
					/> */}
					<Route
						exact
						path="admin/courses/edit/:courseId"
						element={<EditCourse />}
					/>

					<Route
						path="admin/courses/create"
						element={
							<AdminRoute>
								<AdminCreateCourse />
							</AdminRoute>
						}
					/>
					<Route
						path="admin/courses/all"
						element={
							<AdminRoute>
								<AdminAllCourses />
							</AdminRoute>
						}
					/>
					<Route
						path="admin/students"
						element={
							<AdminRoute>
								<AdminAllStudents />
							</AdminRoute>
						}
					></Route>
				</Routes>
			</div>
		</Router>
	)
}
//<Route render ={()=> < App />} path="/" />
export default App
