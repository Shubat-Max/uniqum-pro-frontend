import React, { Component } from 'react';
import { connect } from 'react-redux';

import {getDetails} from "../../../../actions";

import './MyGroupContent.css';
import '../../common.css';

import Loader from "../../../Loader";

class MyGroupContent extends Component {
    state = {
        groupTitle: '',
        commonOpen: false,
        partsOpen: false,
        questsOpen: false
    };


    componentDidMount(){
        if(!this.props.group){
            this.props.getDetails(this.props.groupId);
        }
    };

    render(){
        return (
            <div className="main-block">
                {this.getBody()}
            </div>
        )
    };

    getBody = () => {
        const { loading, loaded, group} = this.props;

        if (loading && !loaded) {
            return (
                <Loader />
            )
        }else if ((loaded && !loading) || (!loaded && !loading && group)) {
            document.title = 'Uniqum Platform | Моя группа';
            return (
                <div>
                    <div className="main-block___head">Моя группа: <span>{group.name}</span></div>
                    <div className="main-block-body">
                        <div className={'row'}>
                            <div className={'col-4'}>


                                <div className={'mg-trainer-widget'}>
                                    <div className={'mg-trainer-widget-header'}>Тренер</div>
                                    <a href="" className={'mg-trainer-widget-body'}>
                                        <div className={'mg-trainer-widget-info'}>
                                            <img src="/assets/img/no-user-img.png" alt="" className={'mg-trainer-widget-avatar'}/>
                                            <span className={'mg-trainer-widget-name'}>Василиса Иванова Фрусченко</span>
                                        </div>
                                    </a>
                                </div>



                                <div className={'mg-stats-widget'}>
                                    <div className={'mg-stats-widget-header'}>Статистика</div>
                                    <div>

                                        <div>
                                            <div>Блок статистики</div>
                                            <div>Блок статистики</div>
                                            <div>Блок статистики</div>
                                        </div>
                                    </div>
                                </div>


                            </div>

                            <div className={'col-8'}>



                                <div className={'mg-groupmates-widget'}>
                                    <div className={'mg-groupmates-widget-header'}>Одногрупники</div>
                                    <div className={'mg-groupmates-widget-body'}>
                                        <div className={'mg-groupmates-widget-mates-head'}>
                                            <span>ФИО ученика</span>
                                            <span>Выполнено</span>
                                            <span>Качество</span>
                                            <span>Баллы</span>
                                            <span>Телефон</span>
                                        </div>
                                        <div className={'mg-groupmates-widget-mates'}>
                                            <span>Артем Лазарев</span>
                                            <span>774/776(99%)</span>
                                            <span>55</span>
                                            <span>49941</span>
                                            <span>89091491195</span>
                                        </div>
                                        <div className={'mg-groupmates-widget-mates'}>
                                            <span>Артем Лазарев</span>
                                            <span>774/776(99%)</span>
                                            <span>55</span>
                                            <span>49941</span>
                                            <span>89091491195</span>
                                        </div>
                                        <div className={'mg-groupmates-widget-mates'}>
                                            <span>Артемjdyfdsfs Лазаревasdadssssada</span>
                                            <span>774/776(99%)</span>
                                            <span>55</span>
                                            <span>49941</span>
                                            <span>89091491195</span>
                                        </div>
                                        <div className={'mg-groupmates-widget-mates'}>
                                            <span>Артем Лазарев</span>
                                            <span>774/776(99%)</span>
                                            <span>55</span>
                                            <span>49941</span>
                                            <span>89091491195</span>
                                        </div>
                                    </div>
                                </div>



                            </div>
                        </div>

                    </div>
                </div>
            )
        }
    };
}



export default connect((store, ownProps) => {
    return {
        group: store.groups.entities.get(ownProps.groupId),
        loading: store.groups.loading,
        loaded: store.groups.loaded,
    }
},{
    getDetails
})(MyGroupContent);