import styled from 'styled-components';

export const GridLayout = styled.section`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: ${({ theme }) => theme.columnPadding};

  @media (max-width: 768px) {
    grid-template-columns: repeat(${({ mobileCols }) => mobileCols || 1}, 1fr);
  }
`;

export const GridColumn = styled.section`
  ${({ start }) => start && `grid-column-start: ${start};`}
  grid-column-end: ${({ width }) => `span ${width}`};
  box-sizing: border-box;
  overflow: hidden;

  @media (max-width: 768px) {
    ${({ mobileRow }) => mobileRow && `grid-row-start: ${mobileRow};`}
  }

  @media (min-width: 768px) {
    ${({ desktopStart }) => desktopStart && `grid-column-start: ${desktopStart};`}
  }
`;
