import React, { Component } from 'react';
import {
  Container, Content, Button, H3,
} from 'native-base';
import { Alert, View } from 'react-native';
import { forEach } from 'lodash';
import { connect } from 'react-redux';
import PlannerFormComponent from '../PlannerForm/PlannerForm';
import {
  plannerUpdate, plannerSave, plannerDelete, plannerValidUpdate,
} from '../../actions/PlannerActions';
import styles from './PlannerEdit.style';
// component to generate planner edit screen
export class PlannerEdit extends Component {
  static navigationOptions = {
    title: 'Edit Course',
    headerStyle: {
      backgroundColor: 'darkred',
    },
    headerTitleStyle: {
      color: 'white',
    },
  };

  // on component mount, populate each field with values of selected course
  componentWillMount() {
    const { navigation, coursePlannerUpdate, updateValidFields } = this.props;
    const courseItem = navigation.getParam('courseItem', {});
    forEach(courseItem, (value, prop) => {
      coursePlannerUpdate({ prop, value });
      updateValidFields({ prop, value });
    });
  }

  // bring up save dialog on save button press
  onSave = () => {
    Alert.alert(
      'Save Changes?',
      undefined,
      [
        { text: 'Cancel' },
        { text: 'Confirm', onPress: () => this.onConfirmSave() },
      ]
    );
  };

  // dispatch save action on save dialog confirm button press
  onConfirmSave = () => {
    const {
      course,
      description,
      term,
      grade,
      units,
      coursePlannerSave,
      navigation,
    } = this.props;
    const courseItem = navigation.getParam('courseItem', {});
    coursePlannerSave({
      uid: courseItem.uid,
      course,
      description,
      term,
      grade,
      units,
    });
  };

  // bring up delete dialog on delete button press
  onDelete = () => {
    Alert.alert(
      'Delete Course?',
      undefined,
      [
        { text: 'Cancel' },
        { text: 'Confirm', onPress: () => this.onConfirmDelete() },
      ]
    );
  };

  // dispatch delete action on delete dialog confirm press
  onConfirmDelete = () => {
    const { coursePlannerDelete, navigation } = this.props;
    coursePlannerDelete(navigation.getParam('courseItem', {}).uid);
  };

  // disable save button on invalid fields
  isValid = () => {
    const { validFields } = this.props;
    const {
      validCourse,
      validDescription,
      validTerm,
      validGrade,
      validUnits,
    } = validFields;

    if (validCourse && validDescription && validTerm && validGrade && validUnits) {
      return true;
    } else {
      return false;
    }
  };

  // render the component
  render() {
    return (
      <Container>
        <Content>
          <PlannerFormComponent />
          <View style={ styles.buttonView }>
            <Button style={ styles.deleteButton } onPress={ () => this.onDelete() }>
              <H3 style={ styles.deleteText }>
                Delete
              </H3>
            </Button>
            <Button
              disabled={ !this.isValid() }
              style={ this.isValid() ? styles.saveButton : { ...styles.saveButton, backgroundColor: 'gray' } }
              onPress={ () => this.onSave() }
            >
              <H3 style={ styles.saveText }>
                Save
              </H3>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}
// map action creators to component props
const mapDispatchToProps = dispatch => (
  ({
    coursePlannerUpdate: ({ prop, value }) => dispatch(plannerUpdate({ prop, value })),
    coursePlannerSave: ({
      uid,
      course,
      description,
      term,
      grade,
      units,
    }) => dispatch(plannerSave({
      uid,
      course,
      description,
      term,
      grade,
      units,
    })),
    coursePlannerDelete: uid => dispatch(plannerDelete(uid)),
    updateValidFields: ({ prop, value }) => dispatch(plannerValidUpdate({ prop, value })),
  })
);
// map app state to component props
const mapStateToProps = state => {
  const {
    course,
    description,
    term,
    grade,
    units,
    validFields,
  } = state.plannerForm;
  return {
    course,
    description,
    term,
    grade,
    units,
    validFields,
  };
};
// export the planner edit screen
export default connect(mapStateToProps, mapDispatchToProps)(PlannerEdit);
