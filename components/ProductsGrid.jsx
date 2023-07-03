import ProductBox from '@/components/ProductBox';
import { StyledProductsGrid } from '@/components/styles/StyledProductsGrid.styled';
import { RevealWrapper } from 'next-reveal';

export default function aProductsGrid({ products, wishedProducts = [] }) {
  return (
    <StyledProductsGrid interval={100}>
      {products?.length > 0 &&
        products.map((product, index) => (
          <RevealWrapper
            key={product._id}
            className="load-hidden"
            origin="left"
            delay={200}
            duration={1000}
          >
            <ProductBox
              {...product}
              wished={wishedProducts.includes(product._id)}
            />
          </RevealWrapper>
        ))}
    </StyledProductsGrid>
  );
}
