/**
 * @fileoverview 分类
*/
import React, { Component } from 'react';
import {
    StyleSheet,
    ListView,
    Text,
    TouchableOpacity,
    InteractionManager,
    View
} from 'react-native';
import List from './list';

class Catalog extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataSource: '',
            tapFlag: false
        };
    }
    _openPage(rowData) {
        if(!this.state.tapFlag){
            InteractionManager.runAfterInteractions(() => {
                this.props.navigator.push({
                    title: rowData.text,
                    component: List,
                    params: rowData
                });
            });
        }
    }

    async componentDidMount(){
        let response  = await fetch('https://api.youmeixun.com/bookzw/catalog');
        let responseJson = await response.json();
        console.log(responseJson);
        InteractionManager.runAfterInteractions(() => {
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
                dataSource: ds.cloneWithRows(responseJson.data)
            });
        });
    }

    render() {
        const list = this.state.dataSource;

        let elem;
        if(list){
            elem = <ListView
              dataSource={this.state.dataSource}
              renderRow={(rowData) => {
                  return (
                        <TouchableOpacity  onPress={this._openPage.bind(this,rowData)}>
                            <Text style={{ color: '#55ACEE',fontSize:20,lineHeight: 28 }}>{rowData.text}</Text>
                        </TouchableOpacity>
                  );
              }}
            />
        }
        return (
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF' }}>
                {elem}
            </View>
        );
    }
}

export default Catalog;
