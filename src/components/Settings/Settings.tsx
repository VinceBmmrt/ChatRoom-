import './Settings.scss';

function Settings() {
  return (
    <div className="settings">
      <button type="button" className="settings__toggle">
        X
      </button>
      <form className="settings__form">
        <input type="email" className="settings__input" />
        <input type="password" className="settings__input" />
        <button type="submit" className="settings__submit">
          Envoyer
        </button>
      </form>
    </div>
  );
}

export default Settings;
