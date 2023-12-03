import { ActivityTemplates } from '@/constants/activityPackage';
import { Activity } from '@/types/activity';
import { setLocalStorageObject } from '@/utils/localStorageService';
import {
  getActivityInProcess,
  getProcessFromLocalStorage,
  updateActivityInProcess,
  updateLocalStorage,
} from '@/utils/processService';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  IconButton,
  Select,
  Switch,
  Tooltip,
  DrawerOverlay,
} from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import SVGIcon from '@/components/Icons/SVGIcon';
import GoogleWorkpaceIcon from '@/assets/svgs/google-workspace.svg';
import ControlIcon from '@/assets/svgs/control.svg';
import BrowserAutomationIcon from '@/assets/svgs/browser-automation.svg';
import DocumentAutomationIcon from '@/assets/svgs/document-automation.svg';
import CustomDatePicker from '@/components/CustomDatePicker/ CustomDatePicker';
import { LocalStorage } from '@/constants/localStorage';
import { ArgumentProps, PropertiesProps } from '@/types/property';
import { getVariableItemFromLocalStorage } from '@/utils/variableService';
import { Variable } from '@/utils/bpmn-parser/visitor/robot';
import TextAutoComplete from '@/components/AutoComplete/TextAutoComplete';
interface PropertiesSideBarProps {
  isOpen: boolean;
  onClose: () => void;
  activityItem: Activity;
}

