import React, { Component } from 'react';
import { Grid, Input, Icon, Card, Image, Dimmer, Loader } from 'semantic-ui-react';
import { searchForProducts } from '../../../services/FoodSearchService';

export default class ProductSearchContainer extends Component {
    state = {
        searchResults: [],
        loading: false
    }

    onFoodItemSearch = async (data, { value }) => {
        this.setState({ loading: true });
        await new Promise((resolve) => setTimeout(() => resolve(true), 200));
        const searchResults = await searchForProducts(value);
        this.setState({ searchResults, loading: false });
    };

    renderProductResults = (products=[]) => {
        if (products.length === 0) {
            return (
                <div>
                    {/* Enter Your Product Search Query Here */}
                </div>
            );
        }

        return products.map(({ name, image, id }) => (
            <Card key={id}>
                <Image src={image} />
                <Card.Content>
                    <Card.Header>{name}</Card.Header>
                </Card.Content>
            </Card>
        ));
    }

    renderLoader = () => (
        <Dimmer active inverted>
            <Loader />
        </Dimmer>
    );

    render() {
        const { searchResults, loading } = this.state;

        return (
            <Grid>
                <Grid.Row>
                    <Input icon placeholder='Search...' onChange={this.onFoodItemSearch}>
                        <input />
                        <Icon name='search' />
                    </Input>
                </Grid.Row>
                <Grid.Row>
                    <Card.Group className={'FoodListsPage-searchResults'} itemsPerRow={5}>
                        {!loading ? this.renderProductResults(searchResults) : this.renderLoader()}
                    </Card.Group>
                </Grid.Row>
            </Grid>
        );
    }
}