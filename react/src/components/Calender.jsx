import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

export default function SingleInputDateRangePicker({ handleDateChange }) {
    const handleRangeChange = (range) => {
      handleDateChange(range);
    };
  
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['SingleInputDateRangeField']}>
          <DateRangePicker
            slots={{ field: SingleInputDateRangeField }}
            onChange={handleRangeChange}
          />
        </DemoContainer>
      </LocalizationProvider>
    );
};