import React, { Component } from 'react';
import {
  Card, CardItem, Text, Button, Body, Grid, Row, Col,
} from 'native-base';
import styles from './CourseCard.style';
// common component to render the course card
export default class CourseCard extends Component {
  onEdit = () => {
    const { courseItem, navigation } = this.props;
    navigation.navigate('PlannerEditComponent', { courseItem });
  };

  // render the coures card
  render() {
    // extract props from this.props
    const { courseItem } = this.props;
    const {
      course,
      description,
      term,
      grade,
      units,
    } = courseItem;
    // return what is to be rendered
    return (
      <Card>
        <CardItem style={ styles.headerContainer } header bordered>
          <Text style={ styles.headerText }>
            { course }
          </Text>
        </CardItem>
        <CardItem bordered>
          <Body style={ styles.col }>
            <Text style={ styles.bodyText }>
              { description }
            </Text>
          </Body>
        </CardItem>
        <CardItem bordered>
          <Grid>
            <Col style={ styles.col }>
              <Row style={ styles.row }>
                <Text style={ styles.titleText } header>GPA</Text>
              </Row>
              <Row style={ styles.row }>
                <Text style={ styles.text }>
                  { grade === '' ? 'N/A' : grade }
                </Text>
              </Row>
            </Col>
            <Col style={ styles.col }>
              <Row style={ styles.row }>
                <Text style={ styles.titleText } header>Term</Text>
              </Row>
              <Row style={ styles.row }>
                <Text style={ styles.bodyText }>
                  { term }
                </Text>
              </Row>
            </Col>
            <Col style={ styles.col }>
              <Row style={ styles.row }>
                <Text style={ styles.titleText } header>Units</Text>
              </Row>
              <Row style={ styles.row }>
                <Text style={ styles.bodyText }>
                  { units === '' ? 'N/A' : units }
                </Text>
              </Row>
            </Col>
          </Grid>
        </CardItem>
        <CardItem bordered>
          <Col style={ styles.col }>
            <Row style={ styles.row }>
              <Button style={ styles.headerContainer } onPress={ () => this.onEdit() }>
                <Text style={ styles.headerText }>
                  Edit Course
                </Text>
              </Button>
            </Row>
          </Col>
        </CardItem>
      </Card>
    );
  }
}
