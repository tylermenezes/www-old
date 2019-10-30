import styled from 'styled-components';

export const GridLayout = styled.section`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: ${({ theme }) => theme.columnPadding};
`;

export const GridColumn = styled.section`
  ${({ start }) => start && `grid-column-start: ${start};`}
  grid-column-end: ${({ width }) => `span ${width}`};
  box-sizing: border-box;
  overflow: hidden;
`;
