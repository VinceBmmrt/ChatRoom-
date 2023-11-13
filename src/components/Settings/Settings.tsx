import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toggleSettings } from '../../store/reducers/settings';
import './Settings.scss';

function Settings() {
  // On veut emettre une intention, j'ai donc besoin de récupérer la fonction dispatch de mon store redux
  const dispatch = useAppDispatch();
  // Pour récupérer les données provenant de mon store, j'utilise useAppSelector
  const isSettingsOpened = useAppSelector((state) => state.settings.isOpen);

  // Quand je click sur mon bouton toggle
  const handleClickToggle = () => {
    // Je vais vouloir emettre l'intention d'inverser la valeur de isOpen
    dispatch(toggleSettings());
  };
  return (
    <div className="settings">
      <button
        type="button"
        className="settings__toggle"
        onClick={handleClickToggle}
      >
        X
      </button>
      {isSettingsOpened && (
        <form className="settings__form">
          <input type="email" className="settings__input" />
          <input type="password" className="settings__input" />
          <button type="submit" className="settings__submit">
            Envoyer
          </button>
        </form>
      )}
    </div>
  );
}

export default Settings;
