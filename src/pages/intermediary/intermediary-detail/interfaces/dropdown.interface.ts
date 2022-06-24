export type DropdownType = {
  id: string;
  option: string;
  value: number;
};

export interface DropdownFormInterface {
  state: DropdownType[];
  handleDropdown: (state: DropdownType) => void;
  handleDropdownState: (state: DropdownType[]) => void;
}
