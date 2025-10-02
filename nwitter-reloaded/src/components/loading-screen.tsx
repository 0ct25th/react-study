import { styled } from "styled-components";

const Wrappaer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.span`
  font-size: 24px;
`;

export default function LoadingScreen() {
  return (
    <Wrappaer>
      <Text>Loading ...</Text>
    </Wrappaer>
  );
}
