import Center from '@/components/Center';
import FlyingButton from '@/components/FlyingButton';
import Header from '@/components/Header';
import CartIcon from '@/components/icons/CartIcon';
import ProductImages from '@/components/ProductImages';
import ProductReviews from '@/components/ProductReviews';
import { Price } from '@/components/styles/Price.styled';
import { PriceRow } from '@/components/styles/PriceRow.styled';
import { ColWrapper } from '@/components/styles/Product/ColumnWrapper.styled';
import { Description } from '@/components/styles/Product/Description.styled';
import { ProductDetails } from '@/components/styles/Product/ProductDetails.styled';
import { Title } from '@/components/styles/Product/Title.styled';
import { WhiteBox } from '@/components/WhiteBox';
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';

export default function ProductPage({ product }) {
  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>

          <ProductDetails>
            <Title>{product.title}</Title>
            <Description>{product.description}</Description>
            <PriceRow>
              <div>
                <Price>${product.price}</Price>
              </div>
              <div>
                <FlyingButton
                  main={1}
                  _id={product._id}
                  src={product.images?.[0]}
                >
                  <CartIcon />
                  Add to cart
                </FlyingButton>
              </div>
            </PriceRow>
            <ProductReviews product={product} />
          </ProductDetails>
        </ColWrapper>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);

  return {
    props: {
      product: JSON.parse(JSON.stringify(product))
    }
  };
}
