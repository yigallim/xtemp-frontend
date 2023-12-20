import { Modal } from "antd";
import SelectSeatInput from "./SelectSeatInput";
import { useState } from "react";
import { useParams } from "react-router-dom";

type ChangeSeatProps = {
  isOpen: boolean;
  onOk: (targetSeat: string) => void;
  onCancel: () => void;
};

export default function ChangeSeat({ isOpen, onOk, onCancel }: ChangeSeatProps) {
  const { seatId } = useParams();
  const [selectedSeat, setSelectedSeat] = useState<string>(seatId?.split("order-")[1]!);

  return (
    <Modal
      title="Change Seat"
      open={isOpen}
      onOk={() => {
        onOk(selectedSeat);
      }}
      onCancel={onCancel}
      styles={{
        header: {
          borderLeft: "5px solid var(--primary-color)",
          borderRadius: 0,
          paddingInlineStart: 5,
          paddingBottom: 4,
          marginBottom: 24,
          borderBottom: "1px solid var(--primary-color)",
        },
        footer: {
          marginTop: 24,
        },
      }}
    >
      <p style={{ paddingBottom: 14 }}>Please select a table number to change seat.</p>
      <SelectSeatInput value={selectedSeat} onChange={(value) => setSelectedSeat(value)} />
    </Modal>
  );
}
