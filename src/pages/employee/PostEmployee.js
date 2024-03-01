import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import './PostEmployee.css';
import { useNavigate } from "react-router-dom";

const PostEmployee = () => {
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        phone: "",
        department: ""
    });

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value); // Add this line for debugging
        setFormData({
            ...formData,
            [name]: value
        });
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        try {
            const response = await fetch("http://localhost:8080/api/employee", {
                method: "POST",
                headers: { "Content-Type": "application/json" }, 
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to create new employee');
            }

            const data = await response.json();
            console.log("Employee created: ", data);
            navigate("/");
        } catch(error) {
            console.log("Error creating employee: ", error.message);
        }
    };

    return (
        <>
        <div className="center-form">
            
            <h1> New Employee </h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formNewEmployee">
                    <Form.Control 
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group controlId="formNewEmployee">
                    <Form.Control 
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group controlId="formNewEmployee">
                    <Form.Control 
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group controlId="formNewEmployee">
                    <Form.Control 
                        type="text"
                        name="department"
                        placeholder="Department"
                        value={formData.department}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100"> 
                    Create Employee 
                </Button>
            </Form>
        </div>
        </>
    )
}

export default PostEmployee;