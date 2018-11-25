import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  buttonView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '5%',
  },
  deleteButton: {
    alignItems: 'center',
    backgroundColor: 'darkred',
    justifyContent: 'center',
    width: '40%',
  },
  deleteText: {
    color: 'white',
  },
  saveButton: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    width: '40%',
  },
  saveText: {
    color: 'darkred',
  },
});
