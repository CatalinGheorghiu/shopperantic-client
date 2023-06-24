import Center from '@/components/Center';
import ProductsGrid from '@/components/ProductsGrid';
import { Section } from '@/components/styles/Section.styled';
import styled from 'styled-components';

const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: normal;
`;

export default function NewProducts({ products, wishedProducts }) {
  return (
    <Section>
      <Center>
        <Title>New Arrivals</Title>
        <ProductsGrid products={products} wishedProducts={wishedProducts} />
      </Center>
    </Section>
  );
}
