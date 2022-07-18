import React, { useEffect, useState } from 'react';
import useBackupData from './useBackupData';

const prepairForBackUp = (data, setState, user, getBackup) => {
  const now = new Date();
  const date = now.getDate();
  if (data) {
    if (data.backUpCount === undefined) {
      const state = {
        ...data,
        backUpCount: {
          count: 0,
          lastBackupOn: date
        }
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
            lastBackupOn: 0
          }
        };
        setState(state);
      }
      if (prevDate < date) {
        console.log('Making a back up ....');
        let currentCount = data.backUpCount.count;
        currentCount++;
        const state = {
          ...data,
          backUpCount: {
            ...data.backUpCount,
            lastBackupOn: date,
            count: currentCount
          }
        };
        console.log('Made a back up!', now);
        setState(state);
        getBackup();
        return state;
      } else {
        // console.log('today is still the same day', now);
      }
    }
  }
};

export default function useDailyBackup(data, setState, user) {
  const getBackup = useBackupData(user, data);

  return () => {
    return prepairForBackUp(data, setState, user, getBackup);
  };
}
