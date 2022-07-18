import { FormEvent, useState } from 'react';

type NameSelectorProps = {
  onSelect: (name: string) => void;
  disabled: boolean;
}

NameSelector.defaultProps = {
  disabled: false
};

export function NameSelector({ onSelect, disabled }: NameSelectorProps) {
  const [ error, setError ] = useState<string>('');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const name = new FormData(e.currentTarget).get('name');
    if (!name || name.toString().trim() === '') {
      setError('Choisis un pseudo !');
      return;
    }
    onSelect(name.toString());
  }

  return (
      <>
        <h1>Choisis un pseudo</h1>

        {error && <div className="alert">
          {error}
          <button className="alert__close"
                  onClick={() => setError('')}>
            &times;
          </button>
        </div>}

        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="name">Ton pseudo</label>
          <input type="text" id="name" name="name" required/>

          <button type="submit"
                  disabled={disabled}>
            Enregistrer
          </button>
        </form>
      </>
  );
}
