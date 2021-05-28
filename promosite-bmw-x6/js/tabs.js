const tabs = (
  tabHandler = '[data-tabs-handler]',
  tabField = '[data-tabs-field]',
  tabActive = 'design-list__item_active',
  tabHidden = 'hidden',
) => {
  const tabsHandlerElems = document.querySelectorAll(tabHandler);
  const tabsFieldElems = document.querySelectorAll(tabField);

  for (const tab of tabsHandlerElems) {
    tab.addEventListener('click', () => {

      tabsHandlerElems.forEach((item) => {
        if (tab === item) {
          item.classList.add(tabActive);
        } else {
          item.classList.remove(tabActive);
        }
      });

      tabsFieldElems.forEach((item) => {
        if (item.dataset.tabsField === tab.dataset.tabsHandler) {
          item.classList.remove(tabHidden);
        } else {
          item.classList.add(tabHidden);
        }
      });

    });
  }
};

export default tabs;