import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useAuth } from './Auth';
import { v4 as uuidv4 } from 'uuid';
export default function useSpace() {
  const { data, setState } = useAuth();
  const { spaceId } = useParams();

  const navigate = useNavigate();
  const navigateToSpace = (spaceId) => {
    navigate(`/space/${spaceId}`);
  };

  const create = (title, emoji) => {
    const id = 'space-' + uuidv4();
    const newSpace = {
      [id]: {
        id: id,
        title: title ? title : 'Undefined',
        emoji: emoji ? emoji : '',
        dateCreated: new Date(),
        tasks: {},
        columns: {},
        columnOrder: []
      }
    };
    const state = {
      ...data,
      spaces: {
        ...data.spaces,
        ...newSpace
      }
    };
    setState(state);
    navigateToSpace(id);
    console.log('created', state);
  };

  const update = (editedSpace) => {
    const state = {
      ...data,
      spaces: {
        ...data.spaces,
        [editedSpace.id]: {
          ...editedSpace
        }
      }
    };
    setState(state);
    console.log('state', state);
  };
  const remove = (id) => {
    const spacesClone = {};
    Object.assign(spacesClone, data.spaces);
    delete spacesClone[id];
    const state = {
      ...data,
      spaces: {
        ...spacesClone
      }
    };
    setState(state);
    console.log('remove space', id, state);
    navigate(`/space`);
  };

  return { navigateToSpace, spaceId, create, update, remove };
}
