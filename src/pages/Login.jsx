import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

    };
    useEffect(() => {
        const login = localStorage.getItem("token")

        if (login) {
            navigate('/home')
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api5/login", formData);
            localStorage.setItem("token", response.data.token); // Store JWT token
            setMessage(response.data.message);
            setFormData({ email: "", password: "" }); // Clear form after successful login
            setTimeout(() => {
                navigate("/home"); // Navigate to Home after successful login
            }, 1000); // Delay for user to see the success message
        } catch (error) {
            setMessage(error.response?.data?.message || "Error logging in");
        }
    };

    return (
        <>
            <nav className="bg-blue-600 text-white py-6 shadow-lg flex justify-between px-6">
                <h1 className="text-2xl font-bold">Certificate Generator</h1>
                <button className="text-xl font-bold" onClick={() => navigate('/')}>Signup</button>
            </nav>
            <div className="max-w-md mx-auto p-6 text-center">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                {message && <p className="text-red-500">{message}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
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
                    <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded cursor-pointer">Login</button>
                </form>
            </div>
        </>
    );
};

export default Login;
