import { ActivityPackageTemplates } from '@/constants/activityPackage';
import { Activity } from '@/types/activity';
import { getProcessFromLocalStorage } from '@/utils/processService';
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
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useEffect, useReducer, useState } from 'react';

interface PropertiesSideBarProps {
  isOpen: boolean;
  onClose: () => void;
  activityItem: Activity;
}

interface FormValues {
  [key: string]: string;
}
interface PropertiesProps {
  currentStep: number;
  packageName: string;
  serviceName: string;
  activityName: string;
}
enum SideBarAction {
  SET_PACKAGE = 'SET_PACKAGE',
  SET_SERVICE = 'SET_SERVICE',
  SET_ACTIVITY = 'SET_ACTIVITY',
}

const initialState: PropertiesProps = {
  currentStep: 1,
  packageName: '',
  serviceName: '',
  activityName: '',
};

const sidebarReducer = (state: any, action: any) => {
  switch (action.type) {
    case SideBarAction.SET_PACKAGE:
      return { ...state, currentStep: 2, packageName: action.payload };
    case SideBarAction.SET_SERVICE:
      return { ...state, currentStep: 3, packageName: action.payload };
    case SideBarAction.SET_ACTIVITY:
      return { ...state, currentStep: 4, activityName: action.payload };
    default:
      return state;
  }
};

export default function PropertiesSideBar({
  isOpen,
  onClose,
  activityItem,
}: PropertiesSideBarProps) {
  const router = useRouter();
  const params = useParams();
  const processID = params.id as string;
  const processStorage = getProcessFromLocalStorage(processID);
  console.log(processStorage);
  const [formValues, setFormValues] = React.useState<FormValues>({});
  const [sideBarState, dispatch] = useReducer(sidebarReducer, initialState);

  const handleSelectPackage = (packageName: string) => {
    dispatch({ type: SideBarAction.SET_PACKAGE, payload: packageName });
  };

  const handleSelectService = (serviceName: string) => {
    dispatch({ type: SideBarAction.SET_SERVICE, payload: serviceName });
  };

  const handleSelectActivity = (activityName: string) => {
    dispatch({ type: SideBarAction.SET_ACTIVITY, payload: activityName });
  };

  const getTitleStep = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return 'Select Activity Package';
      case 2:
        return sideBarState.packageName;
      case 3:
        return sideBarState.serviceName;
      case 4:
        return sideBarState.activityName;
      default:
        return 'Will be update soon';
    }
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

  const handleInputChange = (key: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{getTitleStep(sideBarState.currentStep)}</DrawerHeader>
          <DrawerBody>
            <h1 className="font-bold text-md text-red-500">
              ActivityID: {activityItem.activityID}
            </h1>
            <h1 className="font-bold text-md text-orange-500">
              Name: {activityItem.activityName}
            </h1>
            {/* {ActivityPackageTemplates.map((item: any) => {
              return (
                <div key={item._id}>
                  {sideBarState.currentStep == 1 && (
                    <Button
                      className="my-[10px]"
                      colorScheme={item.color}
                      onClick={() => handleSelectPackage(item.displayName)}>
                      {item.displayName}
                    </Button>
                  )}
                  {sideBarState.currentStep == 2 &&
                    sideBarState.packageName == item.displayName &&
                    getDistinctService(item.activityTemplates).map(
                      (service: string) => (
                        <div key={service}>
                          <Button
                            className="my-[10px]"
                            onClick={() => handleSelectService(service)}>
                            {service}
                          </Button>
                        </div>
                      )
                    )}
                  {sideBarState.currentStep == 3 &&
                    sideBarState.packageName == item.displayName &&
                    getActivityByService(
                      item.activityTemplates,
                      sideBarState.serviceName
                    ).map((activity: any) => (
                      <div key={activity.displayName}>
                        <Button
                          className="my-[10px]"
                          onClick={() =>
                            handleSelectActivity(activity.displayName)
                          }>
                          {activity.displayName}
                        </Button>
                      </div>
                    ))}
                  {sideBarState.currentStep == 4 &&
                    sideBarState.packageName == item.displayName &&
                    Object.keys(
                      getArgumentsByActivity(
                        item.activityTemplates,
                        sideBarState.activityName
                      )
                    ).map((key: any) => {
                      const argumentParams = getArgumentsByActivity(
                        item.activityTemplates,
                        currentStorage.activities[activityItem.activityID]
                          .activityName || sideBarState.activityName
                      )[key].arguments;
                      return (
                        <div key={sideBarState.activityName}>
                          {Object.entries(argumentParams).map(
                            ([key, value]) => (
                              <div key={key}>
                                <FormControl>
                                  <FormLabel>{key}</FormLabel>
                                  <Input
                                    type="text"
                                    value={
                                      formValues[key] ||
                                      currentStorage.activities[
                                        activityItem.activityID
                                      ][key]
                                    }
                                    onChange={(e) =>
                                      handleInputChange(key, e.target.value)
                                    }
                                  />
                                </FormControl>
                              </div>
                            )
                          )}
                        </div>
                      );
                    })}
                </div>
              );
            })} */}
            <Button className="mt-[20px]">Back</Button>
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
