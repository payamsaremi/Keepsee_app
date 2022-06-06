import React, { memo, useEffect, useState } from 'react';
import useBackupData from './useBackupData';
import useSetState from './useSetState';
export default function useDailyBackup(data, setState) {
  const getBackup = useBackupData();

  const now = new Date();
  const date = now.getDate();

  useEffect(() => {
    if (data) {
      if (data.backUpCount === undefined) {
        const state = {
          ...data,
          backUpCount: {
            count: 0,
            lastBackupOn: date,
          },
        };
        setState(state);
      }
      if (data.backUpCount) {
        const prevDate = data.backUpCount.lastBackupOn;
        if (date === 1) {
          // if its first of the month reset the lastBackupOn date to 0
          const state = {
            ...data,
            backUpCount: {
              ...data.backUpCount,
              lastBackupOn: 0,
            },
          };
          setState(state);
        }
        if (prevDate < date) {
          console.log('Making a back up ....');
          console.log('Made a back up!', now);
        } else {
          let currentCount = data.backUpCount.count;
          currentCount++;
          const state = {
            ...data,
            backUpCount: {
              ...data.backUpCount,
              count: currentCount,
            },
          };
          setState(state);
          getBackup;
          console.log('today is still the same day', now);
        }
      }
    }
  }, []);
  console.log('this?', data.backUpCount);
  return;
}
