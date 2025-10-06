export const useTabs = (initalTab, allTabs) => {
  if (!allTabs || !Array.isArray(allTabs)) {
    return;
  }
  const [currentIdx, setCurrentIdx] = useState(initalTab);

  return {
    currentItem: allTabs[currentIdx],
    changeItem: setCurrentIdx,
  };
};
