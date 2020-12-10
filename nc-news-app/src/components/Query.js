import React, { Component } from 'react';

class Query extends Component {
    state = {
        sort_by: 'created_at',
        order: 'desc',
    }

    handleChange = () => {

    };


    render() {
        return (
            <section>
                <select onChange={this.handleChange}>
                    <option value="asc"></option>
                    <option value="desc"></option>
                </select>

                <select onChange={this.handleChange}>
                    <option value=""></option>
                    <option value=""></option>
                </select>
            </section>
        );
    }
}

export default Query;