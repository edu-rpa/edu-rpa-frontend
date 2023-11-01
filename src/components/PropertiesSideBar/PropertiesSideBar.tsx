import { Activity } from '@/types/activity';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
} from '@chakra-ui/react';
import React from 'react';

interface PropertiesSideBarProps {
  isOpen: boolean;
  onClose: () => void;
  activityItem: Activity;
}

export default function PropertiesSideBar({
  isOpen,
  onClose,
  activityItem,
}: PropertiesSideBarProps) {
  console.log(activityItem);
  return (
    <div>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{activityItem.activityId}</DrawerHeader>
          <DrawerBody>
            <h1 className="font-bold text-md text-red-500">
              Name: {activityItem.activityName}
            </h1>
            <h1 className="font-bold text-md text-blue-500">
              Type: {activityItem.activityType}
            </h1>
            <h1 className="font-bold text-md text-green-600">Incoming:</h1>
            <div>
              {activityItem.incoming.map((flow) => (
                <ul key={flow.flowId} className="mb-[5px]">
                  <li>Flow ID: {flow.flowId}</li>
                  <li> Name: {flow.name}</li>
                </ul>
              ))}
            </div>
            <h1 className="font-bold text-md text-orange-500">Outgoing:</h1>
            <ul>
              {activityItem.outgoing.map((flow) => (
                <ul key={flow.flowId} className="mb-[5px]">
                  <li>Flow ID: {flow.flowId}</li>
                  <li> Name: {flow.name}</li>
                </ul>
              ))}
            </ul>
            <Input placeholder="Type here..." />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
