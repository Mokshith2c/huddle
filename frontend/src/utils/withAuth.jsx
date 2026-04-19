import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function withAuth(WrappedComponent) {

    const AuthComponent = (props) => {
        const navigate = useNavigate();

        useEffect(() => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/auth");
                return;
            }

            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                if (payload.exp * 1000 < Date.now()) {
                    localStorage.removeItem("token");
                    navigate("/auth");
                }
            } catch (e) {
                console.error("Token validation error:", e);
                navigate("/auth");
            }
        }, [navigate]);

        return <WrappedComponent {...props} />;
    };

    return AuthComponent;
}

export default withAuth;