const initialData = {
  tasks: {
    'task-1': { id: 'task-1', title: 'take shit out of here' },
    'task-2': { id: 'task-2', title: 'Go for a run' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Unmanaged Tabs',
      color: 'green',
      taskIds: ['task-1', 'task-2'],
    },
  },
  //Facilitate reorderinhg od the columns
  columnOrder: ['column-1'],
};

export default initialData;
