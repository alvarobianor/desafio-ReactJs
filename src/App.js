import React, { useState, useEffect } from 'react';
import api from './services/api';

import './styles.css';

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/repositories').then((e) => {
      setProjects([...e.data]);
    });
  }, []);

  async function handleAddRepository() {
    // TODO
    api
      .post('/repositories', {
        id: `${(Math.random() * 9999).toFixed(0)}`,
        url: 'https://github.com/alvarobianor',
        title: `Desafio ReactJs ${(Math.random() * 9999).toFixed(0)}`,
        techs: ['NodeJs', 'ReactJs', 'React Native'],
      })
      .then((e) => {
        const { id, url, title, techs } = e.data;
        setProjects([...projects, { id, url, title, techs }]);
      });
  }

  async function handleRemoveRepository(id) {
    // TODO
    const newProjects = projects.filter((e) => e.id !== id);
    api.delete(`/repositories/${id}`).then((e) => {
      setProjects([...newProjects]);
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map(({ id, title }) => {
          return (
            <li key={id}>
              {`${title}`}
              <button onClick={() => handleRemoveRepository(id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
