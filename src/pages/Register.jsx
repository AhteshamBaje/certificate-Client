import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8003/api4/", formData);
            setMessage(response.data.message);
            setFormData({ name: "", email: "", password: "" }); // Clear form after successful registration
            setTimeout(() => {
                navigate("/login"); // Navigate to login after successful registration
            }, 1000); // Delay for user to see the success message
        } catch (error) {
            setMessage(error.response?.data?.error || "Error registering user");
        }
    };

    return (
        <>
            <nav className="bg-blue-600 text-white py-6 shadow-lg flex justify-between px-6">
                <h1 className="text-2xl font-bold">Certificate Generator</h1>
                <button className="text-xl font-bold" onClick={() => navigate('/login')}>Login</button>
            </nav>
            <div className="max-w-md mx-auto p-6 text-center">
                <h2 className="text-2xl font-bold mb-4">Register</h2>
                {message && <p className="text-green-500">{message}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="block w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="block w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="block w-full p-2 border border-gray-300 rounded"
                    />
                    <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded cursor-pointer">Register</button>
                </form>
            </div>
        </>
    );
};

export default Register;
