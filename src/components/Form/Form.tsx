import { useAppSelector } from '../../hooks/redux';
import './Form.scss';

function Form() {
  // Je récupère la valeur de mon input depuis mon store redux
  const inputValue = useAppSelector((state) => state.chat.inputValue);
  return (
    <form className="form">
      <input className="form__input" value={inputValue} />
      <button type="submit" className="form__button">
        &gt;
      </button>
    </form>
  );
}

export default Form;
