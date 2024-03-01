import './UpdateEmployee.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

const UpdateEmployee = () => {

    const {id} = useParams();

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

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/employee/${id}`);
                const data = await response.json();
                setFormData(data);
            } catch(error) {
                console.error("Failed to fetch employee: ", error.message); 
            }
        }   

        fetchEmployee();
    }, []);

    const handleSubmitUpdate = async(e) => {
        e.preventDefault();
    
        try {
            const response = await fetch(`http://localhost:8080/api/employee/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
    
            if (!response.ok) {
                throw new Error('Failed to update user. Status: ' + response.status);
            }
    
            const data = await response.json(); 
            console.log("User updated:", data);
    
            navigate("/");
        } catch(error) {
            console.error("Failed to update user: ", error.message);
        }
    };
    

    return (
        <>
        <div className="center-form">
            
            <h1> Edit Employee </h1>
            <Form onSubmit={handleSubmitUpdate}>
                <Form.Group controlId="formNewEmployee">
                    <Form.Control 
                        type="text"
                        name="email"
                        placeholder="Edit email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group controlId="formNewEmployee">
                    <Form.Control 
                        type="text"
                        name="name"
                        placeholder="Edit name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group controlId="formNewEmployee">
                    <Form.Control 
                        type="text"
                        name="phone"
                        placeholder="Edit phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group controlId="formNewEmployee">
                    <Form.Control 
                        type="text"
                        name="department"
                        placeholder="Edit department"
                        value={formData.department}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100"> 
                    Update Employee 
                </Button>
            </Form>
        </div>
        </>
    )
}

export default UpdateEmployee;