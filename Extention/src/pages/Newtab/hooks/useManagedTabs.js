// import { useState, useEffect } from 'react';

// const fetchTabs = (data) => {
//   const managedTabs = data.managedTabs;
//   let tabsList = chrome.runtime.sendMessage({ message: 'tabsList' });
//   console.log('tabsList', tabsList);
//   tabsList.then((res) => {
//     if (res) {
//       if (managedTabs) {
//         console.log('managedTabs', managedTabs);
//         const unmanagedTabs = [];
//         res.forEach((item) => {
//           const managed = managedTabs.some((el) => el === '' + item.id);
//           if (!managed) unmanagedTabs.push(item);
//         });
//         return unmanagedTabs;
//       } else {
//         return res;
//       }
//     }
//   });
// };

// export default function useManagedTabs(data, setState) {
//   const [allTabs, setAllTabs] = useState([]);
//   const [tabsList,setTabsList] = useState()
//   useEffect(() => {
//     const allTabs = fetchTabs(data, setState);
//     setAllTabs(allTabs);
//   }, []);
//   console.log('allTabs', allTabs);
//   return allTabs;
// }
