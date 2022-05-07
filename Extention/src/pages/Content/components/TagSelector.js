import { MultiSelect } from '@mantine/core';
import React, { useState }  from 'react';

function TagSelector({Tags, setTags}) {
  console.log(Tags)
  return (
    <MultiSelect
      label="Add Some Related Tags"
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