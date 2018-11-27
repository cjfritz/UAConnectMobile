
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import {
  Item, H3, Input, Icon,
} from 'native-base';
import { plannerUpdate, plannerValidUpdate } from '../../actions/PlannerActions';
import FormPicker from '../common/FormPicker/FormPicker';
import styles from './PlannerForm.style';

export class PlannerForm extends Component {
  getCourseAndDescription = () => {
    const { course, description } = this.props;
    return `${course} - ${description}`;
  };

  getTermType = () => {
    const { term } = this.props;
    const termSplit = term.split(' - ');
    return termSplit[0];
  };

  getTermYear = () => {
    const { term } = this.props;
    const termSplit = term.split(' - ');
    return termSplit[1];
  };

  setCourseAndDescription = value => {
    const { updatePlannerForm, updateValidFields } = this.props;
    const split = value.split(' - ');
    updatePlannerForm({ prop: 'course', value: split[0] });
    updateValidFields({ prop: 'course', value: split[0] });
    updatePlannerForm({ prop: 'description', value: split[1] });
    updateValidFields({ prop: 'description', value: split[1] });
  };

  setTermType = value => {
    const { updatePlannerForm, updateValidFields, term } = this.props;
    const termSplit = term.split(' - ');
    updatePlannerForm({ prop: 'term', value: `${value} - ${termSplit[1]}` });
    updateValidFields({ prop: 'term', value: `${value} - ${termSplit[1]}` });
  };

  setTermYear = value => {
    const { updatePlannerForm, updateValidFields, term } = this.props;
    const termSplit = term.split(' - ');
    updatePlannerForm({ prop: 'term', value: `${termSplit[0]} - ${value}` });
    updateValidFields({ prop: 'term', value: `${termSplit[0]} - ${value}` });
  };

  setGrade = text => {
    const { updatePlannerForm, updateValidFields } = this.props;
    updatePlannerForm({ prop: 'grade', value: text });
    updateValidFields({ prop: 'grade', value: text });
  };

  setUnits = text => {
    const { updatePlannerForm, updateValidFields } = this.props;
    updateValidFields({ prop: 'units', value: text });
    updatePlannerForm({ prop: 'units', value: text });
  };

  render() {
    const {
      grade,
      units,
      validFields,
      mockCourses,
      terms,
      termYears,
    } = this.props;
    return (
      <View style={ styles.container }>
        <H3 style={ styles.headerText }>
          Choose Course:
        </H3>
        <FormPicker
          placeholder='Select Course'
          selectedValue={ this.getCourseAndDescription }
          onValueChange={ this.setCourseAndDescription }
          items={ mockCourses }
        />
        <H3 style={ styles.headerText }>
          Choose Term Type:
        </H3>
        <FormPicker
          placeholder='Select Term Type'
          selectedValue={ this.getTermType }
          onValueChange={ this.setTermType }
          items={ terms }
        />
        <H3 style={ styles.headerText }>
          Choose Term Year:
        </H3>
        <FormPicker
          placeholder='Select Term Year'
          selectedValue={ this.getTermYear }
          onValueChange={ this.setTermYear }
          items={ termYears }
        />
        <H3 style={ styles.headerText }>
          GPA Earned:
        </H3>
        <Item error={ !validFields.validGrade }>
          <Input
            style={ styles.input }
            placeholder='Enter Grade'
            keyboardType='decimal-pad'
            onChangeText={ text => this.setGrade(text) }
            value={ grade }
          />
          { validFields.validGrade ? <Icon name='checkmark-circle' />
            : <Icon name='close-circle' />
          }
        </Item>
        <H3 style={ styles.headerText }>
          Units Earned:
        </H3>
        <Item error={ !validFields.validUnits }>
          <Input
            style={ styles.input }
            placeholder='Enter Units'
            keyboardType='number-pad'
            onChangeText={ text => this.setUnits(text) }
            value={ units }
          />
          { validFields.validUnits ? <Icon name='checkmark-circle' />
            : <Icon name='close-circle' />
          }
        </Item>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => (
  ({
    updatePlannerForm: ({ prop, value }) => dispatch(plannerUpdate({ prop, value })),
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
    validFields,
    mockCourses,
    terms,
    termYears,
  } = state.plannerForm;
  return {
    course,
    description,
    term,
    grade,
    units,
    validFields,
    mockCourses,
    terms,
    termYears,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlannerForm);
