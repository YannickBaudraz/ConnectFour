import React, {FormEvent, useState} from 'react';
import {CSSTransition} from 'react-transition-group';
import styled from 'styled-components';
import {Alert, AlertClose, Button, Input} from '../styles';

type NameSelectorProps = {
  onSelect: (name: string) => void;
  disabled?: boolean;
}

export function NameSelector({onSelect, disabled}: NameSelectorProps) {
  const [hasError, setHasError] = useState<boolean>(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const name = new FormData(e.currentTarget).get('name');

    if (!name || name.toString().trim() === '') {
      setHasError(true);
      e.currentTarget.reset();
      return;
    }

    setHasError(false);
    onSelect(name.toString());
    e.currentTarget.reset();
  }

  const alertRef = React.useRef(null);

  return (
      <article>
        <h2>Choisis un pseudo</h2>

        <CSSTransition
            in={hasError}
            timeout={300}
            classNames="element"
            mountOnEnter
            unmountOnExit
            nodeRef={alertRef}
        >
          <Alert ref={alertRef}>
            Choisis un pseudo !
            <AlertClose onClick={() => setHasError(false)}>
              &times;
            </AlertClose>
          </Alert>
        </CSSTransition>

        <Form action="src/front/components/NameSelector" onSubmit={handleSubmit}>
          <label htmlFor="name">Ton pseudo &rarr;</label>
          <Input type="text" id="name" name="name"/>

          <Button type="submit"
                  disabled={disabled}>
            Enregistrer
          </Button>
        </Form>
      </article>
  );
}

const Form = styled.form`
  display: flex;
  align-items: center;
  gap: .5rem;
`;
