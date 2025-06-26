import css from "./ErrorMessage.module.css";
import { BiError } from "react-icons/bi";

export default function ErrorMessage() {
  return (
    <>
      <p className={css.error_text}>
        <BiError size={120} />
        <hr />
        There was an error, please try again...
      </p>
    </>
  );
}