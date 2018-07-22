import React, { Component } from 'react';
import _ from 'lodash';
import { 
    Container, Grid, List, Header, Modal, Button ,
    Input, Icon, Card, Image
} from 'semantic-ui-react';
import './FoodListsPage.scss';
import requestPromise from 'request-promise';

export default class FoodListsPage extends Component {
    state = {
        addFoodItemOpen: true,
        addFoodItemType: 'White',
        whitelist: [
            { name: 'Rice cake', description: 'No known reaction' },
            { name: 'Sweet potato', description: 'No known reaction' },
            { name: 'Broccoli', description: 'No known reaction' },
            { name: 'Carrots', description: 'No known reaction' },
            { name: 'Grapes', description: 'No known reaction' },
        ],
        blacklist: [
            { name: 'Peanuts', description: 'Worst' },
            { name: 'Gluten', description: 'Major' },
            { name: 'Chicken', description: 'Don\'t like' },
            { name: 'Nuts', description: 'Don\'t like' },
            { name: 'Fish', description: 'Don\'t like' },
        ],
        productSearchResults: []
    }

    closeFoodItemModal = () => this.setState({ addFoodItemOpen: false });
    openFoodItemModal = (addFoodItemType) => () => this.setState({ addFoodItemOpen: true, addFoodItemType })
    onFoodItemSearch = async (data, {value}) => {
        const offset = 10;
        const limit = 10;

        var options = {
            uri: 'https://dev.tescolabs.com/grocery/products',
            qs: {
                query: value,
                offset,
                limit
            },
            headers: {
                'User-Agent': 'Request-Promise',
                'Ocp-Apim-Subscription-Key': 'd36fa31bed03489fb52ebb04ce8d986e'
            },
            json: true
        };

        let productSearchResults = [];
        if (value && value.length > 0) {
            const response = await requestPromise(options)
            productSearchResults = _.get(response, 'uk.ghs.products.results');
        }
        this.setState({ productSearchResults });
    };

    renderProductResults = () => {
        const { productSearchResults } = this.state;
        return (
            <Card.Group className={'FoodListsPage-searchResults'} itemsPerRow={5}>
                {productSearchResults.map(product => {
                    const { name, image, id } = product;
                    console.log(product);

                    return (
                        <Card key={id}>
                            <Image src={image} />
                            <Card.Content>
                                <Card.Header>{name}</Card.Header>
                            </Card.Content>
                        </Card>
                    );
                })}
            </Card.Group>
        );
    }

    renderAddFoodItemModal = () => {
        const { addFoodItemOpen, addFoodItemType } = this.state;
        return (
            <div>
                <Button.Group>
                    <Button onClick={this.openFoodItemModal('White')}>White</Button>
                    <Button.Or />
                    <Button color='black' onClick={this.openFoodItemModal('Black')}>Black</Button>
                </Button.Group>
                <Modal open={addFoodItemOpen} onClose={this.closeFoodItemModal}>
                    <Modal.Header>{`Add Item To ${addFoodItemType}list`}</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <Grid>
                                <Grid.Row>
                                    <Input icon placeholder='Search...' onChange={this.onFoodItemSearch}>
                                        <input />
                                        <Icon name='search' />
                                    </Input>
                                </Grid.Row>
                                <Grid.Row>
                                    {this.renderProductResults()}
                                </Grid.Row>
                            </Grid>
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            </div>
        );
    }

    renderFoodList = (foodlist) => {
        const foodlistElements = foodlist.map(foodlistItem => {
            const { name, description } = foodlistItem;
            return (
                <List.Item key={name}>
                    <List.Icon name='food' />
                    <List.Content>
                        <List.Header as='a'>{name}</List.Header>
                        <List.Description>{description}</List.Description>
                    </List.Content>
                </List.Item>
            );
        });

        return (
            <div>
                <div className="FoodListsPage-addWhitelistItems">
                    {foodlistElements}
                </div>
            </div>
        );
    }

    render() {
        const { whitelist, blacklist } = this.state;
        return (
            <Container>
                <Grid>
                    <Grid.Row centered>
                        {this.renderAddFoodItemModal()}
                    </Grid.Row>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <Header as='h3'>Whitelist</Header>
                            <List>
                                {this.renderFoodList(whitelist)}
                            </List>
                        </Grid.Column>
                        <Grid.Column textAlign='right'>
                            <Header as='h3'>Blacklist</Header>
                            <List>
                                {this.renderFoodList(blacklist)}
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}