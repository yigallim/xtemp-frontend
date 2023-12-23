import React, { memo } from "react";
import CustomizeSection from "./CustomizeSection";
import TextArea from "antd/es/input/TextArea";

type RemarksSectionProps = {
  handleRemarksChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export default memo(function RemarksSection({ handleRemarksChange }: RemarksSectionProps) {
  return (
    <CustomizeSection title="Remarks">
      <TextArea
        showCount
        allowClear
        placeholder="Write something here..."
        bordered={false}
        autoSize={{ minRows: 3, maxRows: 5 }}
        maxLength={100}
        style={{ marginBottom: "18px" }}
        onChange={handleRemarksChange}
      />
    </CustomizeSection>
  );
});
