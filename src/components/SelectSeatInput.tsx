import { useMemo } from "react";
import { Select } from "antd";
import { getRetailSeats } from "../services/companyData";

type SelectSeatInput = {
  onChange: (value: string) => void;
  value: string;
};

export default function SelectSeatInput({ value, onChange }: SelectSeatInput) {
  const seats = useMemo(() => getRetailSeats().map((seat) => ({ value: seat, label: seat })), []);

  return (
    <Select
      showSearch
      style={{ width: "100%" }}
      placeholder="Search to Select"
      optionFilterProp="children"
      options={seats}
      value={value}
      onChange={onChange}
    />
  );
}
