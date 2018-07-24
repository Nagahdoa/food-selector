import React, { Component } from 'react';
import { List, Header } from 'semantic-ui-react';

export default class FoodList extends Component {
    render() {
        const { foods, title } = this.props;

        return (
            <div>
                <Header as='h3'>{title}</Header>
                <List>
                    {        
                        foods.map(({ name, description }) => (
                            <List.Item key={name}>
                                <List.Icon name='food' />
                                <List.Content>
                                    <List.Header as='a'>{name}</List.Header>
                                    <List.Description>{description}</List.Description>
                                </List.Content>
                            </List.Item>
                        ))
                    }
                </List>
            </div>
        );
    }
}