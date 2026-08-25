import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import type { CharacterId } from '../../lib/collab/types';

type Props = {
  visitorName: string;
  initialCharacter?: CharacterId | null;
  onContinue: (character: CharacterId) => void;
};

const characters: Array<{ id: CharacterId; label: string; image: string }> = [
  { id: 'male_01', label: 'Male', image: '/img/world/character-male.png' },
  { id: 'female_01', label: 'Female', image: '/img/world/character-female.png' },
];

export function CharacterSelect({ visitorName, initialCharacter = null, onContinue }: Props) {
  const [selected, setSelected] = useState<CharacterId | null>(initialCharacter);

  return (
    <div className="character-select-overlay" role="dialog" aria-modal="true" aria-labelledby="character-select-title">
      <div className="character-select-panel">
        <header>
          <p>WELCOME, {visitorName.toUpperCase()}</p>
          <h1 id="character-select-title">Choose how you appear in the world.</h1>
          <span>Your generated visitor name stays the same.</span>
        </header>

        <div className="character-options">
          {characters.map((character) => (
            <button
              type="button"
              key={character.id}
              className={selected === character.id ? 'is-selected' : ''}
              onClick={() => setSelected(character.id)}
              aria-pressed={selected === character.id}
            >
              <img src={character.image} alt={`${character.label} character preview`} />
              <span>{character.label}</span>
              <small>{character.id}</small>
            </button>
          ))}
        </div>

        <button type="button" className="character-continue" disabled={!selected} onClick={() => selected && onContinue(selected)}>
          Enter world <ArrowRight />
        </button>
      </div>
    </div>
  );
}
