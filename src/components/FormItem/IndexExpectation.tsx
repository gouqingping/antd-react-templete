import { InputNumber, Space } from 'antd';
import React, { forwardRef } from 'react';

const IndexExpectation = (
  {
    onChange,
    value: propsValue = {
      precis: 0,
      recall: 0,
      fmeasure: 0,
    },
  }: any,
  ref: any,
) => {
  // const reg = /[\d.]+(?=%)/g
  return (
    <div ref={ref}>
      <Space>
        <InputNumber
          defaultValue={100}
          min={0}
          max={100}
          keyboard
          style={{ width: 170 }}
          addonBefore="准确率: "
          addonAfter="%"
          // formatter={value => `${value}%}
          // parser={value => value.match(reg)[0]}
          onChange={(e) => {
            const p = e / 100;
            const r = propsValue.recall / 100;
            let fmeasure: number | string = ((2 * p * r) / (p + r)).toFixed(3);
            if (r === 0 || p === 0) fmeasure = 0;
            onChange({
              ...propsValue,
              precis: e,
              fmeasure,
            });
          }}
          value={propsValue.precis}
        />
        <InputNumber
          defaultValue={100}
          min={0}
          max={100}
          keyboard
          addonBefore="召回率: "
          addonAfter="%"
          style={{ width: 170 }}
          // step={'0.1'}
          // formatter={value => `召回率: ${value}%`}
          // parser={value => value.match(reg)[0]}
          onChange={(e) => {
            const r = e / 100;
            const p = propsValue.precis / 100;
            let fmeasure: number | string = ((2 * p * r) / (p + r)).toFixed(3);
            if (r === 0 || p === 0) fmeasure = 0;

            onChange({
              ...propsValue,
              recall: e,
              fmeasure,
            });
          }}
          value={propsValue.recall}
        />
        <InputNumber
          defaultValue={'1'}
          min={'0'}
          max={'1'}
          stringMode
          keyboard
          addonBefore="F1: "
          precision={3}
          disabled
          // addonAfter="%"
          style={{ width: 120 }}
          // formatter={value => `F1: ${value}%`}
          // parser={value => { // 如果有需要显示0 就解禁
          //   if (value === undefined) {
          //     return
          //   }
          //   return limitDecimalPoint(value)
          // }}
          onChange={(e) =>
            onChange({
              ...propsValue,
              fmeasure: e,
            })
          }
          value={propsValue.fmeasure}
        />
      </Space>
    </div>
  );
};

export default forwardRef(IndexExpectation);
