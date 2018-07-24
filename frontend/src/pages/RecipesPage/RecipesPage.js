import React, { Component } from 'react';
import _ from 'lodash';
import { Container } from 'semantic-ui-react';
import './RecipesPage.scss';

export default class RecipesPage extends Component {
    render() {
        return (
            <Container className='RecipesPage'>
                {
                    _.times(7, i => i)
                }
            </Container>
        );
    }
}