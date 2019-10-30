import styled from 'styled-components';

export const PostTitle = styled.h2`
  font-family: ${({ theme }) => theme.font.headLarge};
  font-size: ${({ theme }) => theme.modularScale(4)};
  margin-bottom: ${({ theme }) => theme.modularScale(-2)};
  margin-top: ${({ theme }) => theme.modularScale(-2)};
  font-weight: 500;
`;

export const PostMeta = styled.div`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: ${({ theme }) => theme.modularScale(0)};
  margin-bottom: ${({ theme }) => theme.modularScale(3)};
  color: ${({ theme }) => theme.color.grey[0]};
`;

export const PostContents = styled.div`
  padding: ${({ theme }) => theme.modularScale(0)};
  border: 1px solid ${({ theme }) => theme.color.grey[2]};

  &:before {
    content: "Contents";
    display: block;
    font-weight: 700;
    text-align: center;
    margin-top: ${({ theme }) => theme.modularScale(-1)};
    margin-bottom: ${({ theme }) => theme.modularScale(1)};
  }

  &, a {
    color: ${({ theme }) => theme.color.grey[0]};
    font-family: ${({ theme }) => theme.font.mono};
    font-size: ${({ theme }) => theme.modularScale(1)};
  }

  & > ul {
    padding-left: ${({ theme }) => theme.modularScale(3)};
    ul {
      display: none;
    }
    p {
      margin: 0;
    }

    li {
      list-style-type: decimal;
    }
  }
`;

export const PostBody = styled.div`
  font-size: ${({ theme }) => theme.modularScale(1)};
  font-family: ${({ theme }) => theme.font.body};

  .footnotes {
    color: ${({ theme }) => theme.color.grey[0]};
    font-size: ${({ theme }) => theme.modularScale(0)};

    ol:before {
      content: "Footnotes";
      display: block;
      text-align: center;
      font-size: ${({ theme }) => theme.modularScale(0)};
      font-weight: 700;
      margin-top: ${({ theme }) => theme.modularScale(1)};
      margin-bottom: ${({ theme }) => theme.modularScale(3)};
    }

    .footnote-backref {
      color: ${({ theme }) => theme.color.grey[2]};
      font-size: ${({ theme }) => theme.modularScale(0)};
      text-decoration: none;

      display: block;
      margin-top: -${({ theme }) => theme.modularScale(0)};
    }
  }
`;
