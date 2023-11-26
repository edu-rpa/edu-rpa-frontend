import { ActivityTemplates } from '@/constants/activityPackage';
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
  IconButton,
  Select,
  Switch,
  Tooltip,
} from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import React, { useEffect, useReducer, useState } from 'react';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import SVGIcon from '@/components/Icons/SVGIcon';

import GoogleWorkpaceIcon from '@/assets/svgs/google-workspace.svg';
import ControlIcon from '@/assets/svgs/control.svg';
import BrowserAutomationIcon from '@/assets/svgs/browser-automation.svg';
import DocumentAutomationIcon from '@/assets/svgs/document-automation.svg';
import DatePicker from '@/components/DatePicker/DatePicker';
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
interface ArgumentProps {
  type: string;
  description: string;
  keywordArg?: string;
  value?: any;
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
  const [formValues, setFormValues] = useState<FormValues>({});
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
        <DrawerContent w={400} maxW={400}>
          <DrawerCloseButton />
          <DrawerHeader>{getTitleStep(sideBarState.currentStep)}</DrawerHeader>
          <DrawerBody>
            <h1 className="font-bold text-md text-red-500">
              ActivityID: {activityItem.activityID}
            </h1>

            {ActivityTemplates.map((item) => {
              const { _id, displayName, activityTemplates, description } = item;
              const { currentStep, packageName, serviceName, activityName } =
                sideBarState;

              const getPackageIcon = (displayName: string) => {
                switch (displayName) {
                  case 'Google Workspace':
                    return GoogleWorkpaceIcon;
                  case 'Control':
                    return ControlIcon;
                  case 'Browser automation':
                    return BrowserAutomationIcon;
                  case 'Document automation':
                    return DocumentAutomationIcon;
                }
              };

              const renderStepOne = () => (
                <Tooltip label={description}>
                  <div className="my-[20px] flex justify-center">
                    <IconButton
                      variant="outline"
                      aria-label="Call Segun"
                      style={{ width: 100, height: 100 }}
                      onClick={() => handleSelectPackage(displayName)}
                      icon={
                        <SVGIcon
                          width="100%"
                          height="100%"
                          svgComponent={getPackageIcon(displayName)}
                        />
                      }
                    />
                  </div>
                </Tooltip>
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
                    <Tooltip label={activity.description}>
                      <Button
                        className="my-[10px]"
                        onClick={() =>
                          handleSelectActivity(activity.displayName)
                        }>
                        {activity.displayName}
                      </Button>
                    </Tooltip>
                  </div>
                ));
              };

              const renderProperty = (
                paramKey: string,
                paramValue: ArgumentProps
              ) => {
                switch (paramValue.type) {
                  case 'string':
                    return (
                      <Input
                        type="text"
                        value={(formValues[paramKey] as string) ?? ''}
                        onChange={(e) =>
                          handleInputChange(paramKey, e.target.value)
                        }
                      />
                    );
                  case 'boolean':
                    return <Switch id={paramKey} />;
                  case 'date':
                    return <DatePicker />;
                  case 'email':
                    return (
                      <Input
                        type="email"
                        value={(formValues[paramKey] as string) ?? ''}
                        onChange={(e) =>
                          handleInputChange(paramKey, e.target.value)
                        }
                      />
                    );
                  case 'number':
                    return (
                      <Input
                        type="number"
                        value={(formValues[paramKey] as string) ?? ''}
                        onChange={(e) =>
                          handleInputChange(paramKey, e.target.value)
                        }
                      />
                    );
                  case 'connection.Google Drive':
                    return (
                      <Input
                        type="text"
                        variant="filled"
                        value={
                          (formValues[paramKey] as string) ??
                          'My Google Drive Connection'
                        }
                        disabled
                      />
                    );
                  case 'connection.Gmail':
                    return (
                      <Input
                        type="text"
                        variant="filled"
                        value={
                          (formValues[paramKey] as string) ??
                          'My Gmail Connection'
                        }
                        disabled
                      />
                    );
                  case 'connection.Google Sheets':
                    return (
                      <Input
                        type="text"
                        variant="filled"
                        value={
                          (formValues[paramKey] as string) ??
                          'My Google Sheet Connection'
                        }
                        disabled
                      />
                    );
                  case 'list':
                    return (
                      <Input
                        type="text"
                        value={(formValues[paramKey] as string) ?? ''}
                        onChange={(e) =>
                          handleInputChange(paramKey, e.target.value)
                        }
                      />
                    );
                  case 'enum.shareType':
                    return (
                      <Select>
                        <option value="user">User</option>
                        <option value="all">All</option>
                      </Select>
                    );
                  case 'enum.permission':
                    return (
                      <Select>
                        <option value="reader">Reader</option>
                        <option value="editor">Editor</option>
                        <option value="commenter">Commenter</option>
                        <option value="all">All</option>
                      </Select>
                    );
                  case 'label_ids':
                    return (
                      <Select>
                        <option value="inbox">Inbox</option>
                        <option value="starred">Starred</option>
                        <option value="sent">Sent</option>
                        <option value="spam">Spam</option>
                        <option value="trash">Trash</option>
                        <option value="scheduled">Scheduled</option>
                      </Select>
                    );
                  case 'expression.logic':
                    return (
                      <div className="grid grid-cols-3">
                        {Object.entries(paramValue.value).map(
                          ([paramKey, paramValue]) => {
                            if (!paramValue) return;
                            if (
                              typeof paramValue === 'object' &&
                              'type' in paramValue &&
                              paramValue.type == 'string'
                            ) {
                              return (
                                <Input
                                  key={paramKey}
                                  type="text"
                                  value={(formValues[paramKey] as string) ?? ''}
                                  onChange={(e) =>
                                    handleInputChange(paramKey, e.target.value)
                                  }
                                />
                              );
                            } else {
                              if (
                                typeof paramValue === 'object' &&
                                'description' in paramValue
                              ) {
                                return (
                                  <Select key={paramKey}>
                                    <option value="=">=</option>
                                    <option value="!=">!=</option>
                                    <option value=">">{'>'}</option>
                                    <option value="<">{'<'}</option>
                                    <option value=">=">{'>='}</option>
                                    <option value="<=">{'<='}</option>
                                  </Select>
                                );
                              }
                            }
                          }
                        )}
                      </div>
                    );
                }
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
                        ([paramKey, paramValue]) => {
                          if (
                            paramValue &&
                            typeof paramValue === 'object' &&
                            'description' in paramValue
                          ) {
                            return (
                              <Tooltip
                                label={paramValue.description as string}
                                key={paramKey}>
                                <FormControl>
                                  <FormLabel>{paramKey}</FormLabel>
                                  {renderProperty(
                                    paramKey,
                                    paramValue as ArgumentProps
                                  )}
                                </FormControl>
                              </Tooltip>
                            );
                          }
                          return null; // Handle null or invalid values
                        }
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
            {sideBarState.currentStep > 1 && (
              <Button
                className="mt-[20px]"
                colorScheme="teal"
                onClick={handleGoBack}>
                Back
              </Button>
            )}
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
