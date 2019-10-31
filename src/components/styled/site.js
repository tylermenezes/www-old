import styled from 'styled-components';

export const SiteHead = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: ${({ theme }) => `${theme.modularScale(-1)} auto ${theme.modularScale(3)}`};
  &:after {
    content: "";
    display: block;
    clear: both;
  }
`;

export const SiteTitle = styled.h1`
  float: left;
  font-family: ${({ theme }) => theme.font.mono};
  &, a {
    color: ${({ theme }) => theme.color.black};
  }
`;

export const SiteNav = styled.ul`
  float: right;
  padding: 0;
  text-align: right;
  position: relative;
  top: 15px;

  li {
    list-style-type: none;
    display: inline-block;
    padding-left: ${({ theme }) => theme.columnPadding};

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
  margin: ${({ theme }) => theme.modularScale(5)} auto;

  p {
    font-family: ${({ theme }) => theme.font.body };
    font-size: ${({ theme }) => theme.modularScale(0)};
    color: ${({ theme }) => theme.color.grey[0] };
  }
`;
