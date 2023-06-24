import ButtonLink from '@/components/ButtonLink';
import Center from '@/components/Center';
import FlyingButton from '@/components/FlyingButton';
import CartIcon from '@/components/icons/CartIcon';
import { ButtonsWrapper } from '@/components/styles/ButtonWrapper.styled';
import { ColumnsWrapper } from '@/components/styles/ColumnWrapper.styled';
import { ContentWrapper } from '@/components/styles/ContentWrapper.styled';

import { BackgroundStyled } from '@/components/styles/FeaturedProduct/Background.styled';
import { CenterImg } from '@/components/styles/FeaturedProduct/CenterImg.styled';
import { Column } from '@/components/styles/FeaturedProduct/Column.styled';
import { Description } from '@/components/styles/FeaturedProduct/Description.styled';
import { Title } from '@/components/styles/FeaturedProduct/Title.styled';
import { ImgColumn } from '@/components/styles/ImgColumn.styled';

import { RevealWrapper } from 'next-reveal';

export default function Featured({ product }) {
  return (
    <BackgroundStyled>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <RevealWrapper origin={'left'} delay={0}>
                <ContentWrapper>
                  <Title>{product?.title}</Title>
                  <Description>{product?.short_description}</Description>
                  <ButtonsWrapper>
                    <ButtonLink href={'/product/' + product?._id} primary={1}>
                      Read more
                    </ButtonLink>
                    <FlyingButton
                      white={1}
                      _id={product?._id}
                      src={product?.images?.[0]}
                    >
                      <CartIcon />
                      Add to cart
                    </FlyingButton>
                  </ButtonsWrapper>
                </ContentWrapper>
              </RevealWrapper>
            </div>
          </Column>

          <ImgColumn>
            <RevealWrapper delay={0}>
              <CenterImg>
                <img className={'main'} src={product?.images?.[0]} alt="" />
              </CenterImg>
            </RevealWrapper>
          </ImgColumn>
        </ColumnsWrapper>
      </Center>
    </BackgroundStyled>
  );
}
