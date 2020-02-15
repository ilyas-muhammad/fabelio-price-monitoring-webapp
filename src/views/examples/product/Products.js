import React from "react";
// reactstrap components
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Media,
  Table,
  Container,
  Row,
  InputGroup, InputGroupAddon, Input, Form, FormGroup
} from "reactstrap";
import Header from "components/Headers/Header.js";
import Axios from 'axios';
import ModalDetail from "./ModalDetail";
import { print } from 'graphql';
import gql from 'graphql-tag';

class Products extends React.Component {
    constructor(props){
        super(props);
        this.handleCange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            inputValue: '',
          }
      }

      handleChange (event) {
          this.setState({ inputValue: event.target.value });
      }

      handleSubmit () {
          console.log('here')
          this.addNewProduct();
      }

      forceUpdateHandler(){
        this.forceUpdate();
      };

    getProducts = async (query, variables) => {
        try {
          const response = await Axios.post(`https://fabelio-price-monitoring.herokuapp.com`, {
            query,
            variables
          });
      
          // Set the data to the state
          this.setState(() => ({
            isLoaded: true,
            items: response.data.data.products.data,
          }));
      
        } catch (error) {
          this.setState(() => ({ error }))
        }
    }

    addNewProduct = async () => {
        const mutation = gql`
          mutation createProduct($url: String!) {
            createProduct (
              url: $url
            ) {
              id
              url
            }
          }`;

        console.log(this.state.inputValue, 'value')
        const variables = { url: `${this.state.inputValue}`};
          try {
            const response = await Axios.post(`https://fabelio-price-monitoring.herokuapp.com`, {
                query: print(mutation),
                variables,
            }).then((res) => {
               if (res) {

            console.log(res, 'resAdd')
               }
            })

            console.log(response, 'resAdd')
          } catch (err) {
            console.log(err, 'errAdd')
          }
    }

    componentDidMount() {
            const query = `
            query {
                products {
                    totalCount
                    data {
                      id
                      url
                      createdAt
                      productDetail {
                        id
                        name
                        description
                        price
                      }
                    }
                  }
            }
            `;
            const variables = {};
            this.getProducts(query, variables)
    }
  render() {
    const { items, inputValue } = this.state;

    console.log(inputValue, 'inputValue')
    return (
      <>
        <Header />
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">List Product</h3>
                </CardHeader>
                <Table className="align-items-left table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Product Title</th>
                      <th scope="col">Url Product</th>
                      <th scope="col">Price</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                      {items.length > 0 ? items.map((product) => {
                          return (
                            <tr>
                                <th scope="row">
                                  <Media>
                                      <span className="mb-0 text-sm">
                                      {product.productDetail.name}
                                      </span>
                                  </Media>
                                </th>
                                <td><a href={product.url} target="_blank" rel="noopener noreferrer">{product.url}</a></td>
                                <td>{product.productDetail.price}</td>
                                <td className="text-right">
                                    <ModalDetail data={product} />
                                </td>
                            </tr>
                        );
                      }) : null }
                  </tbody>
                </Table>
                <CardFooter className="py-4">
                <Form onSubmit={this.handleSubmit()}>
                    <FormGroup>
                    <InputGroup>
                        <Input placeholder="insert your url here to add new product" type="text" onChange={(e) => this.handleCange(e)}/>
                        <InputGroupAddon addonType="append"><Button type="submit" color="secondary">Add New Product</Button></InputGroupAddon>
                    </InputGroup>
                    </FormGroup>
                </Form>
                </CardFooter>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default Products;