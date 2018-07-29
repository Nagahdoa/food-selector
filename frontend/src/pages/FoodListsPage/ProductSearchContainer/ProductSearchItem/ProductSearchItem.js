import React, { Component } from 'react';
import { Card, Image, Container, Button, Icon } from 'semantic-ui-react';
import './ProductSearchItem.scss';

export default class ProductSearchItem extends Component {
    saveProduct = (productStatus) => () => {
        const { productInfo, saveProduct } = this.props;
        saveProduct({ productStatus, ...productInfo });
    }

    render() {
        const { productInfo } = this.props;
        const { id, image, name } = productInfo;

        return (
            <Card key={id}>
                <Container className='ProductSearchContainer-productImage'>
                    <Image src={image} />
                </Container>
                <Card.Content className='ProductSearchItem-info'>
                    {name}
                    <div className='ProductSearchItem-buttons'>
                        <Container fluid>
                            <Button.Group className='ProductSearchItem-buttonGroup'>
                                <Button icon fluid onClick={this.saveProduct('good')}>
                                    <Icon name='check' color='green' />
                                </Button>
                                <Button icon fluid onClick={this.saveProduct('bad')}>
                                    <Icon color='red' name='close' />
                                </Button>
                            </Button.Group>
                        </Container>
                    </div>
                </Card.Content>
            </Card>
        );
    }
}