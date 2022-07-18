import React, { useState } from 'react';
import { BiAddToQueue, BiPlus } from 'react-icons/bi';
import BasicIconButton from '../../utils/BasicIconButton';
import { MdOutlineAddCircleOutline } from 'react-icons/md';

function CreateTabsColumn({ setState, data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [title, setTitle] = useState('');
  const [Color, setColor] = useState('cyan');

  const createNewColumn = () => {
    const id = 'column-' + Math.floor(Math.random() * 10000); //TODO:make  this better
    const newColumn = {
      id: id,
      title: title ? title : '',
      color: Color,
      taskIds: Array()
    };
    return newColumn;
  };

  const create = () => {
    const newColumn = createNewColumn();

    const col = {
      ...newColumn
    };

    const newColumnOrder = [...data.columnOrder];
    newColumnOrder.unshift(newColumn.id);

    const state = {
      ...data,
      columns: {
        ...data.columns,
        [newColumn.id]: col
      },
      columnOrder: newColumnOrder
    };

    setState(state);
    setIsOpen(!isOpen);
    return;
  };
  return (
    <>
      <BasicIconButton
        onClick={() => {
          create();
        }}
        icon={<BiAddToQueue size={'20'} />}
        // icon={<MdOutlineAddCircleOutline size={'20'} />}
      />
    </>
  );
}
export default CreateTabsColumn;
