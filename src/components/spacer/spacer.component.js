import styled from "styled-components/native";

const sizeVariant = {
  small: 1,
  medium: 2,
  large: 3,
};

const positionVariant = {
  top: "marginTop",
  left: "marginLeft",
  right: "marginRight",
  bottom: "marginBottom",
};

export const Spacer = ({ position = "top", size = "small", children }) => {
  const getVariant = (position, size, theme) => {
    const sizeIndex = sizeVariant[size];
    const property = positionVariant[position];
    const value = theme.space[sizeIndex];
    return `${property}:${value}`;
  };

  const Spacer = styled.View`
    ${(props) => getVariant(position, size, props.theme)}
  `;

  return <Spacer>{children}</Spacer>;
};
