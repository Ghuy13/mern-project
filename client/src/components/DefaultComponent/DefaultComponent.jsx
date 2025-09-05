import HeaderComponent from "../HeaderComponent/HeaderComponent";
import FooterComponent from "../FooterComponent/FooterComponent";

const DefaultComponent = ({ children }) => {
    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <HeaderComponent />
            <div style={{ flex: 1 }}>
                {children}
            </div>
            <FooterComponent />
        </div>
    );
};

export default DefaultComponent;
