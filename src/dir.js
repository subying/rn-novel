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
import Detail from './detail';

export default class List extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataSource: ''
        };
    }
    _openPage(rowData) {
        this.props.navigator.push({
            title: rowData.name,
            component: Detail,
            params: rowData
        })
    }

    async componentWillMount(){
        let response  = await fetch('https://api.youmeixun.com/bookzw/dir/'+this.props.sid+'/'+this.props.listId);
        let responseJson = await response.json();
        console.log(responseJson);
        InteractionManager.runAfterInteractions(() => {
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
                dataSource: ds.cloneWithRows(responseJson.data.list)
            });
        });
    }

    render() {
        const list = this.state.dataSource;

        let elem;
        if(list){
            elem = <ListView
              dataSource={this.state.dataSource}
              scrollRenderAheadDistance={3}
              removeClippedSubviews={true}
              renderRow={(rowData,index) => {
                  return (
                        <TouchableOpacity key={index} onPress={this._openPage.bind(this,rowData)} >
                            <Text style={{ color: '#55ACEE',fontSize:20,lineHeight: 28 }}>{rowData.name}</Text>
                        </TouchableOpacity>
                  );
              }}
            />
        }
        return (
            <ScrollView>
                <View style={{alignItems: 'center', backgroundColor: '#FFFFFF' }}>
                    {elem}
                </View>
            </ScrollView>
        );
    }
}
