import React, { Component } from 'react';
import { Container, Tab } from 'semantic-ui-react';
import './FoodListsPage.scss';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import modules from '../../store/modules';
import FoodList from './FoodList';
import ProductSearchContainer from './ProductSearchContainer';
import { getProducts } from '../../services/FoodSearchService';

export class FoodListsPage extends Component {

    async componentDidMount() {
        const { setFoods } = this.props;
        const { goodFoods, badFoods } = await getProducts();
        setFoods({
            goodFoods,
            badFoods,
        });
    }

    render() {
        const { goodFoods, badFoods } = this.props;

        const panes = [
            { menuItem: 'Product Search', render: () => <Tab.Pane><ProductSearchContainer /></Tab.Pane> },
            { menuItem: 'Good Foods', render: () => <Tab.Pane><FoodList title='Good Foods' foods={goodFoods} /></Tab.Pane> },
            { menuItem: 'Bad Foods', render: () => <Tab.Pane><FoodList title='Bad Foods' foods={badFoods} /></Tab.Pane> },
        ];

        return (
            <Container>
                <Tab menu={{ pointing: true }} panes={panes} />
            </Container>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    goodFoods: modules.foods.selectors.getGoodFoods,
    badFoods: modules.foods.selectors.getBadFoods,
});

const mapDispatchToProps = {
    setFoods: modules.foods.actions.initFoodsState
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FoodListsPage);
