import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeInputValue } from '../../store/reducers/chat';
import './Form.scss';

function Form() {
  // Je vais vouloir emettre des intentions à mon store lorsque la valeur de mon input change
  // Je récupère donc la fonction qui me permet d'emettre une intention
  const dispatch = useAppDispatch();
  // Je récupère la valeur de mon input depuis mon store redux
  const inputValue = useAppSelector((state) => state.chat.inputValue);

  const handleChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    // J'emet l'intention de changer la valeur de mon input avec sa nouvelle valeur
    dispatch(changeInputValue(newValue));
  };

  return (
    <form className="form">
      <input
        className="form__input"
        value={inputValue}
        onChange={handleChangeInputValue}
      />
      <button type="submit" className="form__button">
        &gt;
      </button>
    </form>
  );
}

export default Form;
