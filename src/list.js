/**
 * @fileoverview 目录
*/
import React, { Component } from 'react';
import {
    StyleSheet,
    ListView,
    Text,
    TouchableOpacity,
    InteractionManager,
    ScrollView,
    View
} from 'react-native';
import Dir from './dir';

export default class List extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataSource: ''
        };
    }
    _openPage(rowData) {
        InteractionManager.runAfterInteractions(()=>{
            this.props.navigator.push({
                title: rowData.name,
                component: Dir,
                params: rowData
            });
        });
    }

    async componentDidMount(){
        let response  = await fetch('https://api.youmeixun.com/bookzw/list/'+this.props.id+'/1');
        let responseJson = await response.json();
        console.log(responseJson.data);
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
              dataSource={list}
              scrollRenderAheadDistance={3}
              removeClippedSubviews={true}
              renderRow={(rowData) => {
                  return (
                        <TouchableOpacity  onPress={this._openPage.bind(this,rowData)}>
                            <Text style={{ color: '#55ACEE',fontSize:20,lineHeight: 28 }}>{rowData.name}</Text>
                        </TouchableOpacity>
                  );
              }}
            />
        }
        return (
            <ScrollView>
                <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF' }}>
                    {elem}
                </View>
            </ScrollView>
        );
    }
}
