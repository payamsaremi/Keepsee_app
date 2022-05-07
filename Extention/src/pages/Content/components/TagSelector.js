import { MultiSelect } from '@mantine/core';
import React, { useState }  from 'react';

function TagSelector() {
  const [Tags, setTags] = useState(['Keepsee','Note'])
  console.log(Tags)
  return (
    <MultiSelect
      label="Tag your snippet"
      data={Tags}
      placeholder="Add Some Tags"
      radius="lg"
      searchable
      creatable
      clearable
      getCreateLabel={(query) => `+ Add #${query}`}
      onCreate={(query) => setTags((current) => [...current, query])}
    />
  );
}

export default TagSelector