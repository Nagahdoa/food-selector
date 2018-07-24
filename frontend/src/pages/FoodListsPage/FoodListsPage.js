import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import './FoodListsPage.scss';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import modules from '../../store/modules';
import FoodList from './FoodList';
import ProductSearchContainer from './ProductSearchContainer';

export class FoodListsPage extends Component {
    render() {
        const { goodFoods, badFoods } = this.props;
        return (
            <Container>
                <ProductSearchContainer />
                <Grid>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <FoodList title='Good Foods' foods={goodFoods} />
                        </Grid.Column>
                        <Grid.Column>
                            <FoodList title='Bad Foods' foods={badFoods} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    goodFoods: modules.foods.selectors.getGoodFoods,
    badFoods: modules.foods.selectors.getBadFoods,
});

export default connect(
    mapStateToProps
)(FoodListsPage);
