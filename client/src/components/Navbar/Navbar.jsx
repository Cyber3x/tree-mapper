import React from 'react';
import { TopNav } from 'bumbag';

const Navbar = () => {
  return (
    <TopNav flex justifyContent="space-around">
      <TopNav.Section>
        <TopNav.Item href="#">POGLEDAJ SVOJA STABLA</TopNav.Item>
        <TopNav.Item href="#">DODAJ STABLO</TopNav.Item>
        <TopNav.Item href="#">KARTA</TopNav.Item>
        <TopNav.Item href="#">POGLEDAJ SVA STABLA</TopNav.Item>
      </TopNav.Section>
    </TopNav>
  );
};

export default Navbar;
