import { ActivityPackageTemplates } from '@/constants/activityPackage';
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
  InputGroup,
  FormControl,
  FormLabel,
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
  const [activityPackage, setActivityPackage] = React.useState({
    currentStep: 1,
    packageName: '',
    serviceName: '',
    currentActivityName: '',
  });

  const getTitleStep = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return 'Select Activity Package';
      case 2:
        return activityPackage.packageName;
      case 3:
        return activityPackage.serviceName;
      case 4:
        return activityPackage.currentActivityName;
    }
  };

  const handleSelectPackage = (packageName: string) => {
    setActivityPackage((prevState) => ({
      ...prevState,
      currentStep: 2,
      packageName: packageName,
    }));
  };

  const handleSelectActivity = (activityName: string) => {
    setActivityPackage((prevState) => ({
      ...prevState,
      currentStep: 4,
      currentActivityName: activityName,
    }));
  };

  const getDistinctService = (data: any) => {
    const services = data
      .map((template: any) => template.service)
      .filter(
        (value: any, index: any, self: any) => self.indexOf(value) === index
      );
    return services;
  };

  const getActivityByService = (data: any, service: string) => {
    const activityLists = data.filter((item: any) => item.service === service);
    return activityLists;
  };

  const getArgumentsByActivity = (data: any, activityName: string) => {
    const activityArgs = data.filter(
      (item: any) => item.displayName === activityName
    );
    return activityArgs;
  };

  return (
    <div>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            {getTitleStep(activityPackage.currentStep)}
          </DrawerHeader>
          <DrawerBody>
            <h1 className="font-bold text-md text-red-500">
              ActivityID: {activityItem.activityId}
            </h1>
            <h1 className="font-bold text-md text-orange-500">
              Name: {activityItem.activityName}
            </h1>
            {ActivityPackageTemplates.map((item, index) => {
              return (
                <div key={index}>
                  {activityPackage.currentStep == 1 && (
                    <Button
                      className="my-[10px]"
                      colorScheme={item.color}
                      onClick={() => handleSelectPackage(item.displayName)}>
                      {item.displayName}
                    </Button>
                  )}
                  {activityPackage.currentStep == 2 &&
                    activityPackage.packageName == item.displayName &&
                    getDistinctService(item.activityTemplates).map(
                      (service: any) => (
                        <div>
                          <Button
                            className="my-[10px]"
                            onClick={() => {
                              setActivityPackage((prevState) => ({
                                ...prevState,
                                currentStep: 3,
                                serviceName: service,
                              }));
                            }}>
                            {service}
                          </Button>
                        </div>
                      )
                    )}
                  {activityPackage.currentStep == 3 &&
                    activityPackage.packageName == item.displayName &&
                    getActivityByService(
                      item.activityTemplates,
                      activityPackage.serviceName
                    ).map((activity: any) => (
                      <div>
                        <Button
                          className="my-[10px]"
                          onClick={() =>
                            handleSelectActivity(activity.displayName)
                          }>
                          {activity.displayName}
                        </Button>
                      </div>
                    ))}
                  {activityPackage.currentStep == 4 &&
                    activityPackage.packageName == item.displayName &&
                    Object.keys(
                      getArgumentsByActivity(
                        item.activityTemplates,
                        activityPackage.currentActivityName
                      )
                    ).map((key: any) => {
                      const argumentParams = getArgumentsByActivity(
                        item.activityTemplates,
                        activityPackage.currentActivityName
                      )[key].arguments;
                      return (
                        <div>
                          {Object.entries(argumentParams).map(
                            ([key, value], index) => (
                              <div key={index}>
                                <FormControl>
                                  <FormLabel>{key}</FormLabel>
                                  <Input type="text" />
                                </FormControl>
                              </div>
                            )
                          )}
                        </div>
                      );
                    })}
                </div>
              );
            })}
            <Button
              className="mt-[20px]"
              onClick={() => {
                setActivityPackage((prevState) => ({
                  ...prevState,
                  currentStep:
                    prevState.currentStep > 2 ? prevState.currentStep - 1 : 1,
                }));
              }}>
              Back
            </Button>
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
