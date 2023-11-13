import { ChangeEvent } from 'react';
import clsx from 'clsx';
import { X } from 'react-feather';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  changeInputEmailValue,
  toggleSettings,
} from '../../store/reducers/settings';
import './Settings.scss';

function Settings() {
  // On veut emettre une intention, j'ai donc besoin de récupérer la fonction dispatch de mon store redux
  const dispatch = useAppDispatch();
  // Pour récupérer les données provenant de mon store, j'utilise useAppSelector
  const isSettingsOpened = useAppSelector((state) => state.settings.isOpen);
  const emailValue = useAppSelector(
    (state) => state.settings.credentials.email
  );
  const passwordValue = useAppSelector(
    (state) => state.settings.credentials.password
  );

  // Quand je click sur mon bouton toggle
  const handleClickToggle = () => {
    // Je vais vouloir emettre l'intention d'inverser la valeur de isOpen
    dispatch(toggleSettings());
  };

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    dispatch(changeInputEmailValue(newValue));
  };

  return (
    <div
      className={clsx('settings', {
        'settings--closed': !isSettingsOpened,
      })}
    >
      <button
        type="button"
        className="settings__toggle"
        onClick={handleClickToggle}
      >
        <X />
      </button>

      <form className="settings__form">
        <input
          type="email"
          className="settings__input"
          placeholder="Email"
          value={emailValue}
          onChange={handleChangeEmail}
        />
        <input
          type="password"
          className="settings__input"
          placeholder="Mot de passe"
          value={passwordValue}
        />
        <button type="submit" className="settings__submit">
          Envoyer
        </button>
      </form>
    </div>
  );
}

export default Settings;
