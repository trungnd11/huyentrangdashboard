import styled from "styled-components";
import { Red } from "../../assets/styled-components/Variables";

type Props = {
  title: string;
  required?: boolean;
  htmlFor?: string;
};

const LabelStyle = styled.span`
  position: relative;

  i {
    color: ${Red};
    font-size: .5rem;
    position: absolute;
    top: 2px;
    right: -.8rem;
  }
`;

export default function Label({ title, required, htmlFor }: Props) {
  return (
    <LabelStyle>
      <label htmlFor={htmlFor ? htmlFor : ""}>{ title }</label>
      {required && <i className="fa-solid fa-asterisk" />}
    </LabelStyle>
  );
}
