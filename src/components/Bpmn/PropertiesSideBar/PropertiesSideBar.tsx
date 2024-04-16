import { ActivityPackages } from '@/constants/activityPackage';
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
  Select,
  Switch,
  Tooltip,
  DrawerOverlay,
  Box,
  Text,
} from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import CustomDatePicker from '@/components/CustomDatePicker/ CustomDatePicker';
import { LocalStorage } from '@/constants/localStorage';
import { ArgumentProps, PropertiesProps } from '@/types/property';
import { getVariableItemFromLocalStorage } from '@/utils/variableService';
import TextAutoComplete from '@/components/Input/AutoComplete/TextAutoComplete';
import {
  getActivityByService,
  getArgumentsByActivity,
  getDistinctService,
  getLibrary,
  getPackageIcon,
  getServiceIcon,
} from '@/utils/propertyService';
import { usePropertiesSidebar } from '@/hooks/usePropertiesSidebar';
import IconImage from '@/components/IconImage/IconImage';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { isSavedChange } from '@/redux/slice/bpmnSlice';
import { Variable } from '@/types/variable';
import { AuthorizationProvider } from '@/interfaces/enums/provider.enum';
import ConnectionOptions from './ConnectionSelect';

interface PropertiesSideBarProps {
  isOpen: boolean;
  onClose: () => void;
  activityItem: Activity;
}

interface FormProperties {
  keywordArg: string | null;
  value: any;
}

interface FormValues {
  [key: string]: FormProperties;
}

