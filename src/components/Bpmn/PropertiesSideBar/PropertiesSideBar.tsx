import { ActivityPackageTemplates } from '@/constants/activityPackage';
import { Activity } from '@/types/activity';
import {
  getLocalStorageObject,
  setLocalStorageObject,
} from '@/utils/localStorageService';
import {
  getActivityInProcess,
  getProcessFromLocalStorage,
  updateActivityInProcess,
  updateLocalStorage,
} from '@/utils/processService';
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
  SET_DEFAULT = 'SET_DEFAULT',
  SET_PROPERTY = 'SET_PROPERTY',
  SET_PACKAGE = 'SET_PACKAGE',
  SET_SERVICE = 'SET_SERVICE',
  SET_ACTIVITY = 'SET_ACTIVITY',
  SET_BACK = 'SET_BACK',
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
      return { ...state, currentStep: 3, serviceName: action.payload };
    case SideBarAction.SET_ACTIVITY:
      return { ...state, currentStep: 4, activityName: action.payload };
    case SideBarAction.SET_BACK:
      return {
        ...state,
        currentStep: Math.max(1, state.currentStep - 1),
      };
    case SideBarAction.SET_DEFAULT:
      return {
        ...state,
        currentStep: 1,
      };
    case SideBarAction.SET_PROPERTY:
      return {
        ...state,
        currentStep: 4,
        packageName: action.payload?.activityPackage,
        serviceName: action.payload?.serviceName,
        activityName: action.payload?.activityName,
      };

    default:
      return state;
  }
};

export default function PropertiesSideBar({
  isOpen,
  onClose,
  activityItem,
}: PropertiesSideBarProps) {
  const params = useParams();
  const processID = params.id as string;
  const [formValues, setFormValues] = React.useState<FormValues>({});
  const [sideBarState, dispatch] = useReducer(sidebarReducer, initialState);

  useEffect(() => {
    const getActivityByID = getActivityInProcess(
      processID,
      activityItem.activityID
    );
    if (!getActivityByID) return;
    const isEmptyProperty = Object.keys(getActivityByID.properties).length;
    if (isEmptyProperty == 0) {
      handleSetDefault();
      setFormValues({});
    } else {
      handleSetPropertyFromLocalStorage(getActivityByID.properties);
      setFormValues(getActivityByID.properties.arguments);
    }
  }, [isOpen]);

  const handleSelectPackage = (packageName: string) => {
    dispatch({ type: SideBarAction.SET_PACKAGE, payload: packageName });
  };

  const handleSelectService = (serviceName: string) => {
    dispatch({ type: SideBarAction.SET_SERVICE, payload: serviceName });
  };

  const handleSelectActivity = (activityName: string) => {
    dispatch({ type: SideBarAction.SET_ACTIVITY, payload: activityName });
  };

  const handleGoBack = () => {
    dispatch({ type: SideBarAction.SET_BACK });
    setFormValues({});
  };

  const handleSetDefault = () => {
    dispatch({ type: SideBarAction.SET_DEFAULT });
  };

  const handleSetPropertyFromLocalStorage = (activityInfo: Activity) => {
    dispatch({ type: SideBarAction.SET_PROPERTY, payload: activityInfo });
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

  const handleUpdateProperties = () => {
    const payload = {
      activityPackage: sideBarState.packageName,
      serviceName: sideBarState.serviceName,
      activityName: sideBarState.activityName,
      arguments: formValues,
    };
    const updatePayload = {
      ...getActivityInProcess(processID, activityItem.activityID),
      properties: payload,
    };
    const updateProperties = updateActivityInProcess(processID, updatePayload);
    const updateProcess = updateLocalStorage({
      ...getProcessFromLocalStorage(processID),
      activities: updateProperties,
    });
    setLocalStorageObject('processList', updateProcess);
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
            {ActivityPackageTemplates.map((item) => {
              const { _id, displayName, activityTemplates, color } = item;
              const { currentStep, packageName, serviceName, activityName } =
                sideBarState;

              const renderStepOne = () => (
                <Button
                  className="my-[10px]"
                  colorScheme={color}
                  onClick={() => handleSelectPackage(displayName)}>
                  {displayName}
                </Button>
              );

              const renderStepTwo = () => {
                const services = getDistinctService(activityTemplates);
                return (
                  packageName === displayName &&
                  services.map((service: string) => (
                    <div key={service}>
                      <Button
                        className="my-[10px]"
                        onClick={() => handleSelectService(service)}>
                        {service}
                      </Button>
                    </div>
                  ))
                );
              };

              const renderStepThree = () => {
                const activities = getActivityByService(
                  activityTemplates,
                  serviceName
                );
                return activities.map((activity: any) => (
                  <div key={activity.displayName}>
                    <Button
                      className="my-[10px]"
                      onClick={() =>
                        handleSelectActivity(activity.displayName)
                      }>
                      {activity.displayName}
                    </Button>
                  </div>
                ));
              };

              const renderStepFour = () => {
                const activityInfo = getArgumentsByActivity(
                  activityTemplates,
                  activityName
                );
                const activityProperty = activityInfo?.[0]?.arguments;
                return (
                  <div>
                    {activityProperty &&
                      Object.entries(activityProperty).map(
                        ([paramKey, paramValue]) => (
                          <div key={paramKey}>
                            <FormControl>
                              <FormLabel>{paramKey}</FormLabel>
                              <Input
                                type="text"
                                value={(formValues[paramKey] as string) ?? ''}
                                onChange={(e) =>
                                  handleInputChange(paramKey, e.target.value)
                                }
                              />
                            </FormControl>
                          </div>
                        )
                      )}
                  </div>
                );
              };

              return (
                <div key={_id}>
                  {currentStep === 1 && renderStepOne()}
                  {currentStep === 2 && renderStepTwo()}
                  {currentStep === 3 && renderStepThree()}
                  {currentStep === 4 && renderStepFour()}
                </div>
              );
            })}
            <Button
              className="mt-[20px]"
              colorScheme="yellow"
              onClick={handleGoBack}>
              Back
            </Button>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleUpdateProperties}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
