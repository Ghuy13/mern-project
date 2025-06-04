import { Col, Pagination, Row } from "antd";
import CardComponent from "../../components/CardComponent/CardComponent";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import { WrapperNavbar, WrapperProducts } from "./style";


const TypeProductPage = () => {
    const onChange = () => { }
    return (
        <div style={{ padding: '0 120px', background: '#efefef', }}>
            <div style={{ width: '1270px', margin: '0 auto', }}>
                <Row style={{ flexWrap: 'nowrap', paddingTop: '10px' }}>
                    <WrapperNavbar span={4}>
                        <NavbarComponent></NavbarComponent>
                    </WrapperNavbar>
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
        </div>
    );
}
export default TypeProductPage;