export default function PropertiesSideBar({
  isOpen,
  onClose,
  activityItem,
}: PropertiesSideBarProps) {
  const params = useParams();
  const {
    sideBarState,
    setPackage,
    getTitleStep,
    setActivity,
    setBack,
    setDefault,
    setProperty,
  } = usePropertiesSidebar();
  const processID = params.id as string;
  const [formValues, setFormValues] = useState<FormValues>({});
  const [saveResult, setSaveResult] = useState<string | null>(null);
  const [isExist, setIsExist] = useState(false);
  const datePickerRef = useRef(null);
  const currentVariableStorage = getVariableItemFromLocalStorage(processID);
  const variableStorage = currentVariableStorage?.variables.map(
    (variable: Variable) => [variable.name, variable.type]
  );
  const dispatch = useDispatch();

  const handleReset = () => {
    setDefault();
    setFormValues({});
    setSaveResult(null);
    setIsExist(false);
  };

  const handleActivities = (activity: any) => {
    setProperty(activity.properties);
    setFormValues(activity.properties.arguments);
    setSaveResult(activity.properties.return);
    setIsExist(true);
  };

  useEffect(() => {
    const activity = getActivityInProcess(processID, activityItem.activityID);
    if (!activity) return;
    const hasProperties = Object.keys(activity.properties).length > 0;
    if (!hasProperties) {
      handleReset();
    } else {
      handleActivities(activity);
    }
  }, [isOpen]);

  const handleGoBack = () => {
    setBack();
    setFormValues({});
    setSaveResult(null);
  };

  const handleInputChange = (key: string, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: { ...prev[key], value: value },
    }));
  };

  const handleUpdateProperties = () => {
    if (sideBarState.currentStep < 3) return;
    const payload = {
      activityPackage: sideBarState.packageName,
      serviceName: sideBarState.serviceName,
      activityName: sideBarState.activityName,
      library: getLibrary(sideBarState.packageName),
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

  const headerIcon =
    getServiceIcon(sideBarState.serviceName) ||
    getPackageIcon(sideBarState.packageName);

  const handleKeywordRobotFramework = (varName: string, varType: string) => {
    let prefix = '${'
    let suffix = '}'
    if (varType === 'list') {
      prefix = '@{'
    } 
    if (varType === 'dictionary') {
      prefix = '&{';
    }
    return `${prefix}${varName}${suffix}`;
  }

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
          <DrawerHeader>
            <Box className="flex justify-between items-center">
              <Box className="flex justify-between items-center">
                {headerIcon && (
                  <Image src={headerIcon} alt="logo" width={50} height={50} />
                )}
                <Text className={headerIcon ? 'ml-[10px]' : ''}>
                  {getTitleStep(sideBarState.currentStep)}
                </Text>
              </Box>
              <Box></Box>
            </Box>
          </DrawerHeader>
          <DrawerBody>
            <h1 className="font-bold text-md text-primary">
              ActivityID: {activityItem.activityID}
            </h1>
            <h1 className="font-bold text-md text-primary">
              Name: {activityItem.activityName}
            </h1>

            {ActivityPackages.map((activityPackage) => {
              const { _id, displayName, activityTemplates, description } =
                activityPackage;
              const { currentStep, packageName, activityName } = sideBarState;

              const renderStepOne = () => (
                <Tooltip label={description}>
                  <div className="my-[20px] flex justify-center">
                    <IconImage
                      icon={getPackageIcon(displayName) as any}
                      label={displayName}
                      onClick={() => setPackage(displayName)}
                    />
                  </div>
                </Tooltip>
              );

              const setDefaultValue = (
                paramKey: string,
                paramValue: ArgumentProps,
                value: any
              ) => {
                return {
                  ...formValues[paramKey],
                  keywordArg: paramValue.keywordArg || null,
                  value: value,
                };
              };

              const renderStepTwo = () => {
                return (
                  displayName === packageName &&
                  activityTemplates?.map((activity: any) => (
                    <div key={activity.displayName}>
                      <Tooltip label={activity.description}>
                        <Button
                          className="my-[10px]"
                          onClick={() => {
                            setActivity(activity.displayName);
                            dispatch(isSavedChange(false));
                          }}>
                          {activity.displayName}
                        </Button>
                      </Tooltip>
                    </div>
                  ))
                );
              };

              const initDefaultValue = (type: string) => {
                const defaultValues: Record<string, any> = {
                  string: '',
                  email: '',
                  list: '',
                  boolean: false,
                  date: new Date(),
                  number: '',
                  'connection.Google Drive': 'My Google Drive Connection',
                  'connection.Gmail': 'My Gmail Connection',
                  'connection.Google Sheets': 'My Google Sheet Connection',
                  'enum.shareType': 'user',
                  'enum.permission': 'reader',
                  label_ids: 'inbox',
                  'expression.logic': '=',
                };

                return defaultValues[type] ?? null;
              };

              type OptionType = { value: string; label: string };

              const renderInput = (
                paramKey: string,
                type: string,
                additionalProps: Record<string, unknown> = {}
              ) => (
                <Input
                  type={type}
                  value={formValues[paramKey]?.value ?? ''}
                  onChange={(e) => handleInputChange(paramKey, e.target.value)}
                  {...additionalProps}
                />
              );

              const renderSelect = (
                paramKey: string,
                options: OptionType[]
              ) => (
                <Select
                  defaultValue={formValues[paramKey]?.value ?? options[0].value}
                  onChange={(e) => handleInputChange(paramKey, e.target.value)}>
                  {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Select>
              );

              const renderConnectionSelect = (
                paramKey: string,
                provider: AuthorizationProvider,
                defaultValue: string = "Choose connection",
              ) => (
                <ConnectionOptions
                  defaultValue={defaultValue}
                  onChange={(e) => handleInputChange(paramKey, e.target.value)}
                  provider= {provider}
                />
              )

              const renderProperty = (
                paramKey: string,
                paramValue: ArgumentProps
              ) => {
                if (!formValues[paramKey]) {
                  formValues[paramKey] = setDefaultValue(
                    paramKey,
                    paramValue,
                    initDefaultValue(paramValue.type)
                  );
                }

                switch (paramValue.type) {
                  case 'string':
                  case 'email':
                  case 'any':
                  case 'list':
                  case 'variable':
                  case 'dictionary':
                  case 'DocumentTemplate':
                    return (
                      <TextAutoComplete
                        type="text"
                        value={formValues[paramKey]?.value ?? ''}
                        onChange={(newValue: string) =>
                          handleInputChange(paramKey, newValue)
                        }
                        recommendedWords={variableStorage}
                      />
                    );
                  case 'boolean':
                    return (
                      <Switch
                        defaultChecked={formValues[paramKey]?.value}
                        colorScheme="teal"
                        onChange={(e) => {
                          formValues[paramKey].value = e.target.checked;
                        }}
                        id={paramKey}
                      />
                    );

                  case 'date':
                    return (
                      <CustomDatePicker
                        ref={datePickerRef}
                        defaultValue={new Date(formValues[paramKey]?.value)}
                        paramKey={paramKey}
                        handleInputChange={handleInputChange}
                      />
                    );
                  case 'number':
                    return renderInput(paramKey, 'number');
                  case 'connection.Google Drive':
                    return renderConnectionSelect(paramKey, AuthorizationProvider.G_DRIVE, 'Choose your Drive Connection')
                  case 'connection.Gmail':
                    return renderConnectionSelect(paramKey, AuthorizationProvider.G_GMAIL, 'Choose your GMail Connection')
                  case 'connection.Google Sheets':
                    return renderConnectionSelect(paramKey, AuthorizationProvider.G_SHEETS, 'Choose your GSheet Connection')
                  case 'enum.shareType':
                    return renderSelect(paramKey, [
                      { value: 'user', label: 'User' },
                      { value: 'all', label: 'All' },
                    ]);
                  case 'enum.permission':
                    return renderSelect(paramKey, [
                      { value: 'reader', label: 'Reader' },
                      { value: 'commenter', label: 'Commenter' },
                      { value: 'editor', label: 'Editor' },
                      { value: 'all', label: 'All' },
                    ]);
                  case 'label_ids':
                    return renderSelect(paramKey, [
                      { value: 'inbox', label: 'Inbox' },
                      { value: 'starred', label: 'Starred' },
                      { value: 'sent', label: 'Sent' },
                      { value: 'spam', label: 'Spam' },
                      { value: 'trash', label: 'Trash' },
                      { value: 'scheduled', label: 'Scheduled' },
                    ]);
                  case 'enum.operator.logic':
                    return renderSelect(paramKey, [
                      { value: '>', label: '>' },
                      { value: '<', label: '<' },
                      { value: '=', label: '=' },
                      { value: '>=', label: '>=' },
                      { value: '<=', label: '<=' },
                    ]);
                  default:
                    return null;
                }
              };

              const renderStepThree = () => {
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
                              variableStorage.map((variable: any) => (
                                <option
                                  key={variable.toString()}
                                  value={handleKeywordRobotFramework(
                                    variable[0],
                                    variable[1]
                                  )}>
                                  {handleKeywordRobotFramework(
                                    variable[0],
                                    variable[1]
                                  )}
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