interface FormValues {
  [key: string]: any;
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
  const [saveResult, setSaveResult] = useState<string | null>(null);
  const [sideBarState, dispatch] = useReducer(sidebarReducer, initialState);
  const [isExist, setIsExist] = useState(false);
  const datePickerRef = useRef(null);
  const currentVariableStorage = getVariableItemFromLocalStorage(processID);
  const variableStorage = currentVariableStorage?.variables.map(
    (variable: Variable) => variable.name
  );

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
      setSaveResult(null);
      setIsExist(false);
    } else {
      handleSetPropertyFromLocalStorage(getActivityByID.properties);
      setFormValues(getActivityByID.properties.arguments);
      setSaveResult(getActivityByID.properties.return);
      setIsExist(true);
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

  const handleInputChange = (key: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleUpdateProperties = () => {
    if (sideBarState.currentStep < 4) return;
    const payload = {
      activityPackage: sideBarState.packageName,
      serviceName: sideBarState.serviceName,
      activityName: sideBarState.activityName,
      arguments: formValues,
      return: saveResult,
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
    setLocalStorageObject(LocalStorage.PROCESS_LIST, updateProcess);
  };

  return (
    <div>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        onCloseComplete={handleUpdateProperties}>
        <DrawerOverlay />
        <DrawerContent w={400} maxW={400}>
          <DrawerCloseButton />
          <DrawerHeader>{getTitleStep(sideBarState.currentStep)}</DrawerHeader>
          <DrawerBody>
            <h1 className="font-bold text-md text-primary">
              ActivityID: {activityItem.activityID}
            </h1>
            <h1 className="font-bold text-md text-primary">
              Name: {activityItem.activityName}
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
                      <TextAutoComplete
                        type="text"
                        value={formValues[paramKey] ?? ''}
                        onChange={(newValue: string) => {
                          handleInputChange(paramKey, newValue);
                        }}
                        recommendedWords={variableStorage}
                      />
                    );
                  case 'boolean':
                    if (!isExist) formValues[paramKey] = false;
                    return (
                      <Switch
                        defaultChecked={formValues[paramKey]}
                        onChange={(e) => {
                          formValues[paramKey] = e.target.checked;
                        }}
                        id={paramKey}
                      />
                    );
                  case 'date':
                    if (!isExist) formValues[paramKey] = new Date();
                    return (
                      <CustomDatePicker
                        ref={datePickerRef}
                        defaultValue={new Date(formValues[paramKey])}
                        paramKey={paramKey}
                        handleInputChange={handleInputChange}
                      />
                    );
                  case 'email':
                    return (
                      <TextAutoComplete
                        type="email"
                        value={formValues[paramKey] ?? ''}
                        onChange={(newValue: string) => {
                          handleInputChange(paramKey, newValue);
                        }}
                        recommendedWords={variableStorage}
                      />
                    );
                  case 'number':
                    return (
                      <Input
                        type="number"
                        value={formValues[paramKey] ?? ''}
                        onChange={(e) =>
                          handleInputChange(paramKey, e.target.value)
                        }
                      />
                    );
                  case 'connection.Google Drive':
                    if (!isExist) {
                      const driveConnection = 'My Google Drive Connection';
                      formValues[paramKey] = driveConnection;
                    }
                    return (
                      <Input
                        type="text"
                        variant="filled"
                        value={formValues[paramKey]}
                        disabled
                      />
                    );
                  case 'connection.Gmail':
                    if (!isExist) {
                      const gmailConnection = 'My Gmail Connection';
                      formValues[paramKey] = gmailConnection;
                    }
                    return (
                      <Input
                        type="text"
                        variant="filled"
                        value={formValues[paramKey]}
                        disabled
                      />
                    );
                  case 'connection.Google Sheets':
                    if (!isExist) {
                      const sheetConnection = 'My Google Sheet Connection';
                      formValues[paramKey] = sheetConnection;
                    }
                    return (
                      <Input
                        type="text"
                        variant="filled"
                        value={formValues[paramKey]}
                        disabled
                      />
                    );
                  case 'list':
                    return (
                      <Input
                        type="text"
                        value={formValues[paramKey] ?? ''}
                        onChange={(e) =>
                          handleInputChange(paramKey, e.target.value)
                        }
                      />
                    );
                  case 'enum.shareType':
                    if (!isExist) {
                      formValues[paramKey] = 'user';
                    }
                    return (
                      <Select
                        defaultValue={formValues[paramKey]}
                        onChange={(e) => {
                          formValues[paramKey] = e.target.value;
                        }}>
                        <option value="user">User</option>
                        <option value="all">All</option>
                      </Select>
                    );
                  case 'enum.permission':
                    if (!isExist) {
                      formValues[paramKey] = 'reader';
                    }
                    return (
                      <Select
                        defaultValue={formValues[paramKey]}
                        onChange={(e) => {
                          formValues[paramKey] = e.target.value;
                        }}>
                        <option value="reader">Reader</option>
                        <option value="editor">Editor</option>
                        <option value="commenter">Commenter</option>
                        <option value="all">All</option>
                      </Select>
                    );
                  case 'label_ids':
                    if (!isExist) {
                      formValues[paramKey] = 'inbox';
                    }
                    return (
                      <Select
                        defaultValue={formValues[paramKey]}
                        onChange={(e) => {
                          formValues[paramKey] = e.target.value;
                        }}>
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
                                  value={formValues[paramKey] ?? ''}
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
                                if (!isExist) formValues[paramKey] = '=';
                                return (
                                  <Select
                                    key={paramKey}
                                    defaultValue={formValues[paramKey]}
                                    onChange={(e) => {
                                      formValues[paramKey] = e.target.value;
                                    }}>
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
                const returnType = activityInfo?.[0]?.return;
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
                          return null;
                        }
                      )}
                    {returnType && (
                      <Tooltip
                        label={returnType.description}
                        key={returnType.displayName}>
                        <FormControl>
                          <FormLabel>Result Variable</FormLabel>
                          <Select
                            defaultValue={saveResult || ''}
                            onChange={(e) => {
                              setSaveResult(e.target.value);
                            }}>
                            <option value="" disabled>
                              Choose Variable
                            </option>
                            {variableStorage &&
                              variableStorage.map((variable: Variable) => (
                                <option
                                  key={variable.toString()}
                                  value={'${' + variable.toString() + '}$'}>
                                  {'${' + variable.toString() + '}'}
                                </option>
                              ))}
                          </Select>
                        </FormControl>
                      </Tooltip>
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
        </DrawerContent>
      </Drawer>
    </div>
  );
}
