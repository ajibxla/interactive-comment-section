import React from "react";
import styled from "styled-components";

const Flex = styled.div`
  display: flex;
`;

const Left = styled.div`
  flex: 1;
  background-color: blue;
`;

const Right = styled.div`
  flex: 1;
  background-color: red;
`;

export default function Styledtest({ left: Test, right: Tight }) {
  return (
    <>
      <Flex>
        <Left>
          <Test />
        </Left>
        <Right>
          <Tight />
        </Right>
      </Flex>
    </>
  );
}
