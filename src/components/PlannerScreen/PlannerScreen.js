/* eslint-disable no-restricted-globals */
import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { map, reduce } from 'lodash';
import {
  Container, Content, Text, Button, Grid, Col, Row,
} from 'native-base';
import CourseCard from '../common/CourseCard/CourseCard';
import { plannerFetch } from '../../actions/PlannerActions';
import { LoadingModal } from '../common/LoadingModal/LoadingModal';
import styles from './PlannerScreen.style';
// component to display planner screen
export class PlannerScreen extends Component {
  // show navigation heade with add course option
  static navigationOptions = ({ navigation }) => (
    {
      title: 'Course Planner',
      headerRight: (() => (
        <Text style={ styles.headerButtonText } onPress={ () => navigation.navigate('PlannerCreateComponent') }>
          Add Course
        </Text>
      ))(),
      headerStyle: {
        backgroundColor: 'darkred',
      },
      headerTitleStyle: {
        color: 'white',
        fontSize: 20,
      },
    }
  );

  // on component mount, fetch the data from firebase
  componentWillMount() {
    const { firebasePlannerFetch } = this.props;
    firebasePlannerFetch();
  }

  // render all the necessary course cards
  renderItem = item => {
    const { navigation } = this.props;
    return (
      <CourseCard navigation={ navigation } courseItem={ item } />
    );
  };

  // on reload button press, fetch coures info again from firebase
  onReload = () => {
    const { firebasePlannerFetch } = this.props;
    firebasePlannerFetch();
  };

  // render the list for the course screen to show courses
  renderList = () => {
    const { planner, loading } = this.props;
    if (!loading && planner.length !== 0) {
      return (
        <FlatList
          data={ planner }
          renderItem={ ({ item }) => this.renderItem(item) }
          keyExtractor={ item => item.uid }
        />
      );
    } else if (!loading) {
      return (
        <View style={ styles.reloadView }>
          <Text style={ styles.reloadText }>No Courses Found</Text>
          <Button style={ styles.reloadButton } onPress={ this.onReload }>
            <Text style={ styles.titleText }>
              Reload
            </Text>
          </Button>
        </View>
      );
    }
    return null;
  };

  // calculate average GPA to show in the header
  getAverageGPA = () => {
    const { planner } = this.props;
    let gradeCounter = 0;
    const gradeTotal = reduce(planner, (sum, item) => {
      const grade = Number(item.grade);
      if (!isNaN(grade) && item.grade !== '') {
        gradeCounter += 1;
        return sum + grade;
      } else {
        return sum;
      }
    }, 0);
    return (gradeTotal / gradeCounter).toFixed(2);
  };

  // calculate total units to show in the header
  getTotalUnits = () => {
    const { planner } = this.props;
    const unitTotal = reduce(planner, (sum, item) => {
      const units = Number(item.units);
      if (!isNaN(units) && item.units !== '') {
        return sum + units;
      } else {
        return sum;
      }
    }, 0);
    return unitTotal;
  };

  // render the course planner screen
  render() {
    // desctructure props and data needed to render
    const { loading } = this.props;
    const averageGPA = this.getAverageGPA();
    const totalUnits = this.getTotalUnits();
    return (
      <Container style={ styles.container }>
        <LoadingModal visible={ loading } loadingLabel='Loading...' />
        <View style={ styles.infoHeader }>
          <Grid>
            <Col style={ styles.col }>
              <Row style={ styles.row }>
                <Text style={ styles.titleText }>Average GPA</Text>
              </Row>
              <Row style={ styles.row }>
                <Text style={ styles.bodyText }>{ isNaN(averageGPA) ? 'N/A' : averageGPA }</Text>
              </Row>
            </Col>
            <Col style={ styles.col }>
              <Row style={ styles.row }>
                <Text style={ styles.titleText }>Total Units</Text>
              </Row>
              <Row style={ styles.row }>
                <Text style={ styles.bodyText }>{ isNaN(totalUnits) ? 'N/A' : totalUnits }</Text>
              </Row>
            </Col>
          </Grid>
        </View>
        <Content>
          { this.renderList() }
        </Content>
      </Container>
    );
  }
}
// map action creators to component props
const mapDispatchToProps = dispatch => (
  {
    firebasePlannerFetch: () => dispatch(plannerFetch()),
  }
);
// map app state to component props
const mapStateToProps = state => {
  const { loading, courses } = state.planner;
  const planner = map(courses, (val, uid) => (
    { ...val, uid }
  ));
  return { planner, loading };
};
// export component to be used
export default connect(mapStateToProps, mapDispatchToProps)(PlannerScreen);
