import { BigImage } from '@/components/styles/Product/BigImage.styled';
import { BigImageWrapper } from '@/components/styles/Product/BigImageWrapper.styled';
import { Image } from '@/components/styles/Product/Image.styled';
import { ImageButton } from '@/components/styles/Product/ImageButton.styled';
import { ImageButtons } from '@/components/styles/Product/ImageButtons.styled';
import { useState } from 'react';

export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);

  return (
    <>
      <BigImageWrapper>
        <BigImage src={activeImage} />
      </BigImageWrapper>

      <ImageButtons>
        {images.map((image, index) => (
          <ImageButton
            key={image + index}
            active={image === activeImage}
            onClick={() => setActiveImage(image)}
          >
            <Image src={image} alt="" />
          </ImageButton>
        ))}
      </ImageButtons>
    </>
  );
}
