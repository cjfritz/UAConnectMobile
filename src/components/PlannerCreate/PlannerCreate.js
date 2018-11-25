import React, { Component } from 'react';
import { Alert } from 'react-native';
import {
  Container, Content, Button, H3,
} from 'native-base';
import { connect } from 'react-redux';
import PlannerFormComponent from '../PlannerForm/PlannerForm';
import {
  plannerCreate, plannerClear, plannerValidUpdate,
} from '../../actions/PlannerActions';
import styles from './PlannerCreate.style';

export class PlannerCreate extends Component {
  static navigationOptions = {
    title: 'Planner Create',
    headerStyle: {
      backgroundColor: 'darkred',
    },
    headerTitleStyle: {
      color: 'white',
    },
  };

  componentWillMount() {
    const { clearForm, updateValidFields } = this.props;
    const propsToSetInvalid = [
      'course',
      'description',
      'term',
      'grade',
      'units',
    ];
    clearForm();
    propsToSetInvalid.forEach(prop => {
      updateValidFields({ prop, value: '' });
    });
  }

  onCreate = () => {
    Alert.alert(
      'Create Course?',
      undefined,
      [
        { text: 'Cancel' },
        { text: 'Confirm', onPress: () => this.onConfirmCreate() },
      ]
    );
  };

  onConfirmCreate = () => {
    const {
      course,
      description,
      term,
      grade,
      units,
      coursePlannerCreate,
    } = this.props;
    coursePlannerCreate({
      course,
      description,
      term,
      grade,
      units,
    });
  };

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

  render() {
    return (
      <Container>
        <Content>
          <PlannerFormComponent />
          <Button disabled={ !this.isValid() } style={ styles.createButton } onPress={ () => this.onCreate() }>
            <H3 style={ styles.createText }>
              Create Course
            </H3>
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => (
  ({
    coursePlannerCreate: ({
      course,
      description,
      term,
      grade,
      units,
    }) => dispatch(plannerCreate({
      course,
      description,
      term,
      grade,
      units,
    })),
    clearForm: () => dispatch(plannerClear()),
    updateValidFields: ({ prop, value }) => dispatch(plannerValidUpdate({ prop, value })),
  })
);

const mapStateToProps = state => {
  const {
    course,
    description,
    term,
    grade,
    units,
    valid,
    validFields,
  } = state.plannerForm;
  return {
    course,
    description,
    term,
    grade,
    units,
    valid,
    validFields,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlannerCreate);
