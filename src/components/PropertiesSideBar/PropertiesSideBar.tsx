import { ActivityPackageTemplates } from '@/constants/activityPackage';
import { bpmnSelector } from '@/redux/selector';
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

interface FormValues {
  [key: string]: string;
}

export default function PropertiesSideBar({
  isOpen,
  onClose,
  activityItem,
}: PropertiesSideBarProps) {
  const currLocalStorage = JSON.parse(
    localStorage.getItem('currProcess') as string
  );
  const [formValues, setFormValues] = React.useState<FormValues>({});
  const [activityPackage, setActivityPackage] = React.useState({
    currentStep: 1,
    packageName: '',
    serviceName: '',
    activityName: '',
  });

  // React.useEffect(() => {
  //   if (!currLocalStorage.activities[activityItem.activityId]) return;
  //   const emptyActivityProperties =
  //     Object.keys(currLocalStorage.activities[activityItem.activityId])
  //       .length === 0;
  //   setActivityPackage((prevState) => ({
  //     ...prevState,
  //     currentStep: emptyActivityProperties ? 1 : 4,
  //   }));
  //   console.log('currentActivity', activityItem.activityId);
  // }, [isOpen, activityItem.activityId]);

  const getTitleStep = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return 'Select Activity Package';
      case 2:
        return (
          currLocalStorage.activities[activityItem.activityID]
            .packageNameName || activityPackage.packageName
        );
      case 3:
        return (
          currLocalStorage.activities[activityItem.activityID].serviceName ||
          activityPackage.serviceName
        );
      case 4:
        return (
          currLocalStorage.activities[activityItem.activityID].activityName ||
          activityPackage.activityName
        );
      default:
        return 'Will be update soon';
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
      activityName: activityName,
      currentStep: 4,
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

  const handleInputChange = (key: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
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
              ActivityID: {activityItem.activityID}
            </h1>
            <h1 className="font-bold text-md text-orange-500">
              Name: {activityItem.activityName}
            </h1>
            {ActivityPackageTemplates.map((item) => {
              return (
                <div key={item._id}>
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
                      (service: string) => (
                        <div key={service}>
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
                  {activityPackage.currentStep == 4 &&
                    activityPackage.packageName == item.displayName &&
                    Object.keys(
                      getArgumentsByActivity(
                        item.activityTemplates,
                        activityPackage.activityName
                      )
                    ).map((key: any) => {
                      const argumentParams = getArgumentsByActivity(
                        item.activityTemplates,
                        currLocalStorage.activities[activityItem.activityID]
                          .activityName || activityPackage.activityName
                      )[key].arguments;
                      return (
                        <div key={activityPackage.activityName}>
                          {Object.entries(argumentParams).map(
                            ([key, value]) => (
                              <div key={key}>
                                <FormControl>
                                  <FormLabel>{key}</FormLabel>
                                  <Input
                                    type="text"
                                    value={
                                      formValues[key] ||
                                      currLocalStorage.activities[
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
            })}
            <Button
              className="mt-[20px]"
              onClick={() => {
                setActivityPackage((prevState) => ({
                  ...prevState,
                  activityName: '',
                  currentStep:
                    prevState.currentStep > 2 ? prevState.currentStep - 1 : 1,
                }));
                currLocalStorage.activities[activityItem.activityID] = {};
                localStorage.setItem(
                  'currProcess',
                  JSON.stringify(currLocalStorage)
                );
                setFormValues({});
                console.log(
                  'Current LocalStorage',
                  JSON.parse(localStorage.getItem('currProcess') as string)
                );
              }}>
              Back
            </Button>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                Object.assign(
                  currLocalStorage.activities[activityItem.activityID],
                  {
                    ...activityPackage,
                    ...formValues,
                  }
                );
                localStorage.setItem(
                  'currProcess',
                  JSON.stringify(currLocalStorage)
                );
                console.log(
                  'Current LocalStorage',
                  JSON.parse(localStorage.getItem('currProcess') as string)
                );
                setFormValues({});
              }}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
