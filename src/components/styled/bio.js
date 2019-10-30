import styled from 'styled-components';

export const Bio = styled.div`

`;

export const BioText = styled.div`
  & p {
    
  }
`;

export const BioPhoto = styled.div`
  background-image: ${({ src }) => `url(${src})`};
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
`