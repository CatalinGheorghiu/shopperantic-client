import { CartContext } from '@/components/CartContext';
import Center from '@/components/Center';
import BarsIcon from '@/components/icons/Bars';
import SearchIcon from '@/components/icons/SearchIcon';
import { Header as StyledHeader } from '@/components/styles/Header.styled';

import { Logo } from '@/components/styles/Logo.styled';
import { NavButton } from '@/components/styles/NavButton.styled';
import { Nav } from '@/components/styles/Navigation/Nav.styled';
import { NavLink } from '@/components/styles/Navigation/NavLink.styled';
import { SideIcons } from '@/components/styles/SideIcons.styled';
import { Wrapper } from '@/components/styles/Wrapper.styled';

import Link from 'next/link';

import { useContext, useState } from 'react';

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={'/'}>Shopperantics</Logo>

          <Nav mobileNavActive={mobileNavActive}>
            <NavLink href={'/'}>Home</NavLink>
            <NavLink href={'/products'}>All products</NavLink>
            <NavLink href={'/categories'}>Categories</NavLink>
            <NavLink href={'/account'}>Account</NavLink>
            <NavLink href={'/cart'}>Cart ({cartProducts.length})</NavLink>
          </Nav>

          <SideIcons>
            <Link href={'/search'}>
              <SearchIcon />
            </Link>
            <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
              <BarsIcon />
            </NavButton>
          </SideIcons>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
