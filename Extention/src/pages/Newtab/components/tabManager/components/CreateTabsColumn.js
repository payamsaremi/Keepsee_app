import React, { useState } from 'react';
import { BiAddToQueue, BiPlus } from 'react-icons/bi';
import BasicIconButton from '../../utils/BasicIconButton';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import useColumn from '../../../hooks/useColumn';
function CreateTabsColumn({ setState, data }) {
  const { create } = useColumn(setState, data);
  return (
    <>
      <BasicIconButton
        onClick={() => {
          create();
        }}
        icon={<BiAddToQueue size={'20'} />}
      />
    </>
  );
}
export default CreateTabsColumn;
