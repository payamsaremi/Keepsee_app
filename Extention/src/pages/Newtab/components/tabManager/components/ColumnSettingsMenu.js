import React, { useState } from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import BasicModal from '../../modal/BasicModal';
function ColumnSettingsMenu({
  showSettings,
  setShowSettings,
  column,
  setState,
  data,
}) {
  const [Newtitle, setNewTitle] = useState(column.title);
  const [NewColor, setNewColor] = useState(
    column.color ? column.color : 'cyan'
  );
  const saveColumnSettings = (column) => {
    const state = {
      ...data,
      columns: {
        ...data.columns,
        [column.id]: {
          ...data.columns[column.id],
          title: Newtitle,
          color: NewColor,
        },
      },
    };
    setState(state);
    setShowSettings(false);
  };
  return (
    <>
      <BasicModal
        title={Newtitle}
        buttonTitle={'Save'}
        isOpen={showSettings}
        onOpen={() => setIsOpen(true)}
        onClose={() => setShowSettings(false)}
        onSave={() => saveColumnSettings(column)}
        // dataUnready={profile ? false : true}
        // isSaving={isSaving}
      >
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            variant="filled"
            placeholder={'give it a name'}
            value={Newtitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                saveColumnSettings(column);
              }
            }}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Color</FormLabel>
          <Input
            variant="filled"
            placeholder={'Set a color'}
            value={NewColor}
            onChange={(e) => setNewColor(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                saveColumnSettings(column);
              }
            }}
          />
        </FormControl>
      </BasicModal>
    </>
  );
}

export default ColumnSettingsMenu;
