import styled from 'styled-components';
import logo from "../../../content/logo.svg";

export const SiteHead = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: ${({ theme }) => theme.modularScale(-1)} auto;
  margin-bottom: ${({ theme }) => theme.modularScale(2)};

  &:after {
    content: "";
    display: block;
    clear: both;
  }
`;

export const SiteTitle = styled.h1`
  float: left;

  a {
    font-size: 1px;
    text-indent: -100px;
    text-decoration: none;
    overflow: hidden;

    display: inline-block;
    height: ${({ theme }) => theme.modularScale(3)};
    width: calc( ${({ theme }) => theme.modularScale(3)} * 10 );

    background-image: url(${logo});
    background-size: contain;
    background-position: 0 50%;
    background-repeat: none;
  }

  @media (max-width: 768px) {
    float: none;
    text-align: left;
    margin-bottom: 0;
    a {
      background-position: 50% 50%;
    }
  }
`;

export const SiteNav = styled.ul`
  float: right;
  padding: 0;
  text-align: right;
  position: relative;
  top: 10px;

  @media (max-width: 768px) {
    float: none;
    position: initial;
    top: auto;
    text-align: left;
    margin-top: 0;
  }

  li {
    list-style-type: none;
    display: inline-block;

    &:not(:first-child) {
      padding-left: ${({ theme }) => theme.columnPadding};
    }

    a {
      font-size: ${({ theme }) => theme.modularScale(1)};
      font-family: ${({ theme }) => theme.font.mono};
      font-weight: 500;
      color: ${({ theme }) => theme.color.black };
    }
  }
`;

export const SiteMain = styled.section`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
`;

export const SiteFooter = styled.footer`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: ${({ theme }) => theme.modularScale(3)} auto ${({ theme }) => theme.modularScale(-3)};

  p {
    font-family: ${({ theme }) => theme.font.body };
    font-size: ${({ theme }) => theme.modularScale(0)};
    color: ${({ theme }) => theme.color.grey[0] };
    margin: 0;
  }
`;
