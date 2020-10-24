import styled from 'styled-components';

export const Input = styled.input.attrs({
    type: 'text'
})`
    flex: 1;
    border: 1px solid #007bff;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
    margin-bottom: 5px;
    width: 100%;
`;

export const Text = styled.span`
    font-size: 16px;
`;