import {
  FormControl,
  FormLabel,
  Select,
  RadioGroup,
  Stack,
  Radio,
  Input,
  Box,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { scheduleSelector } from "@/redux/selector";
import { 
  setScheduleType, 
  setDatetime, 
  setMinute, 
  setHour, 
  setDayOfMonth, 
  setMonth, 
  setDayOfWeek, 
  setYear, 
  setTimezone
} from "@/redux/slice/scheduleSlice";

export const ScheduleForm = () => {
  const schedule = useSelector(scheduleSelector);
  const dispatch = useDispatch();

  return (
    <Box p={5}>
      <FormControl>
        <FormLabel>Timezone</FormLabel>
        <Select
          value={schedule.timezone}
          onChange={(e) => dispatch(setTimezone(e.target.value))}>
          {
            Array(24).fill(0).map((_, idx) => (
              <option key={idx} value={`UTC+${idx < 10 ? '0' + idx : idx}:00`}>{`UTC+${idx < 10 ? '0' + idx : idx}:00`}</option>
            ))
          }
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Schedule Type</FormLabel>
        <RadioGroup value={schedule.type} onChange={(value) => dispatch(setScheduleType(value))}>
          <Stack direction="row">
            <Radio value="at">One-off</Radio>
            <Radio value="cron">Recurring</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>

      {schedule.type === 'at' ? (
        <FormControl mt={5}>
          <FormLabel>Date & Time</FormLabel>
          <Input
            type="datetime-local"
            value={schedule.datetime}
            onChange={(e) => dispatch(setDatetime(e.target.value))} />
        </FormControl>
      ) : (
        <Box>
          <FormControl mt={5}>
            <FormLabel>Minute</FormLabel>
            <Input
              type="text"
              placeholder="Minute"
              value={schedule.minute}
              onChange={(e) => dispatch(setMinute(e.target.value))}
            />
          </FormControl>

          <FormControl mt={5}>
            <FormLabel>Hour</FormLabel>
            <Input
              type="text"
              placeholder="Hour"
              value={schedule.hour}
              onChange={(e) => dispatch(setHour(e.target.value))}
            />
          </FormControl>

          <FormControl mt={5}>
            <FormLabel>Day of Month</FormLabel>
            <Input
              type="text"
              placeholder="Day of Month"
              value={schedule.dayOfMonth}
              onChange={(e) => dispatch(setDayOfMonth(e.target.value))}
            />
          </FormControl>

          <FormControl mt={5}>
            <FormLabel>Month</FormLabel>
            <Input
              type="text"
              placeholder="Month"
              value={schedule.month}
              onChange={(e) => dispatch(setMonth(e.target.value))}
            />
          </FormControl>

          <FormControl mt={5}>
            <FormLabel>Day of Week</FormLabel>
            <Input
              type="text"
              placeholder="Day of Week"
              value={schedule.dayOfWeek}
              onChange={(e) => dispatch(setDayOfWeek(e.target.value))}
            />
          </FormControl>

          <FormControl mt={5}>
            <FormLabel>Year</FormLabel>
            <Input
              type="text"
              placeholder="Year"
              value={schedule.year}
              onChange={(e) => dispatch(setYear(e.target.value))}
            />
          </FormControl>
        </Box>
      )}
    </Box>
  );
}