const filterList = (selections, items) => {
  const clonedItems = items.filter(i => !i.created);
  let newItems = [];
  if (selections.sortBy === 'Relevance') {
    newItems = clonedItems.sort(function(a, b) {
      return b.score - a.score;
    });
  } else if (selections.sortBy === 'Sources') {
    newItems = clonedItems.sort(function(a, b) {
      return a.source_id - b.source_id;
    });
  } else if (selections.sortBy === 'Newest') {
    newItems = clonedItems.sort(function(a, b) {
      return +new Date(b.pub_time) - +new Date(a.pub_time);
    });
  } else if (selections.sortBy === 'Oldest') {
    newItems = clonedItems.sort(function(a, b) {
      return +new Date(a.pub_time) - +new Date(b.pub_time);
    });
  }

  newItems = newItems
    .filter(
      item =>
        selections.filterBy.length <= 0 ||
        selections.filterBy.includes('All') ||
        (selections.filterBy.includes('Selected') && item.selected)
    )
    .filter(
      item =>
        selections.filterSource.length <= 0 ||
        selections.filterSource.includes('All') ||
        (selections.filterSource.includes('Xinhua') &&
          item.source === 'xinhuanet.com') ||
        (selections.filterSource.includes('Worldbank') &&
          item.source === 'wold_bank_news') ||
        (selections.filterSource.includes('RRP') && item.source === 'rrp') ||
        (selections.filterSource.includes('SSA') && item.source === 'ssa') ||
        (selections.filterSource.includes('CP') && item.source === 'cp') ||
        (selections.filterSource.includes('CPS') && item.source === 'cps') ||
        (selections.filterSource.includes('COBP') && item.source === 'cobp')
    )
    .filter(
      item =>
        selections.filterCountry.length <= 0 ||
        selections.filterCountry.includes('All') ||
        (selections.filterCountry.includes('China, PR') &&
          item.country &&
          item.country.toLowerCase().includes('china')) ||
        (selections.filterCountry.includes('Mongolia') &&
          item.country &&
          item.country.toLowerCase().includes('mongolia'))
    );

  return newItems;
};

export default filterList;
