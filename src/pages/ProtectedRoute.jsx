import { useEffect } from "react";
import { useNavigate } from "react-router"

function ProtectedRoute ({children}) {
    const navigate = useNavigate();

    useEffect(() => {
        let login = localStorage.getItem("token");

        if(!login){
            navigate('/login');
        }
    },[navigate]);

    return(
        <div>
            <>{children}</>
        </div>
    );
}

export default ProtectedRoute;