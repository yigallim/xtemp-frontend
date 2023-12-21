import { Modal } from "antd";
import SelectSeatInput from "./SelectSeatInput";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import NotificationContext from "../context/NotificationContext";

type ChangeSeatProps = {
  isOpen: boolean;
  onOk: (targetSeat: string) => void;
  onCancel: () => void;
};

export default function ChangeSeat({ isOpen, onOk, onCancel }: ChangeSeatProps) {
  const { seatId } = useParams();
  const [selectedSeat, setSelectedSeat] = useState<string>(seatId?.split("order-")[1]!);
  const api = useContext(NotificationContext);

  return (
    <Modal
      title="Change Seat"
      open={isOpen}
      onOk={() => {
        if (seatId?.split("order-")[1]! == selectedSeat)
          api!.warning({
            message: "No Change Detected",
            description: "You've selected your current seat. Please choose a different table.",
            duration: 3,
            placement: "top",
          });
        else {
          onOk(selectedSeat);
          api!.success({
            message: "Seat Changed Successfully",
            description: `You have moved to table ${selectedSeat}. Enjoy your meal!`,
            duration: 2.5,
            placement: "top",
          });
        }
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
