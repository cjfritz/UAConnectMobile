import { Toast } from 'native-base';

export const showToast = (
  text,
  duration = 3000,
  position = 'top',
  type,
) => {
  Toast.show({
    position,
    duration,
    text,
    type,
    buttonText: 'OK',
  });
};
