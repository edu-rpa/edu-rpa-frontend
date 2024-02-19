import { Activity } from '@/types/activity';
import { useReducer } from 'react';

const initialState = {
  currentStep: 1,
  packageName: '',
  serviceName: '',
  activityName: '',
};

const getPreviousState = (state: any, currentStep: number) => {
  switch (currentStep) {
    case 1:
      return { ...state, packageName: '' };
    case 2:
      return { ...state, activityName: '' };
    case 3:
      return { ...state };
  }
};

const propertiesBarReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_PACKAGE':
      return { ...state, currentStep: 2, packageName: action.payload };
    case 'SET_ACTIVITY':
      return { ...state, currentStep: 3, activityName: action.payload };
    case 'SET_BACK':
      const previousState = getPreviousState(
        state,
        Math.max(1, state.currentStep - 1)
      );
      return {
        ...state,
        ...previousState,
        currentStep: Math.max(1, state.currentStep - 1),
      };
    case 'SET_DEFAULT':
      return { ...initialState };
    case 'SET_PROPERTY':
      return {
        ...state,
        currentStep: 3,
        packageName: action.payload?.activityPackage,
        serviceName: action.payload?.serviceName,
        activityName: action.payload?.activityName,
      };
    default:
      return state;
  }
};

export const usePropertiesSidebar = () => {
  const [sideBarState, dispatch] = useReducer(
    propertiesBarReducer,
    initialState
  );

  const setPackage = (packageName: string) => {
    dispatch({ type: 'SET_PACKAGE', payload: packageName });
  };

  const setActivity = (activityName: string) => {
    dispatch({ type: 'SET_ACTIVITY', payload: activityName });
  };

  const setBack = () => {
    dispatch({ type: 'SET_BACK' });
  };

  const setDefault = () => {
    dispatch({ type: 'SET_DEFAULT' });
  };

  const setProperty = (activityInfo: Activity) => {
    dispatch({ type: 'SET_PROPERTY', payload: activityInfo });
  };

  const getTitleStep = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return 'Select Activity Package';
      case 2:
        return sideBarState.packageName;
      case 3:
        return sideBarState.activityName;
    }
  };

  return {
    sideBarState,
    getTitleStep,
    setPackage,
    setActivity,
    setBack,
    setDefault,
    setProperty,
  };
};
