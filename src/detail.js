/**
 * @fileoverview 详情
*/
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    InteractionManager,
    ScrollView,
    View
} from 'react-native';


export default class Detail extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: ''
        };
    }

    async componentWillMount(){
        let response  = await fetch('https://api.youmeixun.com/bookzw/show/'+this.props.id+'/'+this.props.sid+'/'+this.props.aid);
        let responseJson = await response.json();
        console.log(responseJson);
        InteractionManager.runAfterInteractions(() => {
            this.setState({
                text: responseJson.data.content
            });
        });
    }

    render() {
        const arr = this.state.text.split(/\s{3}/g);
        return (
            <ScrollView>
                <View>
                    {
                        arr.map((item,index) => {
                            return(
                                <Text key={index}>
                                    {'    '}{item}
                                </Text>
                            );
                        })
                    }
                </View>
            </ScrollView>
        );
    }
}
