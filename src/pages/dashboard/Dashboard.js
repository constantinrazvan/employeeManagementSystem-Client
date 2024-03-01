import { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/employees");
                const data = await response.json();

                if (Array.isArray(data)) {
                    setEmployees(data);
                } else {
                    console.error("Data is not an array", data);
                }

            } catch(error) {
                console.error("Failed to fetch employees: ", error.message);
            }
        }

        fetchEmployees();
    }, []);

    const handleDelete = async (employeeId) => { 
        try {
            const response = await fetch(`http://localhost:8080/api/employee/${employeeId}`, {
                method: "DELETE",
            });

            if(response.ok) {
                setEmployees((prevEmployees) => {
                    return prevEmployees.filter((employee) => employee.id !== employeeId);
                });                
            } 

            console.log(`Employee with id ${employeeId} deleted successfully`);
        } catch (error) {
            console.log("Error deleting employee: ", error.message);
        }
    }

    const handleUpdate = (employeeId) => {
        navigate(`/employee/${employeeId}`);
    }

    return (
        <>
            <Container className="mt-5">
                <Row>
                    <Col>
                        <h1 className="text-center"> </h1>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Department</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((employee) => (
                                    <tr key={employee.id}>
                                        <td>{employee.name}</td>
                                        <td>{employee.email}</td>
                                        <td>{employee.phone}</td>
                                        <td>{employee.department}</td>
                                        <td>
                                            <Button style={{ marginRight: "5px"}} variant="primary" onClick={() =>handleUpdate(employee.id)}>Edit</Button>
                                            <Button style={{ marginLeft: "5px"}} variant="danger" onClick={() =>handleDelete(employee.id)}>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    )
} 

export default Dashboard;