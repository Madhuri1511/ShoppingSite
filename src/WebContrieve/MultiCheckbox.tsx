import React, { useState } from "react";

type Option = {
  id: number;
  label: string;
  children?: Option[];
};

const MultiCheckbox: React.FC = () => {
  const options: Option[] = [
    {
      id: 1,
      label: "Parent 1",
      children: [
        { id: 11, label: "Child 1.1" },
        { id: 12, label: "Child 1.2" },
      ],
    },
    {
      id: 2,
      label: "Parent 2",
      children: [
        { id: 21, label: "Child 2.1" },
        { id: 22, label: "Child 2.2" },
      ],
    },
  ];

  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  // Check if an option is selected
  const isSelected = (id: number) => selectedOptions.includes(id);

  // Toggle parent and its children
  const toggleParent = (parentId: number, children: Option[] = []) => {
    const allSelected = isSelected(parentId);
    const childIds = children.map((child) => child.id);

    setSelectedOptions((prevSelected) =>
      allSelected
        ? prevSelected.filter((id) => id !== parentId && !childIds.includes(id))
        : [...prevSelected, parentId, ...childIds]
    );
  };

  // Toggle a single child
  const toggleChild = (childId: number, parentId: number, parentChildren: Option[]) => {
    setSelectedOptions((prevSelected) => {
      const childSelected = isSelected(childId);

      // Add or remove the child
      const updatedSelection = childSelected
        ? prevSelected.filter((id) => id !== childId)
        : [...prevSelected, childId];

      // If any child is selected, the parent should be selected
      const parentShouldBeSelected =
        !childSelected || parentChildren.some((child) => updatedSelection.includes(child.id));

      return parentShouldBeSelected
        ? [...updatedSelection, parentId]
        : updatedSelection.filter((id) => id !== parentId);
    });
  };

  return (
    <div>
      <h3>Multi-Checkbox with Parent-Child</h3>
      <form>
        {options.map((option) => (
          <div key={option.id}>
            <label>
              <input
                type="checkbox"
                checked={isSelected(option.id)}
                onChange={() => toggleParent(option.id, option.children || [])}
              />
              {option.label}
            </label>
            <div style={{ marginLeft: "20px" }}>
              {option.children?.map((child) => (
                <div key={child.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={isSelected(child.id)}
                      onChange={() =>
                        toggleChild(child.id, option.id, option.children || [])
                      }
                    />
                    {child.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </form>
      <div>
        <h4>Selected Options:</h4>
        <p>{selectedOptions.length > 0 ? selectedOptions.join(", ") : "None"}</p>
      </div>
    </div>
  );
};

export default MultiCheckbox;
