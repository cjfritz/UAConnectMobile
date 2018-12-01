import { NavigationActions } from 'react-navigation';
// allows action creators to use this reference to navigate outside of screen control
let navigator;

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}
// simulate navigate function to allow navigation for action creators
function navigate(routeName, params) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}
// simulate back functino to allow navigation for action creators
function back(key) {
  navigator.dispatch(
    NavigationActions.back({ key })
  );
}
// export needed navigation actions
export default {
  navigate,
  back,
  setTopLevelNavigator,
};
