import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import { useNavigate, useParams } from "react-router-dom";
import { PageWrap, Container, BreadcrumbBar, CrumbButton, CrumbDivider, Card } from "./style";
import { useState, useEffect } from "react";
import { getDetailsProduct } from "../../services/ProductService";

const ProductDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                setIsLoading(true);
                const response = await getDetailsProduct(id);
                if (response?.data) {
                    setProduct(response.data);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProductData();
    }, [id]);


    return (
        <PageWrap>
            <Container>
                <BreadcrumbBar>
                    <CrumbButton onClick={() => navigate('/')}>Trang chủ</CrumbButton>
                    <CrumbDivider> / </CrumbDivider>
                    {!isLoading && product?.type && (
                        <>
                            <CrumbButton onClick={() => navigate(`/product/${product?.type}`, { state: product?.type })}>
                                {product?.type}
                            </CrumbButton>
                            <CrumbDivider> / </CrumbDivider>
                            <span>{product?.name}</span>
                        </>
                    )}
                </BreadcrumbBar>
                <Card>
                    <ProductDetailsComponent idProduct={id} />
                </Card>
            </Container>
        </PageWrap>
    );
};

export default ProductDetailsPage;
