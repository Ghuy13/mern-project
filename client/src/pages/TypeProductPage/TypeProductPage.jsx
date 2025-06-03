import { Col, Pagination, Row } from "antd";
import CardComponent from "../../components/CardComponent/CardComponent";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import { WrapperProducts, WrapprerNavbar } from "./style";


const TypeProductPage = () => {
    const onChange = () => { }
    return (
        <div style={{ padding: '0 120px', background: '#efefef', }}>
            <Row style={{ flexWrap: 'nowrap', paddingTop: '10px' }}>
                <WrapprerNavbar span={4}>
                    <NavbarComponent></NavbarComponent>
                </WrapprerNavbar>
                <Col span={20}>
                    <WrapperProducts >
                        <CardComponent></CardComponent>
                        <CardComponent></CardComponent>
                        <CardComponent></CardComponent>
                        <CardComponent></CardComponent>
                        <CardComponent></CardComponent>
                        <CardComponent></CardComponent>
                    </WrapperProducts>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                        <Pagination defaultCurrent={2} total={100} onChange={onChange} />
                    </div>
                </Col>
            </Row>
        </div>
    );
}
export default TypeProductPage;