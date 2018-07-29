import React, { Component } from 'react';
import { Grid, Input, Icon, Card, Dimmer, Loader, Pagination, Container } from 'semantic-ui-react';
import { searchForProducts } from '../../../services/FoodSearchService';
import './ProductSearchContainer.scss';
import ProductSearchItem from './ProductSearchItem';
import { saveProduct } from '../../../services/FoodSearchService';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import modules from '../../../store/modules';

export class ProductSearchContainer extends Component {
    state = {
        loading: false,
        activePage: 1
    }

    handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

    onFoodItemSearch = async (data, { value }) => {
        this.setState({ loading: true });
        await new Promise((resolve) => setTimeout(() => resolve(true), 200));
        const searchResults = await searchForProducts(value);
        const filteredSearchResults = this.filterSearchResults(searchResults);
        const { setSearchResults } = this.props;
        setSearchResults(filteredSearchResults);
        this.setState({ loading: false });
    };

    filterSearchResults = (searchResults) => {
        const { goodFoods, badFoods } = this.props;
        const previouslyAssignedFoods = goodFoods.concat(badFoods);
        return searchResults.filter(result => !previouslyAssignedFoods.find(food => food.id === result.id));
    }

    renderProductResults = () => {
        const { activePage } = this.state;
        const { searchResults } = this.props;
        if (searchResults.length === 0) {
            return (
                <div>
                    {/* No products to show */}
                </div>
            );
        }

        const startIndex = (activePage - 1) * 5;
        const endIndex = (activePage) * 5;
        const searchResultsOnActivePage = searchResults.slice(startIndex, endIndex);

        return searchResultsOnActivePage.map((product) => (
            <ProductSearchItem
                key={product.id}
                productInfo={product}
                saveProduct={this.saveProduct}
            />
        ));
    }

    renderLoader = () => (
        <Dimmer active inverted>
            <Loader />
        </Dimmer>
    );

    saveProduct = async (product) => {
        await saveProduct(product);
        const { addToGoodFoods, addToBadFoods, removeProductFromSearchResults } = this.props;
        const { productStatus } = product;
        if (productStatus === 'good') {
            addToGoodFoods(product);
            removeProductFromSearchResults(product);
        } else if (productStatus === 'bad') {
            addToBadFoods(product);
            removeProductFromSearchResults(product);
        } else {
            throw new Error('Unsupported product status', productStatus);
        }
    }

    render() {
        const { loading, activePage } = this.state;
        const { searchResults } = this.props;

        return (
            <div className='ProductSearchContainer'>
                <Container>
                    <Grid>
                        <Grid.Row>
                            <Input icon placeholder='Search...' onChange={this.onFoodItemSearch}>
                                <input />
                                <Icon name='search' />
                            </Input>
                        </Grid.Row>
                        <Grid.Row>
                            <Pagination
                                activePage={activePage}
                                onPageChange={this.handlePaginationChange}
                                totalPages={Math.floor(searchResults.length / 5)}
                            />
                        </Grid.Row>
                        <Grid.Row>
                            <Container>
                                <Card.Group className={'ProductSearchContainer-searchResults'} itemsPerRow={5}>
                                    {!loading ? this.renderProductResults() : this.renderLoader()}
                                </Card.Group>
                            </Container>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    goodFoods: modules.foods.selectors.getGoodFoods,
    badFoods: modules.foods.selectors.getBadFoods,
    searchResults: modules.foods.selectors.getSearchResults
});

const mapDispatchToProps = {
    addToGoodFoods: modules.foods.actions.addFoodToGoodFoods,
    addToBadFoods: modules.foods.actions.addFoodToBadFoods,
    setSearchResults: modules.foods.actions.setSearchResults,
    removeProductFromSearchResults: modules.foods.actions.removeProductFromSearchResults
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductSearchContainer);
