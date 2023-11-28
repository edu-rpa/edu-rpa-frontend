import React from 'react';
import { CUIAutoComplete } from 'chakra-ui-autocomplete';

export interface Item {
  label: string;
  value: string;
}

const BadgeAutoComplete = () => {
  const [selectedItems, setSelectedItems] = React.useState<Item[]>([]);

  const handleCreateItem = (item: Item) => {
    setSelectedItems((curr) => [...curr, item]);
  };

  const handleSelectedItemsChange = (items: Item[]) => {
    if (selectedItems) setSelectedItems(items);
  };

  console.log(selectedItems.map((item) => item.value));

  return (
    // @ts-ignore
    <CUIAutoComplete
      placeholder="Type email"
      onCreateItem={handleCreateItem}
      hideToggleButton={true}
      items={selectedItems}
      selectedItems={selectedItems}
      onSelectedItemsChange={(changes) => {
        handleSelectedItemsChange(changes.selectedItems as Item[]);
      }}
    />
  );
};
export default BadgeAutoComplete;
