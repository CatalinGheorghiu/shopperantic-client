import FlyingButton from '@/components/FlyingButton';
import HeartOutlineIcon from '@/components/icons/HeartOutlineIcon';
import HeartSolidIcon from '@/components/icons/HeartSolidIcon';
import { Price } from '@/components/styles/Price.styled';
import { PriceRow } from '@/components/styles/PriceRow.styled';
import { ProductInfoBox } from '@/components/styles/ProductInfoBox.styled';
import { ProductWrapper } from '@/components/styles/ProductWrapper.styled';
import { WishlistButton } from '@/components/styles/WhishlistButton.styled';
import { WhiteBox } from '@/components/WhiteBox';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';

const Title = styled(Link)`
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 20px;
  color: #171617;
  letter-spacing: 0.56px;
  text-decoration: none;

  @media (min-width: 768px) {
    min-height: 40px;
  }
`;

export default function ProductBox({
  _id,
  title,
  price,
  images,
  wished = false,
  onRemoveFromWishlist = () => {}
}) {
  const url = '/product/' + _id;
  const [isWished, setIsWished] = useState(wished);

  function addToWishlist(ev) {
    ev.preventDefault();
    ev.stopPropagation();

    const nextValue = !isWished;
    if (nextValue === false && onRemoveFromWishlist) {
      onRemoveFromWishlist(_id);
    }
    axios
      .post('/api/wishlist', {
        product: _id
      })
      .then(() => {});
    setIsWished(nextValue);
  }

  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div style={{ position: 'relative', width: 'fit-content' }}>
          <WishlistButton wished={isWished} onClick={addToWishlist}>
            {isWished ? <HeartSolidIcon /> : <HeartOutlineIcon />}
          </WishlistButton>
          <Image src={images?.[0]} alt={title} width={320} height={320} />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>${price}</Price>
          <FlyingButton _id={_id} src={images?.[0]}>
            Add to cart
          </FlyingButton>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
