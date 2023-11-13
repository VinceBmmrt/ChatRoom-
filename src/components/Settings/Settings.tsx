import { ChangeEvent, FormEvent } from 'react';
import clsx from 'clsx';
import { X } from 'react-feather';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  changeInputCredentialValue,
  login,
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
  const isLoading = useAppSelector((state) => state.settings.isLoading);
  const errorMsg = useAppSelector((state) => state.settings.error);

  // Quand je click sur mon bouton toggle
  const handleClickToggle = () => {
    // Je vais vouloir emettre l'intention d'inverser la valeur de isOpen
    dispatch(toggleSettings());
  };

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    // J'emet l'intention de changer la valeur de mon email
    dispatch(
      changeInputCredentialValue({
        fieldName: 'email',
        value: newValue,
      })
    );
  };

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    // J'emet l'intention de changer la valeur de mon password
    dispatch(
      changeInputCredentialValue({
        fieldName: 'password',
        value: newValue,
      })
    );
  };

  // A la soumission de mon formulaire
  const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // J'emet l'intention de me connecter
    // Cette intention est une action asynchrone
    dispatch(
      login({
        email: emailValue,
        password: passwordValue,
      })
    );
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

      <form
        // Je rajoute la class loader si une connexion est en cours
        className={clsx('settings__form', { loader: isLoading })}
        onSubmit={handleSubmitForm}
      >
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
          onChange={handleChangePassword}
        />
        <button type="submit" className="settings__submit">
          Envoyer
        </button>

        {errorMsg && <div>{errorMsg}</div>}
      </form>
    </div>
  );
}

export default Settings;
