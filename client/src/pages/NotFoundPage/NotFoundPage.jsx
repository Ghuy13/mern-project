import { useNavigate } from "react-router-dom";
import { Button } from "antd";

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                background: "#f8f9fa",
                textAlign: "center"
            }}
        >
            <img
                src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
                alt="404"
                style={{ width: "200px", marginBottom: "20px" }}
            />
            <h1 style={{ fontSize: "64px", margin: "0", color: "#ff4d4f" }}>404</h1>
            <h2 style={{ margin: "10px 0", color: "#333" }}>Oops! Page Not Found</h2>
            <p style={{ color: "#666", maxWidth: "400px" }}>
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Button
                type="primary"
                size="large"
                style={{ marginTop: "20px", borderRadius: "8px" }}
                onClick={() => navigate("/")}
            >
                Go Back Home
            </Button>
        </div>
    );
};

export default NotFoundPage;
